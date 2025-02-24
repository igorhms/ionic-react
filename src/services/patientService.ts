import axios from "axios";
import { Patient } from "../types/Patient";

const API_URL = "https://fakestoreapi.com/users";

export const getPatients = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createPatient = async (data: Partial<Patient>) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};
