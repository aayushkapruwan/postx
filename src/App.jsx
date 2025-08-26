import { useEffect, useState } from "react";
import { login, logout } from "./slices/authslice.js";
import { useDispatch } from "react-redux";
import Header from "./components/header/header.jsx";
import authServiceInstance from "./appwrite/authservice.js";
import loadingGif from "./assets/loading.gif"; // Import the loading GIF
import { motion } from "framer-motion";
import Footerx from "./components/footer/footer.jsx";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import LoadingIcon from "./components/loadingcomponent/loadingcomponent.jsx";
function App() {
  const check = useSelector((state) => state.authslice.status);
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    check
      ? authServiceInstance.accountLogin({
          email: "kapruwanayush67@gmail.com",
          password: "Ayush@7310",
        })
      : undefined;

    authServiceInstance
      .getCurrentUser()
      .then((userdata) => {
        if (userdata) {
          dispatch(login({ ...userdata }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setloading(false);
      });
  }, []);

  return (
    <>
      
      {loading ? (
        <LoadingIcon />
      ) : (
        <>
    <div className="flex flex-col min-h-screen w-full  overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto overflow-x-hidden pt-2 pb-7">
    <Outlet/>
      </main>

      {/* Footer */}
      <Footerx />
    </div>
        </>
      )}
    </>
  );
}
export default App;
