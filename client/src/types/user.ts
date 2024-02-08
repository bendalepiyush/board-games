export type Role = "ADMIN" | "VIEWER" | "PARTICIPANT";

export type User = {
  displayColor: string;
  username: string;
  isAdmin: boolean;
};

export type Status = "ONLINE" | "OFFLINE";
