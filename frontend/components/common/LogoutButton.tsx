"use client";

import { logout } from "@/lib/utils";
import { Button } from "../ui/button";

function LogoutButton() {
  return <Button onClick={logout}>Logout</Button>;
}

export default LogoutButton;
