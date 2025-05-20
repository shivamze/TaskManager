import { useAppwriteTodo } from '../context/AppwriteTodoContext';
import {useAuth} from '../context/AuthContext'
import { useTodo } from '../context/TodoContext';

const useUnifiedTodo = () => {
    const {user} = useAuth();
    const guest = useTodo();
    const auth = useAppwriteTodo();

    const safeCall = (authFunc, guestFunc) => (...args) => 
        user? authFunc(...args) : guestFunc(...args);

    return{
        todos: user? auth.todos : guest.todos,
        addTodo: safeCall(auth.createTodo, guest.addTodo),
        updateTodo: safeCall(auth.UpdateTodoTitle, guest.updateTodo),
        deleteTodo: safeCall(auth.deleteTodo, guest.deleteTodo),
        toggleComplete: safeCall(auth.toggleTodoStatus, guest.toggleComplete),
    }
};

export default useUnifiedTodo;