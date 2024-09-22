import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./HomePage";
import BlogPage from "./BlogPage";
// import ArticleForm from './ArticleForm';
import ArticlePage from "./ArticlePage";
import Categories from "./Categories";
import ArticleDashboard from "../../features/articles/dashboard/ArticleDashboard";
import ArticleFormNew from "../../features/articles/form/ArticleFormNew";
import CommentDashboard from "../../features/comments/dashboard/CommentDashboard.jsx";
import CommentForm from "../../features/comments/form/CommentForm.jsx";
import SearchResultPage from "./SearchResultPage";
import SignInForm from "./SignInForm";
import LogInForm from "./LogInForm";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setUser } from "../slices/userSlice.js";
import UserDashboard from "../../features/users/dashboard/UserDashboard.jsx";
import MyArticlesPage from "./MyArticlesPage.jsx";
import AddArticlePage from "./AddArticlePage.jsx";
import AdminPage from "../admin/AdminPage.jsx";
import HomeLayout from "./HomeLayout.jsx";
import RoleDashboard from "../../features/roles/dashboard/RoleDashboard.jsx";
import AddRoleForm from "../../features/roles/form/AddRoleForm.jsx";
import AddDeleteUserRoleForm from "../../features/roles/form/AddDeleteUserRoleForm.jsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      axios
        .get("https://localhost:7153/api/authentication")
        .then((res) => {
          console.log(res);
          dispatch(setUser(res.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dispatch]);

  return (
    <Routes>
      {/* <Route path="/ArticleForm" Component={ArticleForm} /> */}

      <Route path="/admin/*" element={<AdminPage />}>
        <Route path="articles" Component={ArticleDashboard} />
        <Route
          path="articles/add"
          element={<ArticleFormNew cancelLinkTo="/admin/articles" />}
        />
        <Route
          path="articles/edit/:articleId"
          element={<ArticleFormNew cancelLinkTo="/admin/articles" />}
        />
        <Route path="comments" Component={CommentDashboard} />
        <Route path="comments/add" Component={CommentForm} />
        <Route path="comments/edit/:commentId" Component={CommentForm} />
        <Route path="users" Component={UserDashboard} />
        <Route path="roles" Component={RoleDashboard} />
        <Route path="roles/add" Component={AddRoleForm} />
        <Route
          path="roles/user/add"
          element={<AddDeleteUserRoleForm addFlag={1} />}
        />
        <Route
          path="roles/user/delete"
          element={<AddDeleteUserRoleForm addFlag={0} />}
        />
      </Route>
      <Route path="/*" element={<HomeLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="articles" Component={MyArticlesPage} />
        <Route path="articles/add" Component={AddArticlePage} />
        <Route path="articles/edit/:articleId" Component={AddArticlePage} />
        <Route path="Categories" Component={Categories} />
        <Route path="Categories" element={<Categories />} />
        <Route path="search" element={<SearchResultPage />} />
        <Route path="SignInForm" element={<SignInForm />} />
        <Route path="LogInForm" element={<LogInForm />} />
        <Route path="article/:id" Component={ArticlePage} />
      </Route>
      {/* Pass history prop to Navbar */}
      {/* <Route path="*" element={<Navbar />} /> */}
    </Routes>
  );
}

export default App;
