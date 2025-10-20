import axios from "axios";

 export const saveUserToDB = async (userData) => {
  try {
    await axios.post(`${import.meta.env.VITE_api_url}/api/users`, userData);
  } catch (err) {
    console.error("Error saving user:", err);
  }
};