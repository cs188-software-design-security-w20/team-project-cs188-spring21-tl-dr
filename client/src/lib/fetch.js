import axios from "axios";
import { SERVER_URL } from "../constants";

export async function signupOrLoginUser(id_token) {
  const loginEndpoint = `${SERVER_URL}/login`;
  const res = await axios.post(
    loginEndpoint,
    {
      id_token,
      clientType: "web",
    },
    { withCredentials: true }
  );
}
