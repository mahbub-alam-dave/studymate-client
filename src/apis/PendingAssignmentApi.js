import { SecureApi } from "./SecureApi";

export async function pendingAssignments() {
  return SecureApi(`http://localhost:3000/pending-assignments`);
}