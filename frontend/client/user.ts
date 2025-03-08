import {
  LoginResponseObject,
  User,
  UserLoginRequestObject,
  UserSignupRequestObject,
} from "@/lib/types/userClientTypes";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/users"; // Replace with your API URL

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
