import React from "react";

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-base-100">
            <img
                src="/assets/loading.gif"
                alt="Loading..."
                className="w-24 h-24"
            />
        </div>
    );
};

export default Loading;
