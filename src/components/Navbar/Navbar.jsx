import styles from "./Navbar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Userposts from "../Userposts/Userposts";
import Home from "../Home/Home";
import { useContext } from "react";
import { TokenContext } from "../../Context/TokenContetext";

export default function Navbar() {
    let navigate = useNavigate()
    let { token ,setToken } = useContext(TokenContext);
    // console.log(token);


    function logOut() {

        localStorage.removeItem("User Token")

        setToken(null)

        navigate("/Login")

    }
    return (
        <>
            <div className="bg-blue-200 shadow-sm">
                <div className="w-[80%] navbar mx-auto">
                    <div className="flex-1">
                        <Link
                            to="/"
                            className="btn text-blue-800 font-bold text-2xl btn-ghost hover:bg-blue-400 outline-none border-0"
                        >
                            Linked Posts
                        </Link>
                    </div>
                    <div className="flex gap-2">
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                            >
                                {token ? (
                                    <>
                                        <li>
                                            <NavLink to="/">Home</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/Userposts">
                                                User Posts
                                            </NavLink>
                                        </li>
                                    </>
                                ) : null}

                                {token ? (
                                    <li>
                                        <a onClick={()=> logOut()}>Logout</a>
                                    </li>
                                ) : (
                                    <>
                                        <li>
                                            <NavLink to="/Register">
                                                Register
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/Login">Login</NavLink>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
