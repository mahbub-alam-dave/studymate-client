
import { getAuth, onAuthStateChanged } from "firebase/auth";

function currentUser() {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        resolve(user);
      } else {
        reject(new Response("Unauthorized", { status: 401 }));
      }
    });
  });
}


export const SecureApi = async (url, options = {}) => {

 const user = await currentUser();
  const token = await user.getIdToken();

const defaultHeaders = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const mergedOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  const res = await fetch(url, mergedOptions);

  if (!res.ok) {
    throw new Response(res.statusText, { status: res.status });
  }

  return res.json();
    
};



