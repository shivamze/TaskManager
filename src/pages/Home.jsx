import React from "react";
import Sidebar from "../components/Sidebar";
import GuestTodo from "./GuestTodo";
import AppwriteTodo from "./AppwriteTodo";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="flex">
      <main className="flex-1 px-6 py-6">
        {user ? <AppwriteTodo /> : <GuestTodo />}
      </main>
    </div>
  );
};

export default Home;
