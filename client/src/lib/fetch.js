import { SERVER_URL } from '../constants';

export async function signupOrLoginUser(id_token) {
  const loginEndpoint = `${SERVER_URL}/login`;
  // Check if user exists at /user endpoint
  console.log(id_token);
  const res = await fetch(loginEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id_token }),
  });
  console.log(res);
  return await res.json(); // or res.text() depending on backend implementation
}
