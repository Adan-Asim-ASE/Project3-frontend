import React, { useEffect, useState } from "react";
import { loadAllPublicPosts } from "../APIs/PostsApis";
import { Link } from "react-router-dom";
import './style.css';

export default function Main() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadAllPublicPosts()
      .then(data => {
        setPosts(data);
      })
      .catch(response => {
        alert("Unable to load data, please try again");
        console.log(response);
      });
  }, []);

  return (
    <div className="main m-5">
      <div className="">
        <div className="text-white m-5 block-example border border-light bg-primary p-2 m-5">
          <div className="text-end">
            <Link to={'/login'} className="btn btn-outline-light p-2 mt-3 me-4 align-left"> Login / Signup </Link>
          </div>
          <h1 className="text-center mt-4 mb-5 ms-3"><strong> ALL PUBLIC POSTS </strong></h1>
        </div>
        {
          posts?.map(post =>
            <div to className="block-example border border-ligth p-4 m-5">
              <h2 className="text-center text-primary mb-4">{post.title}</h2>
              <p className="lead text-dark text-center">{post.content}</p>
              <p className="text-dark text-end me-3">Made by user: {post.userName}</p>
            </div>)
        }
      </div>
    </div>
  );
}
