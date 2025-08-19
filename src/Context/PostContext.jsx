import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let postContext = createContext(null);

export default function PostContextProvider({ children }) {
    const [posts, setPosts] = useState([]);
    
    let headers = {
        token: localStorage.getItem("User Token"),
    };
    
    async function getAllPosts() {
        try {
            let { data } = await axios.get(
                `https://linked-posts.routemisr.com/posts?limit=50`,
                { headers }
            );
            setPosts(data.posts);
            return data.posts;
        } catch (error) {
            console.log(error);
        }
    }

    async function getSinglePost(postId) {
        try {
            let { data } = await axios.get(
                `https://linked-posts.routemisr.com/posts/${postId}`,
                {
                    headers,
                }
            );
            // console.log(data, "Single Post");
            return data.post;
        } catch (error) {
            console.log(error);
        }
    }

    async function addComment(body) {
        try {
            let { data } = await axios.post(
                `https://linked-posts.routemisr.com/comments/`,
                body,
                {
                    headers,
                }
            );
            toast.success('Comment Added Successfully!')

            // console.log(data, "add comment");
            return data.comments;
        } catch (error) {
            console.log(error);
            toast.error("Comment didn't add.")

        }
    }

    async function addSinglePost(formData) {
        try {
            const { data } = await axios.post(
                'https://linked-posts.routemisr.com/posts',
                formData,
                { headers }
            );
            setPosts(prevPosts => [data.post, ...prevPosts]);
            toast.success('Post Added Successfully!')

            console.log(data, "add post");
            // return data.comments;
        } catch (error) {
            console.log(error);
            toast.error("Post didn't add.")

        }
    }

    async function getUserData() {
        try {
            let { data } = await axios.get(
                `https://linked-posts.routemisr.com/users/profile-data`,
                {
                    headers,
                }
            );
            // console.log(data, "add comment");

            return data.user;
        } catch (error) {
            console.log(error);
        }
    }

    async function getUserPosts(userId) {
        try {
            let { data } = await axios.get(
                `https://linked-posts.routemisr.com/users/${userId}/posts?limit=2`,
                {
                    headers,
                }
            );
            // console.log(data, "User Posts");
            return data.posts;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <postContext.Provider
            value={{
                getAllPosts,
                getSinglePost,
                getUserPosts,
                getUserData,
                addComment,
                addSinglePost,
                posts
            }}
        >
            {children}
        </postContext.Provider>
    );
}
