import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Signin from "./webpages/signin.jsx";
import Signup from "./webpages/signup.jsx";
import Home from "./webpages/Home.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Blogpage from "./webpages/Blogpage.jsx";
import Addpost from "./webpages/Addpost.jsx";
import Editpost from "./webpages/Editpost.jsx";
import AllPosts from "./webpages/Allposts.jsx";
const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "allposts", element: <AllPosts /> },
      { path: "signin", element: <Signin /> },
      { path: "signup", element: <Signup /> },
      { path: "Addpost", element: <Addpost /> },
      { path: "Editpost/:postid", element: <Editpost /> },
      { path: "post/:postid", element: <Blogpage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
