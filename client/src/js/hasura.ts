// utils/hasuraAxios.ts

import axios, { AxiosInstance } from "axios";

const HASURA_GRAPHQL_ENDPOINT = "https://uncommon-dog-89.hasura.app/v1/graphql";
const HASURA_ADMIN_SECRET =
  "SmdA05TfU563hdync7KZuAG4W0nRKmuJKF4AaBf9dLG1nsS1JUsYmb9e14UkAhQT";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: HASURA_GRAPHQL_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
  },
});

interface HasuraQueryResponse {
  data: any;
}

const runQuery = async (
  query: string,
  variables = {}
): Promise<HasuraQueryResponse> => {
  try {
    const response = await axiosInstance.post("", {
      query,
      variables,
    });

    return response.data;
  } catch (error) {
    console.error("Error making Hasura query:", error);
    throw error;
  }
};

export default runQuery;
