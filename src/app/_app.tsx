import './raffle-globals.css';
import { ScrollSepoliaTestnet } from "@thirdweb-dev/chains";
import { ThirdwebProvider, useContract } from "@thirdweb-dev/react";
import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast"


function MyApp({ Component, pageProps}: AppProps) {
  return (
    <ThirdwebProvider 
      activeChain={ "mumbai" } 
      clientId="" // You can get a client id from dashboard settings
    >
      <Component {...pageProps}/>
    </ThirdwebProvider>
  );
}