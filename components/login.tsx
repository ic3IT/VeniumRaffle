import React from 'react';
import { useMetamask } from '@thirdweb-dev/react';

function Login() {
  const connectWithMetamask = useMetamask();

  const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    connectWithMetamask();
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center no-select">
      
      <video autoPlay loop muted className="absolute z-0 w-full h-full object-cover">
        <source src="./scrolliumbg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="z-10 relative flex flex-col items-center mb-10">
        <img
          className="rounded-full h-56 w-56 items-center -mb-10 justify-center"
          src="./logo.png"
          alt=""
        />
        <h1 className="special-section text-3xl text-white font-bold no-select mt-3 mb-2 items-center justify-center">SCROLLIUM: RAFFLE</h1>
        <h2 className="text-white no-select items-center justify-center">Get started by logging in with your Metamask</h2>
        <button
          onClick={handleLoginClick}
          className="bg-white px-8 py-5 mt-5 rounded-lg shadow-lg font-bold mb-10"
        >
          Login with Metamask
        </button>
      </div>
    </div>
  );
}

export default Login;
