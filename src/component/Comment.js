// import React, { useState } from "react";

// const Comment = (props) => {
  
//   const [comment, setComment] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(comment);
//     setComment('');
//   };

//   return (
//     <div className="CommentPage">
//       <div className="CommentForm">
//         <form onSubmit={handleSubmit}>
        
//           <label>Please enter your comment for {props.resName} here:</label>
//           <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        
//         <button type="submit">Submit</button>
//       </form>
//       </div>
//     </div>
    
//   );
// };

// export default Comment;