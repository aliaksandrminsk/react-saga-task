import axios from "axios";
import { encodeEmail } from "../lib/encodeEmail";

export const getNotes = (email: string) => {
  return axios.get(
    `${process.env.AXIOS_BASE_URL}/users/${encodeEmail(email)}/data.json`
  );
};

export const saveNotes = (email: string, data: any) => {
  return axios.put(
    `${process.env.AXIOS_BASE_URL}/users/${encodeEmail(email)}/data.json/`,
    data
  );
};
