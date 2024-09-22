import React, { useEffect, useState } from "react";
import CommentTable from "./CommentTable";
import axios from "axios";

export default function CommentDashboard() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get("https://localhost:7153/api/comment"); //5052
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(`https://localhost:7153/api/comment/${commentId}`);

      setComments(
        comments.filter((comment) => comment.commentId !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg flex-5 m-[50px]">
      <CommentTable
        handleCommentDelete={handleCommentDelete}
        comments={comments}
        style={{ marginTop: "20px" }}
      />
    </div>
  );
}
