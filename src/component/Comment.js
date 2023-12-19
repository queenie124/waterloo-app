import React, { useState } from "react";

const Comment = (props) => {
  
  const [comment, setComment] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(comment);
  };

  return (
    <div className="CommentPage">
      <div className="CommentForm">
        <form onSubmit={submitHandler}>
        <label>
          Please enter your comment for {props.resName} here:
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      </div>
    </div>
    
  );
};

export default Comment;