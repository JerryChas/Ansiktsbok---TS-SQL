export interface UserResponse {
  id: string;
  name: string
  email: string;

}


export type ErrorResponse = {
  error: unknown;
}