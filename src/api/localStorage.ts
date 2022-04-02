export const saveData = ({
  token,
  userId,
  expirationDate,
  email,
  userName,
}: {
  token: string;
  userId: string;
  expirationDate: string;
  email: string;
  userName: string;
}) => {
  localStorage.setItem("token", token);
  localStorage.setItem("userId", userId);
  localStorage.setItem("expirationDate", expirationDate);
  localStorage.setItem("email", email);
  localStorage.setItem("userName", userName);
};

export const getData = () => {
  return {
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"),
    expirationDate: localStorage.getItem("expirationDate"),
    email: localStorage.getItem("email"),
    userName: localStorage.getItem("userName"),
  };
};

export const getItem = (key: string) => {
  return localStorage.getItem(key);
};

export const clear = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("email");
  localStorage.removeItem("userName");
};
