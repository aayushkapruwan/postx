import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Signin from "./components/signin/Signin.jsx";
import Signup from "./components/signup/signup.jsx";
import Home from "./components/home/Home.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BlogEditor from "./components/blogeditor/BlogEditor.jsx";
import Blogpage from "./components/blogpage/Blogpage.jsx";
const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "/signin", element: <Signin /> },
      { path: "/signup", element: <Signup /> },
      { path: "/postform", element: <BlogEditor /> },
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
