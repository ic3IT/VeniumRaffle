import React, { useEffect, useState } from 'react';
import { useMetamask } from '@thirdweb-dev/react';
import MetaMaskOnboarding from '@metamask/onboarding';
import detectEthereumProvider from '@metamask/detect-provider';
import { Toaster, toast } from 'react-hot-toast';

const METAMASK_DEEPLINK = "https://metamask.app.link/dapp/scrollium.vercel.app/"; // Replace with your MetaMask deeplink

function Login() {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const connectWithMetamask = useMetamask();

  useEffect(() => {
		const videos = document.querySelectorAll('video');
		videos.forEach(video => {
			video.muted = true;
			video.play();
		});
	}, []);

  useEffect(() => {
    const checkInstallation = async () => {
      const provider = await detectEthereumProvider();
      setIsMetaMaskInstalled(!!provider);
    };

    if (window.ethereum) {
      handleEthereum();
    } else {
      window.addEventListener('ethereum#initialized', handleEthereum, { once: true });
      setTimeout(handleEthereum, 3000);
    }

    checkInstallation();
  }, []);

  function handleEthereum() {
    const { ethereum } = window;
    if (ethereum && ethereum.isMetaMask) {
      console.log('Ethereum successfully detected!');
    } else {
      console.log('Please install MetaMask!');
    }
  }

  const handleLoginClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isMetaMaskInstalled) {
      // Redirect user to MetaMask using deeplink or instruct them to install
      window.open(METAMASK_DEEPLINK, '_blank');
      console.log("MetaMask not installed. Showing toast...");
      toast.error('MetaMask is not installed!');
      return;
    }

    connectWithMetamask();
  };

  return (
    
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center">
      <video autoPlay loop muted playsInline className="absolute z-0 w-full h-full object-cover">
        <source src="https://video.wixstatic.com/video/11062b_71b832b59b744d86bf0310d0fceb3055/480p/mp4/file.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Toaster position="top-center" />
      <div className="z-10 relative flex flex-col items-center mb-10">
        <img className="rounded-full h-56 w-56 items-center -mb-10 justify-center" src="./logo.png" alt="" />
        <h1 className="special-section text-5xl text-white font-bold no-select mb-2 items-center justify-center">SCROLLIUM: RAFFLE</h1>
        <h2 className="text-white no-select items-center justify-center">Get started by logging in with your Metamask</h2>
        <button onClick={handleLoginClick} className="bg-white px-8 py-5 mt-5 rounded-lg shadow-lg font-bold mb-10">
          {isMetaMaskInstalled ? 'Login with Metamask' : 'Install Metamask'}
        </button>
      </div>
    </div>
  );
}

export default Login;
