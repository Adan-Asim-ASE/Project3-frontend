import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createPost } from "../APIs/PostsApis";

export default function MakePost() {
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  let [status, setStatus] = useState("Published");

  function validate() {
    if (title.length && (content.length > 4)) {
      return true;
    }
    return false;
  }

  async function submit(event) {
    event.preventDefault();

    let published;
    status === "Published" ? published = true : published = false;

    let post = {
      title: title,
      content: content,
      published: published,
    };

    createPost(post)
      .then(data => {
        alert("Post created successfully");
        window.location.reload(false);

        setTitle("");
        setContent("");
        setStatus("Published");
      })
      .catch(
        response => {
          alert("An unexpected error occurred ");
        }
      );
  }

  const handleSelect = (e) => {
    setStatus(e.target.value)
  }

  return (
    <div className="">
      <Form onSubmit={submit} className="block-example border border-light bg-grey-color p-5 m-5 ">
        <h2 className="mb-4 mt-2 text-primary text-center"><strong>Create New Post</strong></h2>
        <hr />
        <Form.Group className="m-4" controlId="Title">
          <Form.Label className="left-margin mb-3 mt-2"><strong>Title</strong></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="m-4" controlId="content">
          <Form.Label className="mb-3 mt-3 row-3"><strong>Content</strong></Form.Label>
          <Form.Control
            type="text"
            placeholder="abc..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="m-4" controlId="Published">
          <Form.Label className="mb-3 mt-3"><strong>Post Status</strong></Form.Label>
          <Form.Select className="col-3" onChange={handleSelect}>
            <option value="Published">Published</option>
            <option value="Drafted">Drafted</option>
          </Form.Select>
        </Form.Group>

        <div className="text-end">
          <Button className="mt-3 me-4" block size="md" type="submit" disabled={validate}>
            Create
          </Button>
        </div>
      </Form>
    </div >
  );
}
