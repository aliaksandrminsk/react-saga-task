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
  return (
    axios
      .post(url, {
        email,
        password,
        returnSecureToken: true,
      })
      // .catch((error) => {
      //   console.log("AAAAAAAAAAAAAAA ", error.response);
      //   if (error.response) {
      //     console.log(error.response.data); // => the response payload
      //   }
      // });
      .catch(({ response }) => {
        let serverErrorMessage = "";
        switch (response?.data?.error?.message) {
          case "EMAIL_NOT_FOUND":
            serverErrorMessage =
              "The email you entered is incorrect. Try again.";
            break;
          case "INVALID_PASSWORD":
            serverErrorMessage =
              "The password you entered is incorrect. Try again.";
            break;
          default:
            serverErrorMessage = "Something went wrong. Try again.";
        }
        //this.setState({
        //...this.state,
        //serverErrorMessage,
        //});
        console.error("An unexpected error happened:", response?.data);
        return { serverErrorMessage };
      })
  );
};

export const saveUserData = ({
  email,
  name,
  surname,
}: {
  email: string;
  name: string;
  surname: string;
}) => {
  return axios.put(
    `${process.env.AXIOS_BASE_URL}/users/${encodeEmail(email)}.json`,
    { name, surname }
  );
};

export const getUserData = ({ email }: { email: string }) => {
  return axios.get(
    `${process.env.AXIOS_BASE_URL}/users/${encodeEmail(email)}.json`
  );
};
