import { SecureApi } from "./SecureApi";

export async function updateAssignment({ params }) {
  return SecureApi(`${import.meta.env.VITE_api_url}/api/assignments/${params.id}`);
}