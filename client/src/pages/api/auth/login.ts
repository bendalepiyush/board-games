import bcrypt from "bcrypt";
import { gql } from "@apollo/client";
import { signJwtToken } from "@/js/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import { apolloClient } from "@/apollo";

const GET_USER_QUERY = gql`
  query GetUser($email: String!) {
    player(where: { email: { _eq: $email } }) {
      password
      username
      id
    }
  }
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  try {
    const { data } = await apolloClient.query({
      query: GET_USER_QUERY,
      variables: { email: email },
    });

    if (data.player && data.player.length === 0) {
      return res.status(400).json({ error: "Invalid Email" });
    }

    const storedHash = data.player[0].password;

    const isValidPassword = await bcrypt.compare(password, storedHash);

    if (!isValidPassword) {
      return res.status(400).json({ error: "Invalid Password" });
    }

    const { id, username } = data.player[0];
    const token = signJwtToken({
      id,
      username,
    });

    res.json({ token, username });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
