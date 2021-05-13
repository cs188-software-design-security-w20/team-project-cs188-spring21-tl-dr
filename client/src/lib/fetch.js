import { SERVER_URL } from '../constants';

export async function signupOrLoginUser(id_token) {
  const loginEndpoint = `${SERVER_URL}/login`;
  const res = await fetch(loginEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id_token, clientType: "web" }),
  });
  console.log(res);
  return await res.text();
}
