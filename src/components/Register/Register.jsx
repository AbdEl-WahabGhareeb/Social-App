import React from "react";
import styles from "./Register.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Register() {
    let schema = z.object({
        name: z
            .string()
            .nonempty("Name is Required")
            .min(3, "Name must be more than 3 Characters"),
        email: z.string().nonempty("Email is Required"),
        password: z
            .string()
            .regex(/^[A-Z][0-9a-z]{3,9}/, "Password not valid")
            .nonempty("Password is Required"),
        rePassword: z
            .string()
            .regex(/^[A-Z][0-9a-z]{3,9}/, "Password not valid")
            .nonempty("Password is Required"),
        dateOfBirth: z.string().nonempty("Please select your birthday date"),
        gender: z.enum(["male", "female"]),
    });
    // z.refine((data) => data.password == data.rePassword, {
    //     message: "Password Does Not Match",
    //     path: "rePassword",
    // });
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
                "https://linked-posts.routemisr.com/users/signup",
                values
            );
            console.log(data);
            if (data.message == "success") {
                navigate("/Login");
            }
        } catch (error) {
            console.log(error.response.data.error);
            setError("root", { message: error.response.data.error });
        }
    }

    return (
        <>
            <h1 className="text-4xl text-blue-600 text-center font-semibold mt-5">
                Linked Posts
            </h1>
            <div className="w-1/2 mx-auto shadow-2xl p-12 my-8">
                <h3 className="text-blue-600 text-2xl mb-4">Register Now</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {...register("name")}
                        className="w-full px-3 my-2 border-2 rounded-2xl outline-0 p-2 placeholder:text-gray-400 border-gray-200 text-black "
                        placeholder="Type your name..."
                        type="text"
                    />
                    {errors.name && (
                        <p className="p-2 bg-red-500 text-white rounded-2xl text-center">
                            {errors.name.message}
                        </p>
                    )}

                    <input
                        {...register("email")}
                        className="w-full px-3 my-2 border-2 rounded-2xl outline-0 p-2 placeholder:text-gray-400 border-gray-200 text-black "
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
                        className="w-full px-3 my-2 border-2 rounded-2xl outline-0 p-2 placeholder:text-gray-400 border-gray-200 text-black "
                        placeholder="Type your password"
                        type="password"
                    />
                    {errors.password && (
                        <p className="p-2 bg-red-500 text-white rounded-2xl text-center">
                            {errors.password.message}
                        </p>
                    )}

                    <input
                        {...register("rePassword")}
                        className="w-full px-3 my-2 border-2 rounded-2xl outline-0 p-2 placeholder:text-gray-400 border-gray-200 text-black "
                        placeholder="Confirm password"
                        type="password"
                    />
                    {errors.rePassword && (
                        <p className="p-2 bg-red-500 text-white rounded-2xl text-center">
                            {errors.rePassword.message}
                        </p>
                    )}

                    <input
                        {...register("dateOfBirth")}
                        type="date"
                        placeholder="Select your Birthdate"
                        className="w-full px-3 my-3 border-2 rounded-2xl outline-0 py-2  placeholder:text-gray-400 border-gray-200 text-black "
                    />
                    {errors.dateOfBirth && (
                        <p className="p-2 bg-red-500 text-white rounded-2xl text-center">
                            {errors.dateOfBirth.message}
                        </p>
                    )}

                    <div className="gender my-3">
                        <input
                            {...register("gender")}
                            type="radio"
                            className="me-1"
                            id="male"
                            name="gender"
                            value="male"
                        />
                        <label className="text-black me-4" htmlFor="male">
                            male
                        </label>

                        <input
                            {...register("gender")}
                            type="radio"
                            className="me-1"
                            id="female"
                            name="gender"
                            value="female"
                        />
                        <label className="text-black me-4" htmlFor="female">
                            female
                        </label>
                    </div>
                    {errors.gender && (
                        <p className="p-2 bg-red-500 text-white rounded-2xl text-center">
                            {errors.gender.message}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 my-2 bg-blue-600 cursor-pointer hover:bg-blue-400 text-white outline-0 border-0 transition-all rounded-2xl"
                    >
                        {isSubmitting ? "Loading....." : "SignUp"}
                    </button>

                    {errors.root && (
                        <p className="p-2 bg-red-500 text-white rounded-2xl text-center">
                            {errors.root.message}
                        </p>
                    )}
                </form>
            </div>
        </>
    );
}
