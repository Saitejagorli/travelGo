import { createBrowserRouter } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import Home from "../components/home/Home.js";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import About from "../components/pages/About.js";
import Contact from "../components/pages/Contact.js";
import { Profile } from "../components/user/Profilepage";
import PageNotFound from "../components/layout/PageNotFound.js";
import { BlogSection, NormalBlog } from "../components/blog/BlogTemplates.js";
import TextEditor from "../components/editor/TextEditor.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/signup",
        element: <Signup />,
      },
      {
        path: "/users/:userId",
        element: <Profile />,
      },

      {
        path: "/blogs/:postId",
        element: <NormalBlog />,
      },
      {
        path: "/blogs/:section/:postId",
        element: <BlogSection />,
      },
      {
        path: "/blogs/create-blog-post",
        element: <TextEditor />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
