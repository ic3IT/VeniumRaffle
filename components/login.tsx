import React, { useEffect, useState } from 'react';
import { useMetamask } from '@thirdweb-dev/react';
import MetaMaskOnboarding from '@metamask/onboarding';
import detectEthereumProvider from '@metamask/detect-provider';
import { Toaster, toast } from 'react-hot-toast';
import {
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  trustWallet,
  zerionWallet,
  rainbowWallet,
  phantomWallet,
} from "@thirdweb-dev/react";

const METAMASK_DEEPLINK = "https://metamask.app.link/dapp/scrollium.vercel.app/"; // Replace with your MetaMask deeplink

function Login() {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const connectWithMetamask = useMetamask();
  const desiredNetwork = {
    chainId: '0x8274f',
    chainName: 'Scroll',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://rpc.ankr.com/scroll_sepolia_testnet'],
    blockExplorerUrls: ['https://scrollscan.com']
  };

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

    checkInstallation();
  }, []);

  interface EthereumProvider {
    request: (args: any) => Promise<any>;
  }

  async function requestNetworkSwitch(provider: EthereumProvider) {
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [desiredNetwork],
      });
    } catch (switchError) {
      console.error(switchError);
      // Handle the error, maybe alert the user they need to switch manually or the network details are wrong
    }
  }

  const handleLoginClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isMetaMaskInstalled) {
      window.open(METAMASK_DEEPLINK, '_blank');
      toast.error('MetaMask is not installed!');
      return;
    }

    const { ethereum } = window;
    if (ethereum && ethereum.isMetaMask) {
      if (ethereum.chainId !== desiredNetwork.chainId) {
        await requestNetworkSwitch(ethereum);
      }
      // After ensuring the correct network or prompting to switch, proceed to connect with MetaMask
    } else {
      console.log('Please install MetaMask!');
    }
  };
  
  

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center">
      <a href="https://scrollium.io" target="_blank" rel="noopener noreferrer">
    <img src="./sc.gif" alt="Logo" className="absolute top-4 z-20 w-24 h-24" style={{ left: '250px', top: '60px' }} />
</a>

  
      <video autoPlay loop muted playsInline className="absolute z-0 w-full h-full object-cover">
        <source src="https://video.wixstatic.com/video/11062b_71b832b59b744d86bf0310d0fceb3055/480p/mp4/file.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <Toaster position="top-center" />
  
      <div className="z-10 relative flex flex-col items-center mb-10">
        <img className="rounded-full h-56 w-56 items-center -mb-10 justify-center" src="./logo.png" alt="" />
        <h1 className="special-section text-6xl text-white font-bold no-select mb-2 items-center justify-center">VENIUM: RAFFLE</h1>
        <h2 className="text-white no-select items-center justify-center">Get started by logging in with your Wallet</h2>
        <div><br></br></div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <ConnectWallet  
            auth={{
              loginOptional: false,
            }}
            switchToActiveChain={true} 
            style={{ display: 'flex', gap: '3px', backgroundColor: 'white', padding: '15px 40px',
            background: '#004600',
            color: 'white',
            marginTop: '3px',
            borderRadius: '20px',
            boxShadow: '30 4px 6px rgba(0, 0, 0, 0.1)',
            fontWeight: 'bold' }}
        />
        </div>
      </div>
    </div>
  );
  
}

export default Login;
