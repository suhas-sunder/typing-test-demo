import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

//Used to simplify context fetching for auth context
export default function useAuth() {
  return useContext(AuthContext);
}
