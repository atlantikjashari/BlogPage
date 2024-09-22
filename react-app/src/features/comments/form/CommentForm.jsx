import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { v4 as uuid } from "uuid";

export default function CommentForm() {
  const [body, setBody] = useState("");
  const [articleId, setArticleId] = useState("");
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const { commentId } = useParams();

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7153/api/comment/${commentId}`
        );
        setBody(response.data.body);
        setArticleId(response.data.article.articleId);
      } catch (error) {
        console.error("Error fetching comment:", error);
      }
    };

    const fetchArticles = async () => {
      try {
        const response = await axios.get(`https://localhost:7153/api/articles`);
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    if (commentId) fetchComment();
    fetchArticles();
  }, [commentId]);

  const handleCommentSave = async (e) => {
    e.preventDefault();
    if (!commentId) {
      try {
        const id = uuid();
        await axios.post(`https://localhost:7153/api/comment/${articleId}`, {
          commentId: id,
          body,
        });
        navigate("/admin/comments");
      } catch (error) {
        console.error("Error adding article:", error);
      }
    } else {
      try {
        const selectedArticle = await axios.get(
          `https://localhost:7153/api/articles/${articleId}`
        );
        await axios.put(`https://localhost:7153/api/comment/${commentId}`, {
          commentId,
          body,
          article: selectedArticle.data,
        });
        navigate("/admin/comments");
      } catch (error) {
        console.error("Error updating comment:", error);
      }
    }
  };

  const handleArticleChange = async (e) => {
    setArticleId(e.target.value);
  };

  return (
    <div style={{ display: "flex", margin: "0 auto" }}>
      <div style={{ flex: 5, margin: "50px" }}>
        <div className="top gap-4 mb-4 text-center font-bold">
          <h1>Add/Edit</h1>
        </div>
        <form className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Body
            </label>
            <input
              type="body"
              id="body"
              value={body}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="articles"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Select your article
            </label>
            <select
              id="articles"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={handleArticleChange}
              value={articleId}
            >
              <option value=""></option>
              {articles.map((article) => (
                <option key={article.articleId} value={article.articleId}>
                  {article.title}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Link to="/admin/comments">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                type="button"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={handleCommentSave}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
