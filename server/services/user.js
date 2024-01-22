import { makeApiCall } from "../util/api.js";

export const updateUserState = (userId, status) => {
  const updateUserStatus = `
    mutation MyMutation {
        update_user(where: {id: {_eq: "${userId}"}}, _set: {status: "${status}"}) {
        returning {
            id
            status
        }
        }
    }
    `;

  return makeApiCall(updateUserStatus);
};
