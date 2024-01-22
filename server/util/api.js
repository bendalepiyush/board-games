import axios from "axios";

export const makeApiCall = async (graphqlQuery) => {
  const res = await axios.post(
    process.env.HASURA_BASE_URL,
    { query: graphqlQuery },
    {
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
      },
    }
  );

  if (res.data.errors) {
    throw new Error(res.data.errors[0].message);
  }

  return res.data.data;
};
