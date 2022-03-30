import axios from "axios";
import { encodeEmail } from "../lib/encodeEmail";

export const getAuth = ({
  url,
  email,
  password,
}: {
  url: string;
  email: string;
  password: string;
}) => {
  return axios.post(url, { email, password, returnSecureToken: true });
};

export const saveUserData = (email: string, name: string, surname: string) => {
  return axios.put(
    `${process.env.AXIOS_BASE_URL}/users/${encodeEmail(email)}.json`,
    {
      name: name,
      surname: surname,
    }
  );
};

export const getUserData = (email: string) => {
  return axios.get(
    `${process.env.AXIOS_BASE_URL}/users/${encodeEmail(email)}.json`
  );
};
