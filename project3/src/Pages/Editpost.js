import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { editPost } from "../APIs/PostsApis";
import './style.css';

export default function EditPost() {
  const loc = useLocation();
  let post = loc.state.post;

  const { id } = useParams();
  const navigate = useNavigate();

  let [title, setTitle] = useState(post.title);
  let [content, setContent] = useState(post.content);
  let [status, setStatus] = useState(post.published === true ? "Published" : "Drafted");

  function validate() {
    if (title.length > 0 && content.length > 5) {
      return true;
    }
    return false;
  }

  const handleSelect = (e) => {
    setStatus(e.target.value)
  }

  async function submit(event) {
    event.preventDefault();
    let published;
    (status === "Published" ? published = true : published = false);
    
    let post = {
      title: title,
      content: content,
      published: published,
    };

    await editPost(id, post)
      .then(data => {
        alert("Post updated successfully");
        navigate('/posts/me');
      })
      .catch(response => {
        alert("An unexpected error occurred ");
      }
      );
  }

  return (
    <div className="">
      <Form onSubmit={submit} className="block-example border border-light bg-grey-color p-4 m-5">
        <h2 className="mb-4 mt-2 text-primary text-center"><strong>Edit Post</strong></h2>
        <hr />
        <Form.Group className="mb-3" controlId="Title">
          <Form.Label className="left-margin mb-3 mt-2"><strong>Title</strong></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="content">
          <Form.Label className="mb-3 mt-3 row-3"><strong>Content</strong></Form.Label>
          <Form.Control
            type="text"
            placeholder="abc..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="Published">
          <Form.Label className="mb-3 mt-3"><strong>Post Status</strong></Form.Label>
          <Form.Select className="col-3" onChange={handleSelect} value={status}>
            <option value="Published">Published</option>
            <option value="Drafted">Drafted</option>
          </Form.Select>
        </Form.Group>

        <div className="text-end">
          <Button className="mt-4 mb-2 me-3 ps-3 pe-3" block size="md" onClick={() => { navigate('/Home') }}>
            Back
          </Button>
          <Button className="mt-4 mb-2" block size="md" type="submit" disabled={validate}>
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
}
