import React, { useContext, useEffect, useState } from "react";
import styles from "./UserPosts.module.css";
import { postContext } from "../../Context/PostContext";
import Loader from "../Loader/Loader";
import PostCard from "../PostCard/PostCard";
import AddPost from "../AddPost/AddPost";

export default function UserPosts() {
    let { getUserData, getUserPosts } = useContext(postContext);
    const [userPosts, setUserPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getUserId() {
        let response = await getUserData();
        let data = await getUserPosts(response._id);
        console.log(data, "User Posts");
        console.log(response._id, "User ID");
        setUserPosts(data);
        setIsLoading(false);
    }

    useEffect(() => {
        getUserId();
    }, []);
    return (
        <>
            <>
                <div className="container mx-auto">
                    <h2 className="my-12 text-2xl font-bold text-center text-blue-500 ">
                        My Posts
                    </h2>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <>
                            <AddPost callback={getUserId} />
                            <div className="flex justify-center items-center">
                                <div className="w-full">
                                    {userPosts.map((post) => (
                                        <PostCard key={post._id} post={post} />
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </>
        </>
    );
}
