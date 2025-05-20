import React from 'react'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'

function GuestTodo() {
  return (
    <>
      <div className='flex-1 flex justify-center mt-10'>
        <div className='w-full max-w-2xl px-4'>
          <TodoForm/>
          <TodoList/>
        </div>
      </div>
    </>
  )
}

export default GuestTodo