import React, { useState } from "react";

const Comment = (props) => {
    const [comment, setComment] = useState("");
    
    const submitHandler = (event) => {
        event.preventDefault();
        console.log(comment);
    };

    return (
        <form onSubmit={submitHandler}>
          <label>
            Please enter your comment for {props} here:
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
          </label>
          <button type="submit">Submit</button>
        </form>
      );
};

export default Comment;