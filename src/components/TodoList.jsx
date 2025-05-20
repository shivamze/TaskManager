import React from 'react'
import TodoItem from './TodoItem'
import useUnifiedTodo from '../hooks/useUnifiedTodo';

function TodoList() {
    const {todos} = useUnifiedTodo();

    if(todos.length === 0){
        return <p className="text-center text-gray-500 mt-8">No todos yet. Add one above 👆</p>;
    }

    console.log(todos);
  return (
    <>
        <div>
            {todos.map((todo) => (
                
                <TodoItem key={todo.id} todo={todo}/>
            ))}
        </div>
    </>
  )
}

export default TodoList