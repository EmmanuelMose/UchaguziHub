import { ApiDomain } from "../../utils/APIDomain";

export interface Complaint {
  complaintId: number;
  userId: number;
  complaint: string;
  createdAt: string;
}

const BASE_URL = `${ApiDomain}/complaints`;

export const fetchComplaints = async (): Promise<Complaint[]> => {
  const res = await fetch(BASE_URL);
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to fetch complaints");
  return json.data;
};

export const deleteComplaint = async (id: number): Promise<void> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to delete complaint");
};