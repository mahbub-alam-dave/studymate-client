import { SecureApi } from "./SecureApi";

export async function pendingAssignments() {
  return SecureApi(`https://study-mate-server-gamma.vercel.app/pending-assignments`);
}