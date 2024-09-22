import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import blogImage from './assets/blogImage.jpg';
import axios from 'axios';


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const HomePage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchTopArticles = async () => {
      try {
        const response = await axios.get('https://localhost:7153/api/Articles');
        const sortedArticles = response.data.sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));
        setArticles(sortedArticles.slice(0, 6));
      } catch (error) {
        console.error('Error fetching newest articles:', error);
      }
    };

    fetchTopArticles();
  }, []);

  return (
    <div>

      <div className="bg-gradient-to-r from-gray-100 to-purple-100 min-h-screen flex flex-col justify-center items-center">
        <div className="container mx-auto px-4 py-8">
          <img src={blogImage} alt="Blog" className="w-full h-80 mb-8" />
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to Our Blog</h1>
            <p className="text-lg text-gray-600">This is the beginning of anything you want</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map(article => {
              const newDate = formatDate(article.publicationDate);
              return (
                <article key={article.articleId} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src="https://picsum.photos/200/200" alt="Article Thumbnail" className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <p className="text-sm text-blue-500 mb-2">{article.tags ? article.tags[0] : ''}</p>
                    <h2 className="text-xl font-semibold mb-2"><Link to={`/article/${article.articleId}`} className="hover:underline">{article.title}</Link></h2>
                    <p className="text-gray-800 mb-4">{article.content.slice(0, 100)}...</p>
                    <p className="text-gray-600">By {article.author} | {newDate}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default HomePage;
