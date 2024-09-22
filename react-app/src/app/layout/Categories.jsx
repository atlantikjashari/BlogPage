import React, { useState, useEffect } from "react";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");

  useEffect(() => {
    // Fetch categories from API
    axios
      .get("https://localhost:7153/Api/Categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleAddCategory = () => {
    // Send POST request to create new category
    axios
      .post("https://localhost:7153/Api/Categories", {
        categoryName: newCategoryName,
      })
      .then((response) => {
        setCategories([...categories, response.data]);
        setNewCategoryName("");
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });
  };

  const handleEditCategory = async () => {
    // Send PUT request to edit category
    await axios
      .put(
        `https://localhost:7153/Api/Categories/${editingCategory.categoryId}`,
        {
          categoryName: editCategoryName,
          categoryId: editingCategory.categoryId,
        }
      )
      .then(() => {
        const updatedCategories = categories.map((category) => {
          if (category.categoryId === editingCategory.categoryId) {
            return { ...category, categoryName: editCategoryName };
          }
          return category;
        });
        setCategories(updatedCategories);
        setEditingCategory(null);
        setEditCategoryName("");
      })
      .catch((error) => {
        console.error("Error editing category:", error);
      });
  };

  const handleDeleteCategory = async (categoryId) => {
    // Send DELETE request to remove category
    await axios
      .delete(`https://localhost:7153/Api/Categories/${categoryId}`)
      .then(() => {
        setCategories(
          categories.filter((category) => category.categoryId !== categoryId)
        );
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  return (
    <div className="h-screen flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="flex flex-row items-center mb-4">
        <input
          type="text"
          className="border border-gray-400 p-2 mr-2"
          placeholder="New Category Name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddCategory}
        >
          Add Category
        </button>
      </div>
      <ul>
        {categories.map((category) => (
          <li
            key={category.categoryId}
            className="flex items-center justify-between border-b py-2 gap-5"
          >
            <span>{category.categoryName}</span>
            <div>
              <button
                className="text-blue-500 mr-2"
                onClick={() => {
                  setEditingCategory(category);
                  setEditCategoryName(category.categoryName);
                }}
              >
                Edit
              </button>
              <button
                className="text-red-500"
                onClick={() => handleDeleteCategory(category.categoryId)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Edit Category</h2>
            <input
              type="text"
              className="border border-gray-400 p-2 w-full mb-4"
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleEditCategory}
              >
                Save
              </button>
              <button
                className="bg-gray-400 text-gray-800 px-4 py-2 rounded"
                onClick={() => setEditingCategory(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
