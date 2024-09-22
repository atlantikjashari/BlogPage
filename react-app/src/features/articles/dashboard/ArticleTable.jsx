import React from "react";
import { Link } from "react-router-dom";

export default function ArticleTable({ articles, handleArticleDelete }) {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-100">
        <tr>
          <th scope="col" className="px-6 py-3">
            ID
          </th>
          <th scope="col" className="px-6 py-3">
            Title
          </th>
          <th scope="col" className="px-6 py-3">
            Content
          </th>
          <th scope="col" className="px-6 py-3">
            Publication Date
          </th>
          <th scope="col" className="px-6 py-3">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {articles.map((article) => (
          <tr key={article.articleId} className="bg-white border-b">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r"
            >
              {article.articleId}
            </th>
            <td className="px-6 py-4 border-r">{article.title}</td>
            <td className="px-6 py-4 border-r">{article.content}</td>
            <td className="px-6 py-4 border-r">{article.publicationDate}</td>
            <td className="px-6 py-4 text-center">
              <button
                type="button"
                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={() => handleArticleDelete(article.articleId)}
              >
                Delete
              </button>
              <Link to={`/admin/articles/edit/${article.articleId}`}>
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
