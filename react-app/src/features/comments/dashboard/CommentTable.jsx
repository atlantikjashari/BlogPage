import React from "react";
import { Link } from "react-router-dom";

export default function CommentTable({ comments, handleCommentDelete }) {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
      <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white">
        <p>Add Comment</p>
        <Link to="/admin/comments/add">
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Add New
          </button>
        </Link>
      </caption>
      <thead className="text-xs text-gray-700 uppercase bg-gray-100">
        <tr>
          <th scope="col" className="px-6 py-3">
            ID
          </th>
          <th scope="col" className="px-6 py-3">
            Body
          </th>
          <th scope="col" className="px-6 py-3">
            Article
          </th>
          <th scope="col" className="px-6 py-3">
            Created At
          </th>
          <th scope="col" className="px-6 py-3">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {comments.map((comment) => (
          <tr key={comment.commentId} className="bg-white border-b">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r"
            >
              {comment.commentId}
            </th>
            <td className="px-6 py-4 border-r">{comment.body}</td>
            <td className="px-6 py-4 border-r">{comment.article?.title}</td>
            <td className="px-6 py-4 border-r">{comment.createdAt}</td>
            <td className="px-6 py-4 text-center">
              <button
                type="button"
                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={() => handleCommentDelete(comment.commentId)}
              >
                Delete
              </button>
              <Link to={`/admin/comments/edit/${comment.commentId}`}>
                <button
                  type="button"
                  className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Update
                </button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
