import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import VideosList from "../Components/VideosList";

const Processed = () => {
    return (
        <div className="flex flex-col h-screen">
            <Navbar/>
            <VideosList/>
        </div>
    )
};

export default Processed;
