export type UserRole = "super_admin" | "admin" | "librarian" | "member";

export interface TokenPayload {
  userId: string;
  role: UserRole;
  email: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  phone?: string;
}
