import { useContext, useEffect, useState } from "react";
import styles from "./Home.module.css";
import { postContext } from "../../Context/PostContext";
import PostCard from "../PostCard/PostCard";
import Loader from "../Loader/Loader";
import AddPost from "../AddPost/AddPost";

export default function Home() {
    const [allPosts, setAllPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let { getAllPosts } = useContext(postContext);

    async function getPosts() {
        let response = await getAllPosts();
        // console.log(response);
        setAllPosts(response);
        setIsLoading(false);
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="container mx-auto">
                        <h2 className="mb-12 text-2xl font-bold text-center text-blue-500  ">
                            Home
                        </h2>
                        <AddPost />
                        <div className="flex justify-center items-center">
                            <div className="w-full">
                                {allPosts.map((post) => (
                                    <PostCard key={post._id} post={post} />
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
