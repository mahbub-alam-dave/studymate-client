
import { SecureApi } from "./SecureApi";

export async function assignmentDetails({ params }) {
  return SecureApi(`http://localhost:3000/assignments/${params.id}`);
}
