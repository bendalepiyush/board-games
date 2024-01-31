import axios from "axios";
import { useRouter } from "next/router";

const getBaseUrl = (): string => {
  const currentUrl = window.location.href;
  return new URL(currentUrl).origin;
};

export const makePostApiCall = (
  endpoint: string,
  payload: object | undefined = undefined
) => {
  return axios.post(`${getBaseUrl()}/${endpoint}`, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
