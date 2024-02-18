export interface AuthData {
  userName: string;
  userId: string;
  name: string;
  id: string;
  roles: string;
}

export interface AuthRequest {
  userName: string;
  password: string;
}

export interface ChangePassword {
  userName: string;
  currentPassword: string;
  newPassword: string;
}
