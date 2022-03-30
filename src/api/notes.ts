import axios from "axios";
import { encodeEmail } from "../lib/encodeEmail";

export const getNotes = async (email: string) => {
  return await axios.get(
    `${process.env.AXIOS_BASE_URL}/users/${encodeEmail(email)}/data.json`
  );
};

export const saveNotes = async (email: string, data: any) => {
  return await axios.put(
    `${process.env.AXIOS_BASE_URL}/users/${encodeEmail(email)}/data.json/`,
    data
  );
};
