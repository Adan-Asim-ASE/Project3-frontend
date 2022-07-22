import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';
import { loadMyDraftedPosts, deletePost } from "../APIs/PostsApis";
import Logout from "./Logout";
import './style.css';

export default function MyDraftedPosts() {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadMyDraftedPosts()
      .then(data => {
        setPosts(data);
      })
      .catch(
        response => {
          alert("An unexpected error occurred, please try loggin in again");
          navigate('/login');
        }
      );
  }, []);


  function removePost(pid) {
    deletePost(pid)
      .then(data => {
        alert("Post deleted successfully");
        const updatedPosts = posts.filter(p => (p.id !== pid));
        setPosts(updatedPosts);
      })
      .catch(
        response => {
          alert("An unexpected error occurred" + response);
        }
      );
  }

  return (
    <div className="Main m-5">
      <div className="">
        <div className="text-white m-5 block-example border border-light bg-primary p-2 m-5">
          <div className="text-end">
            <p className="btn btn-outline-light rounded-pill p-2 mt-3 me-2 align-left"> {'User: ' + posts[0]?.userName + ' '} </p>
          </div>
          <h1 className="text-center mt-4 mb-4 ms-0"><strong> MY DRAFTED POSTS </strong></h1>
          <div className="text-center mb-4">
            <Link to={'/posts/me'} className="btn btn-outline-light p-2 mt-3 ms-5 me-3 align-left"> Home </Link>
            <Link to={'/posts/public'} state={{ user: posts[0]?.userName }} className="btn btn-outline-light p-2 mt-3 me-3 align-left"> Public posts </Link>
            <Link to={'/posts/me/published'} className="btn btn-outline-light p-2 mt-3 me-3 align-left"> My published posts </Link>
            <Link to={'/posts/me/drafted'} className="btn btn-outline-light p-2 mt-3 me-3 align-left"> My drafted posts </Link>
            <Logout />
          </div>
        </div>

        {
          posts?.map(post =>
            <div to className="block-example border border-ligth p-4 m-5">
              <p className="text-black-50 text-start ms-2">({post.published === true ? "Published" : "Drafted"})</p>
              <h2 className="text-center text-primary mb-4">{post.title}</h2>
              <p className="lead text-dark text-center">{post.content}</p>
              <p className="text-dark text-end me-3">Made by user: {post.userName}</p>
              <div className="text-center mt-2">
                <Link to={'/post/' + post.id + '/edit'} state={{ post: post }} className="btn btn-outline-primary btn-md me-3">Modify</Link>
                <button onClick={() => removePost(post.id)} className="btn btn-outline-primary btn-md">Delete </button>
              </div>
            </div>
          )
        }
      </div>
    </div >
  );
}
