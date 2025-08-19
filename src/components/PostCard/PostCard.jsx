import { useContext, useEffect, useState } from "react";
import commentImg from "../../assets/testimonial-2.jpg";
import postImg from "../../assets/post-1.jpg";
import { Link } from "react-router-dom";
import { postContext } from "./../../Context/PostContext";

export default function PostCard({ post }) {
    const [showComments, setShowComments] = useState(false);
    const [moreComments, setMoreComments] = useState(3);
    const [commentContent, setCommentContent] = useState("");
    const [comments, setComments] = useState([])
    let { addComment } = useContext(postContext);

    useEffect(()=> {
        setComments(post.comments)
    },[])


    async function handleAddComment(e) {
        e.preventDefault();
        let response = await addComment({
            content: commentContent,
            post: post._id,
        });
        console.log(response, "add comment response");
        setComments(response)
    }

    return (
        <>
            <div className="card bg-blue-950 shadow-md p-4 max-w-xl mx-auto my-6">
                <Link to={`/postDetails/${post?._id}`}>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="avatar">
                            <div className="w-10 rounded-full">
                                <img src={post?.user?.photo} alt="User" />
                            </div>
                        </div>
                        <div>
                            <p className="font-bold">{post?.user?.name}</p>
                            <p className="text-sm text-gray-400">
                                {post?.createdAt}
                            </p>
                        </div>
                    </div>
                    <p className="mb-3">{post?.body} </p>
                </Link>

                <img
                    src={post?.image ? post?.image : postImg}
                    className="rounded-lg w-full h-[350px] mb-4"
                    alt="Post"
                />

                <div className="flex gap-3 text-sm text-gray-500">
                    <button className="btn btn-ghost btn-sm">👍 Like</button>
                    <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => setShowComments(!showComments)}
                    >
                        💬 Comment {comments.length}
                    </button>
                    <button className="btn btn-ghost btn-sm">↪️ Share</button>
                </div>

                {/* Toggle Comments Section */}
                {showComments && (
                    <div className="mt-4">
                        {comments.slice(0, moreComments).map((comment) => (
                            <div key={comment._id} comment={comment}>
                                <div className="mb-2 flex justify-between gap-3 items-center">
                                    <div className="">
                                        <div className=" avatar">
                                            <div className="w-8 h-8 rounded-full ">
                                                <img
                                                    src={
                                                        comment?.commentCreator?.photo.includes(
                                                            "undefined"
                                                        )
                                                            ? commentImg
                                                            : comment
                                                                  ?.commentCreator
                                                                  ?.photo
                                                    }
                                                    alt="Commenter"
                                                />
                                            </div>
                                        </div>
                                        <p>{comment?.commentCreator?.name} </p>
                                    </div>
                                    <div className="chat-bubble w-full">
                                        {comment?.content}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {comments.length > moreComments && (
                            <div className="my-5 text-center">
                                <button
                                    className="bg-blue-400 cursor-pointer hover:bg-blue-600 transition-all px-4 py-2 text-center text-white rounded-md btn-sm"
                                    onClick={() =>
                                        setMoreComments(moreComments + 1)
                                    }
                                >
                                    Load more comments
                                </button>
                            </div>
                        )}

                        {/* New Comment Input */}
                        <form
                            onSubmit={(e) => handleAddComment(e)}
                            className="flex  gap-5 content-between items-center"
                        >
                            <input
                                type="text"
                                name="content"
                                value={commentContent}
                                onChange={(e) =>
                                    setCommentContent(e.target.value)
                                }
                                placeholder="Write a comment..."
                                className="input input-bordered w-full"
                            />
                            <button className="px-3 py-2 bg-blue-400 cursor-pointer hover:bg-blue-600 transition-all text-white rounded-xl">
                                Add
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}
