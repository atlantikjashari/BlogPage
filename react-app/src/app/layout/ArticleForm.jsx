import React, { useState } from 'react';

const ArticleForm = ({ onSubmit, article }) => {
  const [title, setTitle] = useState(article ? article.title : '');
  const [author, setAuthor] = useState(article ? article.author : '');
  const [content, setContent] = useState(article ? article.content : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, author, content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="author" className="block text-gray-700 font-bold mb-2">Author</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full h-32"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
    </form>
  );
};

export default ArticleForm;
