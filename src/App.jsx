import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Register from "./components/Register/Register";
import Userposts from "./components/Userposts/Userposts";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import ProtectedAuth from "./components/ProtectedAuth/ProtectedAuth";
import PostDetails from "./components/PostDetails/PostDetails";

function App() {
    let routes = createHashRouter([
        {
            path: "",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: (
                        <ProtectedRoutes>
                            <Home />
                        </ProtectedRoutes>
                    ),
                },
                {
                    path: "userposts",
                    element: (
                        <ProtectedRoutes>
                            <Userposts />
                        </ProtectedRoutes>
                    ),
                },
                {
                    path: "postDetails/:postId",
                    element: (
                        <ProtectedRoutes>
                            <PostDetails />
                        </ProtectedRoutes>
                    ),
                },

                {
                    path: "login",
                    element: (
                        <ProtectedAuth>
                            <Login />
                        </ProtectedAuth>
                    ),
                },
                {
                    path: "register",
                    element: (
                        <ProtectedAuth>
                            <Register />
                        </ProtectedAuth>
                    ),
                },

                { path: "*", element: <NotFound /> },
            ],
        },
    ]);
    return (
        <>
            <RouterProvider router={routes}></RouterProvider>
        </>
    );
}

export default App;
