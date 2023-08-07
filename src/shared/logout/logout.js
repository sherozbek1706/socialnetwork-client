import { errorNotify } from "../toastify";

export const LogOut = () => {
  localStorage.clear();
  errorNotify("Your token expired!");
  setTimeout(() => {
    window.location.assign("/");
  }, 2500);
};
