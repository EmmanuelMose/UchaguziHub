import { ApiDomain } from "../../utils/APIDomain";

export interface CreateComplaintPayload {
  userId: string;
  complaint: string;
}

export const submitComplaint = async (payload: CreateComplaintPayload) => {
  const response = await fetch(`${ApiDomain}/complaints`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to submit complaint");
  }

  return response.json();
};
