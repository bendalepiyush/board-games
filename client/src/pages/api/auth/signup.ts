import bcrypt from "bcrypt";
import { gql } from "@apollo/client";
import { apolloClient } from "@/apollo";
import { NextApiRequest, NextApiResponse } from "next";
import { signJwtToken } from "@/js/jwt";

const createUserQuery = gql`
  mutation createUserQuery(
    $username: String!
    $userEmail: String!
    $userPassword: String!
  ) {
    insert_player_one(
      object: {
        username: $username
        email: $userEmail
        password: $userPassword
      }
    ) {
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

  const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(404).json({ message: "Missing username / email / password" });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const result = await apolloClient.mutate({
      mutation: createUserQuery,
      variables: {
        username: username,
        userEmail: email,
        userPassword: hashedPassword,
      },
    });

    const token = signJwtToken({
      id: result.data.insert_player_one.id,
      username,
    });

    res.json({ token, username });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
