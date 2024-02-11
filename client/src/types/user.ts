export type Role = "ADMIN" | "VIEWER" | "PARTICIPANT";

export type Status = "ONLINE" | "OFFLINE";

export type User = {
  displayColor: string;
  username: string;
  isAdmin: boolean;
  availableCash: number;
  status: Status;
  userId: string;
};
