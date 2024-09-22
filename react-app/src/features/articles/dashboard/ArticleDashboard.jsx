import React, { useEffect, useState } from "react";
import ArticleTable from "./ArticleTable";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ArticleDashboard() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("https://localhost:7153/api/Articles"); //5052
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const handleArticleDelete = async (articleId) => {
    try {
      await axios.delete(`https://localhost:7153/api/Articles/${articleId}`);

      setArticles(
        articles.filter((article) => article.articleId !== articleId)
      );
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-5 p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white ml-[50px]">
        <h1 className="font-bold">Add Article</h1>
        <Link to="/admin/articles/add" className="w-fit h-fit">
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 "
          >
            Add New
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg flex-5 m-[50px]">
        <ArticleTable
          handleArticleDelete={handleArticleDelete}
          articles={articles}
          style={{ marginTop: "20px" }}
        />
      </div>
    </div>
  );
}
