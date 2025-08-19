import React, { useContext, useEffect, useState } from "react";
import styles from "./PostDetails.module.css";
import { useParams } from "react-router-dom";
import { postContext } from "../../Context/PostContext";
import Loader from "../Loader/Loader";
import PostCard from "../PostCard/PostCard";

export default function PostDetails() {
    let { postId } = useParams();
    console.log(postId);

    let { getSinglePost } = useContext(postContext);
    const [isLoading, setIsLoading] = useState(true);
    const [singlePost, setSinglePost] = useState(null);

    async function getTheSinglePost(postId) {
        let response = await getSinglePost(postId);
        setIsLoading(false);
        setSinglePost(response);
        console.log(response);
    }

    useEffect(() => {
        getTheSinglePost(postId);
    }, []);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="containe flex justify-center items-center flex-col">
                    <h1 className="text-2xl font-bold text-center mt-12 ">
                        Post Details
                    </h1>
                    <PostCard post={singlePost} />
                </div>
            )}
        </>
    );
}
