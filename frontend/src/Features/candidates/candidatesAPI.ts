import axios from "axios";
import { ApiDomain } from "../../utils/APIDomain";

const API = `${ApiDomain}/api/candidates`;

export interface Candidate {
  candidateId: number;
  userId: number;
  electionId: number;
  positionId: number;
  faculty: string | null;
  manifesto: string | null;
  createdAt: string;
}

export interface NewCandidate {
  userId: number;
  electionId: string;
  positionId: string;
  faculty?: string;
  manifesto?: string;
}

export const fetchCandidates = async (): Promise<Candidate[]> => {
  const res = await axios.get(API);
  return res.data.data;
};

export const createCandidate = async (data: NewCandidate) => {
  const res = await axios.post(API, data);
  return res.data.data;
};

export const updateCandidate = async (id: number, data: Partial<NewCandidate>) => {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data.data;
};

export const deleteCandidate = async (id: number) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data.data;
};