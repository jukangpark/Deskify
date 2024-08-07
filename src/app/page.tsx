"use client";

import Navigation from "./components/layout/Navigation";
import Feed from "./components/layout/Feed";
import Posts from "./components/layout/Posts";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const createUser = async () => {
    const response = await fetch("/api/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });
    const data = await response.json();
    console.log(data);
  };

  const fetchUsers = async () => {
    const response = await fetch("/api/get-users");
    const data = await response.json();
    setUsers(data.users);
  };

  return (
    <div>
      <Navigation />
      <Feed>
        <h1>Test API</h1>
        <h1>Create User</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={createUser}>Create User</button>

        <h1>Users</h1>
        <button onClick={fetchUsers}>Fetch Users</button>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
        <Posts />
      </Feed>
    </div>
  );
};

export default Home;
