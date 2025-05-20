import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { TodoProvider } from './context/TodoContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { AppwriteTodoProvider } from './context/AppwriteTodoContext.jsx'
import { NotesProvider } from './context/NotesContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TodoProvider>
          <AppwriteTodoProvider>
            <NotesProvider>
              <App />
            </NotesProvider>
          </AppwriteTodoProvider>
        </TodoProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
