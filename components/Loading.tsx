import React from 'react';
import { PropagateLoader } from 'react-spinners';

function Loading() {
  return (
    <div className="relative h-screen flex flex-col items-center justify-center text-center">
      
      {/* Video Background */}
      <video autoPlay loop muted className="absolute z-0 w-full h-full object-cover">
        <source src="https://video.wixstatic.com/video/11062b_71b832b59b744d86bf0310d0fceb3055/480p/mp4/file.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Loading Content */}
      <div className="z-10 relative flex flex-col items-center mb-10">
        <img
          className="rounded-full h-20 w-20 pl-3 justify-center items-center"
          src="./logo.png"
          alt=""
        />
        <h1 className="text-lg text-white font-bold">Loading Scrollium: Raffle</h1>
        <div style={{ marginTop: '20px', marginLeft: '-20px' }}>
    <PropagateLoader color="white" size={30} />
</div>

      </div>

    </div>
  );
}

export default Loading;
