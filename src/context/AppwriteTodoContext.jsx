import { createContext, useContext, useEffect, useState } from "react";
import { databases, ID, account, Query } from "../lib/appwriteconfig";

const appwriteTodoContext = createContext();

export const AppwriteTodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const DB_ID = import.meta.env.VITE_DB_ID;
  const COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID;

  const getUserId = async () => {
    try {
      const user = await account.get();
      return user.$id;
    } catch (err) {
      console.log("User not logged in or error in fetching user", err);
      return null;
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const createTodo = async (title) => {
    try {
      const userId = await getUserId();
      if (userId) {
        const doc = await databases.createDocument(DB_ID, COLLECTION_ID, ID.unique(), {
          title,
          completed: false,
          userId,
        });

        const newTodo = {
          id: doc.$id,
          title: doc.title,
          completed: doc.completed,
          userId: doc.userId,
        };

        setTodos((prev) => [...prev, newTodo]);
      } else {
        console.log("User not logged in.");
      }
    } catch (err) {
      console.log("Error creating todo", err);
    }
  };

  const fetchTodos = async () => {
    try {
      const userId = await getUserId();
      if (userId) {
        const res = await databases.listDocuments(DB_ID, COLLECTION_ID, [
          Query.equal("userId", userId),
        ]);
        const normalized = res.documents.map((doc) => ({
          id: doc.$id,
          title: doc.title,
          completed: doc.completed,
          userId: doc.userId,
        }));
        setTodos(normalized);
      } else {
        console.log("User not logged in.");
      }
    } catch (err) {
      console.log("Fetch failed", err);
    }
  };

  const toggleTodoStatus = async (id, nextStatus) => {
    try {
      const res = await databases.updateDocument(DB_ID, COLLECTION_ID, id, {
        completed: nextStatus,
      });
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: res.completed } : todo
        )
      );
    } catch (err) {
      console.log("Error in toggle", err);
    }
  };


  const UpdateTodoTitle = async (id, newTitle) => {
    try {
      const res = await databases.updateDocument(DB_ID, COLLECTION_ID, id, {
        title: newTitle,
      });
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, title: res.title } : todo
        )
      );
    } catch (err) {
      console.log("Error in updating title", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const userId = await getUserId();
      if (userId) {
        const doc = await databases.getDocument(DB_ID, COLLECTION_ID, id);
        if (doc.userId === userId) { 
          await databases.deleteDocument(DB_ID, COLLECTION_ID, id);
          setTodos((prev) => prev.filter((todo) => todo.id !== id));
        } else {
          console.log("Unauthorized attempt to delete another user's todo");
        }
      }
    } catch (err) {
      console.error("Error deleting todo", err);
    }
  };

  return (
    <appwriteTodoContext.Provider
      value={{ todos, createTodo, UpdateTodoTitle, toggleTodoStatus, deleteTodo }}
    >
      {children}
    </appwriteTodoContext.Provider>
  );
};

export const useAppwriteTodo = () => useContext(appwriteTodoContext);
