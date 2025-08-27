import { useEffect, useState } from "react";
import { login, logout } from "./slices/authslice.js";
import { useDispatch } from "react-redux";
import authServiceInstance from "./appwrite/authservice.js";
import Header from "./components/header/header.jsx";
import Footerx from "./components/footer/footer.jsx";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import LoadingIcon from "./components/loadingcomponent/loadingcomponent.jsx";
function App() {
  const [userdata, setUserdata] = useState(null);
  const data = useSelector((state) => state.authslice.userdata);

  useEffect(() => {
    setUserdata(data);
  }, [data]);
  const check = useSelector((state) => state.authslice.status);
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    check ? authServiceInstance.accountLogin(...userdata) : undefined;

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
        <LoadingIcon height="h-screen" />
      ) : (
        <>
          <div className="flex flex-col min-h-screen w-full  overflow-hidden">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="flex-grow overflow-y-auto overflow-x-hidden ">
              <Outlet />
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
