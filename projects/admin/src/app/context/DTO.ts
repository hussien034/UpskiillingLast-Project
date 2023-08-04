export interface Login {
  email: string;
  password: string;
  username: string;
  role: string;
}
export interface LoginResponse {
  token: string;
  userId: string;
}
