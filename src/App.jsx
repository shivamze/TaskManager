import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import Bookmarks from "./pages/Bookmarks";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Route>

      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      
    </Routes>
  );
}

export default App;


