/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentForm from "./CommentForm";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

// Function to format date string
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Functional component for displaying article and its comments
const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState([]);
  const [newestArticles, setNewestArticles] = useState([]);
  const [comments, setComments] = useState([]);

  // useEffect hook to fetch article and comments data
  useEffect(() => {
    const fetchArticle = async (id) => {
      try {
        const response = await axios.get(
          `https://localhost:7153/api/Articles/${id}`
        );
        setArticle(response.data);
        window.scrollTo(0, 0); // Scroll to the top of the page when article changes
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    const fetchNewestArticles = async () => {
      try {
        const response = await axios.get("https://localhost:7153/api/Articles");
        const sortedArticles = response.data.sort(
          (a, b) => new Date(b.publicationDate) - new Date(a.publicationDate)
        );
        setNewestArticles(sortedArticles.slice(0, 3));
      } catch (error) {
        console.error("Error fetching newest articles:", error);
      }
    };

    const fetchComments = async (id) => {
      try {
        const response = await axios.get(
          `https://localhost:7153/Api/Comment/blog/${id}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchArticle(id);
    fetchComments(id);
    fetchNewestArticles();
  }, [id]);

  // Function to handle comment submission
  const handleSubmitComment = async (commentData) => {
    try {
      const response = await axios.post(
        `https://localhost:7153/Api/Comment/${id}`,
        {
          commentId: uuid(),
          body: commentData.content, // Sending the comment content as 'body'
        }
      );
      setComments([...comments, response.data]);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <div className='h-screen'>
        <Navbar />
        <div className="text-gray-700 p-6 min-h-screen">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl mb-2 font-semibold text-center">{article.title}</h2>
              <div className="mb-2 flex justify-center">
                  {article.photo ? (
                    <img src={article.photo.url} alt="Description" className="rounded-lg object-cover max-h-400 w-full"></img>
                  ) : (
                  <img src="https://picsum.photos/600/400" alt="Description" className="rounded-lg object-cover w-auto h-auto" />
                  )}
              </div>
              <p className="text-gray-600 mb-4 text-center">By {article.author} | Published on {formatDate(article.publicationDate)}</p>
              <p className="text-gray-800 text-left">{article.content}</p>
            </div>
        </div>
        <div className="container max-w-4xl mx-auto px-4 py-8 mb-4 border-t border-gray-300">
            <CommentForm onSubmit={handleSubmitComment} />
            <div className="grid grid-cols-1 gap-4">
                {comments.map((comment, index) => (
                    <div key={index} className="rounded-lg hover:bg-slate-50 p-4 transition ease-in">
                        <p className="text-gray-800 text-bold">{comment.body}</p>
                        <p className="text-gray-600 text-sm">Published on {formatDate(comment.createdAt)}</p>
                    </div>
                ))}
            </div>
        </div>
        <div className="bg-slate-50 container mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {newestArticles.map((newestArticle, index) => (
                    <div key={index} className="bg-white shadow-[0.2em_0.2em_0.4em_#dfe1e2,-0.2em_-0.2em_0.4em_#fdfefe] hover:shadow-[0.6em_0.6em_0.8em_#dfe1e2,-0.6em_-0.6em_0.8em_#fdfefe] rounded-lg p-4 transition ease-in">
                        <h3 className="text-lg font-semibold mb-2 text-center hover:text-blue-600">
                            <Link
                                to={`/article/${newestArticle.articleId}`}
                                onClick={() => window.scrollTo(0, 0)}
                            >
                                {newestArticle.title}
                            </Link>
                        </h3>
                        <div className="mb-4 flex justify-center">
                            <img src="https://picsum.photos/600/600" alt="Description" className="rounded-lg object-cover w-64 h-auto" />
                        </div>
                        <p className="text-gray-800 mb-4 text-center">{newestArticle.content}</p>
                        <p className="text-gray-600 text-center">By {newestArticle.author} | Published on {formatDate(newestArticle.publicationDate)}</p>
                        <p className="text-gray-700">{newestArticle.shortDescription}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default ArticlePage;
