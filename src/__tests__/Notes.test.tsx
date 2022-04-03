import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios, { AxiosResponse } from "axios";
import renderConnected from "../lib/renderConnected";
import Notes from "../containers/Notes/Notes";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const hits = [
  { text: "Item0", done: true },
  { text: "Item1", done: false },
  { text: "Item2", done: true },
];

describe("Notes component", () => {
  beforeEach(async () => {
    //Prepare the response we want to get from axios
    const mockedResponse: AxiosResponse = {
      data: hits,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    };
    // Make the mock return the custom axios response
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);

    await renderConnected(<Notes />);
  });
  it("checks initial state", () => {
    expect(screen.getByText(/All \(3\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Completed \(2\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Waiting \(1\)/i)).toBeInTheDocument();

    expect(screen.getByText(/Item0/i)).toBeInTheDocument();
    expect(screen.getByText(/Item1/i)).toBeInTheDocument();
    expect(screen.getByText(/Item2/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Add note/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Save notes/i })
    ).toBeInTheDocument();

    expect(screen.getAllByText(/Remove/i)).toHaveLength(3);
  });
  it("click radio Completed", () => {
    const labelRadio: HTMLInputElement = screen.getByRole("radio", {
      name: /Completed/i,
    });
    expect(labelRadio).not.toBeChecked();
    const leftClick = { button: 0 };

    userEvent.click(labelRadio, leftClick);
    expect(labelRadio).toBeChecked();

    expect(screen.getByText(/Item0/i)).toBeInTheDocument();
    expect(screen.queryByText(/Item1/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Item2/i)).toBeInTheDocument();
  });
  it("click radio Waiting", () => {
    const labelRadio: HTMLInputElement = screen.getByRole("radio", {
      name: /Waiting/i,
    });

    userEvent.click(labelRadio, { button: 0 });
    expect(labelRadio).toBeChecked();

    expect(screen.queryByText(/Item0/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Item1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Item2/i)).not.toBeInTheDocument();
  });
  it("add new note", () => {
    userEvent.type(screen.getByPlaceholderText(/Text of note/i), "New Item");

    const button: HTMLButtonElement = screen.getByRole("button", {
      name: /Add note/i,
    });
    const leftClick = { button: 0 };
    userEvent.click(button, leftClick);

    expect(screen.getByText(/New Item/i)).toBeInTheDocument();
  });
});
