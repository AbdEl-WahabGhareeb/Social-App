import React, { useContext } from "react";
import { postContext } from "../../Context/PostContext";

export default function AddPost({ callback }) {
    let { addSinglePost } = useContext(postContext);

    async function handleAddPost(e) {
        e.preventDefault();

        let formData = new FormData();
        let body = e.target.body.value;
        let image = e.target.image.files[0];
        formData.append("body", body); 
        formData.append("image", image);
        let response = await addSinglePost(formData);
        console.log(response, "response");
        callback();
    }
    return (
        <>
            <div className="flex flex-col gap-5 justify-center items-center contaianer mx-auto">
                <form
                    onSubmit={(e) => handleAddPost(e)}
                    className="flex flex-col w-full md:w-1/2 px-12 md:px-20  gap-5 justify-center items-center"
                >
                    <input
                        type="text"
                        name="body"
                        placeholder="Write a post..."
                        className="input input-bordered w-full"
                    />
                    <input
                        type="file"
                        name="image"
                        placeholder="Choose an image..."
                        className="input input-bordered w-full"
                    />
                    <button
                        type="submit"
                        className="px-3 w-1/2 py-2 bg-blue-400 cursor-pointer hover:bg-blue-600 transition-all text-white rounded-xl"
                    >
                        Add Post
                    </button>
                </form>
            </div>
        </>
    );
}
