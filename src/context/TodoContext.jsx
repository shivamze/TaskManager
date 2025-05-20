import { createContext, useContext, useEffect, useState } from "react";


const  TodoContext = createContext();


export const TodoProvider = ({children}) => {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem("guestTodos");
        return saved? JSON.parse(saved): [];
    });

    useEffect(() => {
        localStorage.setItem("guestTodos", JSON.stringify(todos));
    }, [todos]);

    const addTodo = (title) => {
        const newTodo = {
            id: crypto.randomUUID(),
            title,
            completed: false,
        };
        setTodos((prev) => [newTodo, ...prev])
    }
    const updateTodo = (id, updatedText) => {
        setTodos(todos.map((t) => (t.id === id? {...t, title: updatedText} : t)))
    }
    const deleteTodo = (id) => {
        setTodos(todos.filter((t) => t.id != id));
    }
    const toggleComplete = (id, nextStatus) => {
        setTodos((prev) => 
            prev.map((t) => (t.id === id ? { ...t, completed: nextStatus } : t))
        );
    };    
    return(
        <TodoContext.Provider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}} >
            {children}
        </TodoContext.Provider>
    );
};

export const useTodo = () => useContext(TodoContext)