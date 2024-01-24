import { gql, useQuery, useSubscription } from "@apollo/client";
import { useEffect } from "react";

const Home = () => {
  const qlQuery = gql`
    query MyQuery {
      user {
        status
        id
      }
    }
  `;

  const { loading, error, data } = useQuery(qlQuery);

  // const subQuery = gql`
  //   subscription MySubscription {
  //     user {
  //       id
  //       status
  //     }
  //   }
  // `;

  // const { loading, error, data } = useSubscription(subQuery);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  console.log(data.user[0].status);

  return <h1 style={{ color: "white" }}>{JSON.stringify(data.user)}</h1>;
};

export default Home;
