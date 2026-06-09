"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data, error } = await authClient.signUp.email({
      username,
      password,
      name: "Tester",
      email: "example@example.com"
    }, {
      onSuccess: (ctx) => {
        redirect("/home");
      },
      onError: (ctx) => {
        console.log(ctx.error);
      }
    })
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
          />
        </div>
        <input type="submit" value="Sign Up"/>
      </form>
    </>
  )
}