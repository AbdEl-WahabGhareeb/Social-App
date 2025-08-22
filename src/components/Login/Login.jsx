import React, { useContext } from "react";
import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TokenContext } from "./../../Context/TokenContetext";

export default function Login() {
    let { token, setToken } = useContext(TokenContext);
    let schema = z.object({
        email: z.string().nonempty("Email is Required"),
        password: z
            .string()
            .regex(/^[A-Z][0-9a-z]{3,9}/, "Password not valid")
            .nonempty("Password is Required"),
    });
    let navigate = useNavigate();
    let {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        setError,
    } = useForm({ resolver: zodResolver(schema) });
    async function onSubmit(values) {
        try {
            let { data } = await axios.post(
                "https://linked-posts.routemisr.com/users/signin",
                values
            );
            console.log(data);
            if (data.message == "success") {
                // 1- save token to local storage
                localStorage.setItem("User Token", data.token);
                // 2- save token to tokenContext
                setToken(data.token);
                navigate("/");
            }
        } catch (error) {
            console.log(error.response.data.error);
            setError("root", { message: error.response.data.error });
        }
    }
    return (
        <>
            <div className="md:w-full lg:w-1/2 mx-auto shadow-2xl p-12 my-8">
                <h3 className="text-blue-600 text-2xl mb-4">Login Form</h3>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {...register("email")}
                        className="w-full px-3 text-white my-2 border-2 rounded-2xl outline-0 p-2 placeholder:text-gray-400 border-gray-200 "
                        placeholder="Type your email..."
                        type="email"
                    />
                    {errors.email && (
                        <p className="p-2 bg-red-500 text-white rounded-2xl text-center">
                            {errors.email.message}
                        </p>
                    )}

                    <input
                        {...register("password")}
                        className="w-full px-3 text-white my-2 border-2 rounded-2xl outline-0 p-2 placeholder:text-gray-400 border-gray-200 "
                        placeholder="Type your password"
                        type="password"
                    />
                    {errors.password && (
                        <p className="p-2 bg-red-500 text-white rounded-2xl text-center">
                            {errors.password.message}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 my-2 bg-blue-600 cursor-pointer hover:bg-blue-400 text-white outline-0 border-0 transition-all rounded-2xl"
                    >
                        {isSubmitting ? "Loading....." : "Login"}
                    </button>
                </form>
            </div>
        </>
    );
}
