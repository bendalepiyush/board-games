import { NextApiResponse } from "next";
import { authenticate } from "../middleware/auth";
import { ExtendedNextApiRequest } from "@/types/jwt";
import { apolloClient } from "@/apollo";
import { BUY_PROPERTY } from "@/queries/buyProperty";

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: "Method Not Allowed. Expecting POST." });
  }

  const { userId } = req.user;

  const { gameId, location, propertiesOwned, propertyPrice, availableCash } =
    req.body;

  if (
    !gameId ||
    location === undefined ||
    propertiesOwned === undefined ||
    availableCash === undefined
  ) {
    return res
      .status(400)
      .json({ error: "missing gameId / location / propertiesOwned." });
  }

  try {
    const buyPropRes = await apolloClient.mutate({
      mutation: BUY_PROPERTY,
      variables: {
        gameId,
        location,
        playerId: userId,
        propertiesOwned,
        availableCash,
      },
    });

    return res.json(buyPropRes);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export default authenticate(handler);
