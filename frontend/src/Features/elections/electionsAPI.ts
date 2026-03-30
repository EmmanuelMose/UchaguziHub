import axios from "axios";
import { ApiDomain } from "../../utils/APIDomain";

const API = `${ApiDomain}/api/elections`;

export interface Election {
  electionId: number;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string;
  status: string;
  createdBy: number;
}

export const fetchElections = async (): Promise<Election[]> => {
  const res = await axios.get(API);
  return res.data.data;
};

export const createElection = async (data: Partial<Election>) => {
  const res = await axios.post(API, data);
  return res.data.data;
};

export const updateElection = async (id: number, data: Partial<Election>) => {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data.data;
};

export const deleteElection = async (id: number) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data.data;
};