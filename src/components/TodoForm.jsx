import React, {useState} from 'react'
import useUnifiedTodo from '../hooks/useUnifiedTodo';

function TodoForm() {
  const [text, setText] = useState('')
  const {addTodo} = useUnifiedTodo();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text)
    if(!text.trim()) return;
    addTodo(text);
    setText('');
  }

  return (
    <>
        <div className='bg-pink-300 h-auto w-full rounded-md'>
            <form onSubmit={handleSubmit} className='px-1 py-2 m-2 w-auto flex justify-center align-center'>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} className='focus:outline-none focus:ring-1 focus:ring-grey-50 h-10 m-2 p-2 bg-white w-full rounded-sm' placeholder='What to do....'/>
                <button className='my-2 bg-green-200 px-3 py-2 rounded-sm font-bold cursor-pointer' type='submit'>Add</button>
            </form>
        </div>
    </>
  )
}

export default TodoForm