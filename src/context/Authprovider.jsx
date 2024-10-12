import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";

export const Authcontext = createContext();
export default function Authprovider({ children }) {
  const [currentUser, setCurrentUser] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      onAuthStateChanged(auth, async (user) => {
        if (user.uid !== undefined) {
          const q = query(
            collection(db, "users"),
            where("_id", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setCurrentUser(doc.data());
            setIsAuthenticated(true);
          });
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <Authcontext.Provider
      value={{
        currentUser,
        setCurrentUser,
        setIsAuthenticated,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
}
