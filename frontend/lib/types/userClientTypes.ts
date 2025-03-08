export interface UserLoginRequestObject {
  email: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  profilePic: string | null;
  bio: string | null;
  createdAt: Date | null;
}

export interface LoginResponseObject {
  user: User;
  message: string;
}

export interface UserSignupRequestObject {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  bio?: string | undefined;
}
