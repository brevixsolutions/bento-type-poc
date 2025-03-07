import axios from "axios";

const API_BASE_URL = "http://localhost:3000/users"; // Replace with your API URL

interface UserLoginRequestObject {
  email: string;
  password: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  profilePic: string | null;
  bio: string | null;
  createdAt: Date | null;
}

interface LoginResponseObject {
  user: User;
  message: string;
}

interface UserSignupRequestObject {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  bio?: string | undefined;
}

class ApiClient {
  private api: any;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      headers: { "Content-Type": "application/json" },
    });
  }

  async loginUser({ email, password }: UserLoginRequestObject): Promise<User> {
    try {
      const response: { data: LoginResponseObject } = await this.api.post(
        "/login",
        { email, password }
      );
      return response.data.user;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  }
  async signupUser({
    email,
    password,
    firstName,
    lastName,
    username,
    bio,
  }: UserSignupRequestObject): Promise<User> {
    try {
      const response: { data: LoginResponseObject } = await this.api.post(
        "/signup",
        { email, password, firstName, lastName, username, bio }
      );
      return response.data.user;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  }
}

const userApiClient = new ApiClient(API_BASE_URL);
export default userApiClient;
