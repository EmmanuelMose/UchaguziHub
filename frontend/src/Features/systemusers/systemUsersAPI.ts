import { ApiDomain } from "../../utils/APIDomain";

export interface SystemUser {
  systemUserId: string;
  fullName: string;
  email: string;
  registrationNumber?: string | null;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export interface NewSystemUser {
  fullName: string;
  email: string;
  registrationNumber?: string;
  role: string;
  isActive?: boolean;
}

const BASE_URL = `${ApiDomain}/api/system-users`;

export const fetchSystemUsers = async (): Promise<SystemUser[]> => {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch system users");
  }
  const json = await res.json();
  return json.data;
};

export const createSystemUser = async (data: NewSystemUser): Promise<SystemUser> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to create system user");
  return json.data;
};

export const updateSystemUser = async (id: string, data: Partial<NewSystemUser>): Promise<SystemUser> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to update system user");
  return json.data;
};

export const deleteSystemUser = async (id: string): Promise<SystemUser> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to delete system user");
  return json.data;
};