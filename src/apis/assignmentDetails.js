
import { SecureApi } from "./SecureApi";

export async function assignmentDetails({ params }) {
  return SecureApi(`https://study-mate-server-gamma.vercel.app/assignments/${params.id}`);
}
