import axios from "axios";
import { ApiDomain } from "../..//utils/APIDomain";

const API = `${ApiDomain}/api/positions`;

export interface Position {
  positionId: number;
  electionId: number;
  name: string;
  createdAt: string;
}

export interface NewPosition {
  electionId: number;
  name: string;
}

// Fetch all positions
export const fetchPositions = async (): Promise<Position[]> => {
  const res = await axios.get(API);
  return res.data.data;
};

// Fetch positions by election
export const fetchPositionsByElection = async (electionId: number): Promise<Position[]> => {
  const res = await axios.get(`${API}/election/${electionId}`);
  return res.data.data;
};

// Create a new position
export const createPosition = async (data: NewPosition): Promise<Position> => {
  const res = await axios.post(API, data);
  return res.data.data;
};

// Update a position
export const updatePosition = async (id: number, data: Partial<NewPosition>): Promise<Position> => {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data.data;
};

// Delete a position
export const deletePosition = async (id: number): Promise<Position> => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data.data;
};