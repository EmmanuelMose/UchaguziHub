import { ApiDomain } from "../../utils/APIDomain";

export interface User {
  userId: string;
  systemUserId: string;
  fullName: string;
  registrationNumber?: string | null;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
}

export interface NewUser {
  systemUserId: string;
  fullName: string;
  registrationNumber?: string;
  email: string;
  role: string;
  passwordHash: string;
}

const BASE_URL = `${ApiDomain}/api/users`;

export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  const json = await res.json();
  return json.data;
};

export const createUser = async (data: NewUser): Promise<User> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      systemUserId: Number(data.systemUserId),
    }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Failed to create user");
  }

  return json.data;
};