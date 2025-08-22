import { useContext, useEffect, useState } from "react";
import commentImg from "../../assets/testimonial-2.jpg";
import postImg from "../../assets/post-1.jpg";
import { Link } from "react-router-dom";
import { postContext } from "./../../Context/PostContext";

export default function PostCard({ post, deletePost }) {
    const [showComments, setShowComments] = useState(false);
    const [moreComments, setMoreComments] = useState(3);
    const [commentContent, setCommentContent] = useState("");
    const [comments, setComments] = useState([]);
    let { addComment, deleteSinglePost } = useContext(postContext);

    useEffect(() => {
        setComments(post.comments);
    }, []);

    async function handleAddComment(e) {
        e.preventDefault();
        let response = await addComment({
            content: commentContent,
            post: post._id,
        });
        console.log(response, "add comment response");
        setComments(response);
    }

    async function DeletePost(postId) {
        let response = await deleteSinglePost(postId);
        console.log(response, "delete post response");
        deletePost();
    }

    return (
        <>
            <div className="card bg-blue-950 shadow-md p-4 max-w-xl mx-auto my-6 relative">
                <button
                    onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                    }
                    className="text-3xl text-white ms-auto px-4 py-3 cursor-pointer absolute top-0 right-2 hover:text-blue-400 transition-all"
                >
                    x
                </button>

                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Delete Post</h3>
                        <p className="py-4">
                            Are you sure you want to delete this post?
                        </p>
                        <div className="modal-action">
                            <form method="dialog"
                            className="flex w-full justify-between"
                            >
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn bg-green-800 hover:bg-green-400 ">Close</button>
                                <button className="btn bg-red-800 hover:bg-red-400 " onClick={() => DeletePost(post._id)}>Delete</button>
                            </form>
                        </div>
                    </div>
                </dialog>

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
