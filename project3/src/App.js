import './App.css';
import Login from './Pages/Login'
import Signup from './Pages/Signup';
import Main from './Pages/Main';
import Home from './Pages/Home';
import Editpost from './Pages/Editpost';
import MyPublishedPosts from './Pages/MyPublishedPosts';
import MyDraftedPosts from './Pages/MyDraftedPosts';
import PublicPosts from './Pages/PublicPosts';
import ProtectedRoute from './Pages/ProtectedRoute';

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/posts/me" element={<Home />} />
          <Route path="/posts/me/published" element={<MyPublishedPosts />} />
          <Route path="/posts/me/drafted" element={<MyDraftedPosts />} />
          <Route path="/posts/public" element={<PublicPosts />} />
          <Route path="/post/:id/edit" element={<Editpost />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
