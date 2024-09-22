import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { v4 as uuid } from "uuid";

export default function ArticleFormNew({ cancelLinkTo }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(undefined);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  const { articleId } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7153/api/Articles/${articleId}`
        );
        setTitle(response.data.title);
        setContent(response.data.content);
        setImageUrl(response.data.image);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    if (articleId) fetchArticle();
  }, [articleId]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleArticleSave = async (e) => {
    e.preventDefault();
    if (!articleId) {
      try {
        const id = uuid();
        await axios.post("https://localhost:7153/api/articles", {
          articleId: id,
          title,
          content,
        });
        if (image !== undefined) {
          const formData = new FormData();
          formData.append("File", image);
          await axios.post(
            `https://localhost:7153/api/photos/${id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }
        navigate(cancelLinkTo);
      } catch (error) {
        console.error("Error adding article:", error);
      }
    } else {
      try {
        await axios.put(`https://localhost:7153/api/articles/${articleId}`, {
          articleId,
          title,
          content,
        });
        if (imageUrl !== null && image !== undefined) {
          const formData = new FormData();
          formData.append("File", image);
          await axios.delete(`https://localhost:7153/api/photos/${articleId}`);
          await axios.post(
            `https://localhost:7153/api/photos/${articleId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } else if (image !== undefined) {
          const formData = new FormData();
          formData.append("File", image);
          await axios.post(
            `https://localhost:7153/api/photos/${articleId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }
        navigate(cancelLinkTo);
      } catch (error) {
        console.error("Error updating article:", error);
      }
    }
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
              Title
            </label>
            <input
              type="title"
              id="title"
              value={title}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="content"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Content
            </label>
            <input
              type="content"
              id="content"
              value={content}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="image"
            >
              Upload file
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
              id="image"
              type="file"
              onChange={handleImageUpload}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <Link to={ cancelLinkTo}>
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
              onClick={handleArticleSave}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
