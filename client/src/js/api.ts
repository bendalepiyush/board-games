import axios from "axios";

import { HttpMethod } from "@/types/api";

const getBaseUrl = (): string => {
  const currentUrl = window.location.href;
  return new URL(currentUrl).origin;
};

export const makeRequest = (
  endpoint: string,
  payload: object | undefined = undefined,
  type: HttpMethod = "POST"
) => {
  const API_ENDPOINT = `${getBaseUrl()}/${endpoint}`;
  const HEADERS = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  if (type === "POST") {
    return axios.post(API_ENDPOINT, payload, HEADERS);
  } else {
    return axios.get(API_ENDPOINT);
  }
};
