import React from "react";
import { BeatLoader } from "react-spinners";
import loader from "../../assets/loader.gif";

export default function Loader() {
    return (
        <div className="flex justify-center items-center h-screen">
            <img src={loader} alt="Loading..." />
            {/* <BeatLoader size={25} /> */}
        </div>
    );
}
