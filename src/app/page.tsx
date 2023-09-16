'use client'
import type { NextPage } from 'next';
import Head from "next/head";
import Header from "../../components/Header";
import { useContractRead, useContract,useContractWrite, useAddress, ThirdwebProvider, ChainId, } from "@thirdweb-dev/react";
import { ScrollSepoliaTestnet } from "@thirdweb-dev/chains";
import Login from "../../components/login";
import Loading from "../../components/Loading";
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import React from 'react';
import CountdownTimer from '../../components/CountdownTimer';
import toast, { Toaster } from 'react-hot-toast';
import { currency } from '../../constants';
import Marquee from 'react-fast-marquee';
import AdminControls from '../../components/AdminControls';

const Home: NextPage = () => {
  return (
    <ThirdwebProvider activeChain={ ScrollSepoliaTestnet } clientId='1e11f5ed7379e8b2e3305a4bf4ebe2db'> 
    <Toaster />
        <Head>
          <title>Scrollium Draw</title>
        </Head>

        <MainContent />
    </ThirdwebProvider>
  );
}

const MainContent: NextPage = () => {
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );
  const [userTickets, setUserTickets] = useState(0);
  const address = useAddress();
  const [quantity, setQuantity] = useState<number>(1);
  const { data: remainingTickets } = useContractRead(contract, "RemainingTickets")
  const {data: currentWinningReward } = useContractRead (contract, "CurrentWinningReward");
  const {data: ticketPrice } = useContractRead (contract, "ticketPrice");
  const {data: ticketCommision } = useContractRead (contract, "ticketCommission");
  const { mutateAsync: BuyTickets} = useContractWrite(contract, "BuyTickets") 
  const {data: expiration } = useContractRead (contract, "expiration");
  const {data: tickets } = useContractRead(contract, "getTickets")
  const {data: winnings} = useContractRead(contract, "getWinningsForAddress", [address])
  const [hasMinLoadTimePassed, setHasMinLoadTimePassed] = useState(false);
  const { mutateAsync: WithdrawWinnings } = useContractWrite(contract, "WithdrawWinnings");
  const {data: lastWinnerAmount } = useContractRead(contract, "lastWinnerAmount")
  const {data: lastWinner } = useContractRead(contract, "lastWinner")
  const {data: isLotteyOperator } = useContractRead(contract, 'lotteryOperator');
  
  const onWithdrawWinnings = async () => {
      const notification = toast.loading("Withdraw Winnings...")

      try {
        const data = await WithdrawWinnings({ args: [] });

        toast.success("Winnings withdraw succesfully!", {
          id: notification
        })
      } catch(err) {
        toast.error("Whoops something went wrong", {
          id: notification
        });

        console.error("contract call failure", err)
      }

  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasMinLoadTimePassed(true);
    }, 2000); // 2 seconds

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClick = async () => {
    if (!ticketPrice) return;

    const notification = toast.loading("Buying your tickets...");
    try {
      const data = await BuyTickets({
        overrides: {
            value: ethers.utils.parseEther(
                (Number(ethers.utils.formatEther(ticketPrice)) * quantity).toString()
            )
        }
      });

      toast.success("Tickets purchased successfully!", {
        id: notification
      });

      console.info("Contract call success,", data);
    
    } catch(err) {
      toast.error("Whoops something went wrong!", {
        id: notification
      });
      console.error("Error buying tickets:", err);
    }
  }

  useEffect(() => {
    if (!tickets) return;

    const noOfUserTickets = tickets.reduce((total: number, ticketAddress: string) => 
      (ticketAddress === address ? total + 1 : total), 
      0
    );

    setUserTickets(noOfUserTickets);

}, [tickets, address]);

  if (!hasMinLoadTimePassed) return <Loading />;
  if (isLoading) return <Loading />; 
  if (!address) return <Login />;


  return (
    <div className="video-background no-select">
    <video playsInline autoPlay muted loop>
      <source src="https://video.wixstatic.com/video/11062b_71b832b59b744d86bf0310d0fceb3055/480p/mp4/file.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div className="video-content">
      <Header />

    <Marquee className='bg-[#0A1F1C1 p-5 mb-5' gradient={false} speed={100}>
      <div className='flex space-x-2 mx-10'>
        <h4 className='text-white font-bold'>Last Winner {lastWinner?.toString()}</h4>
        <h4 className='text-white font-bold'>Previous Winnings {" "}{lastWinnerAmount && ethers.utils.formatEther(lastWinnerAmount?.toString())}
        {" "}{currency}</h4>
      </div>
    </Marquee>

    {isLotteyOperator === address && (
      <div className='flex justify-center'>
        <AdminControls />
        </div>
    )}


    {winnings > 0 && (
      <div className='max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-5'>
        <button onClick={onWithdrawWinnings} className='p-5 bg-gradient-to-b from-orange-500 to-emerald-600 animate-pulse
        text-center rounded-xl w-full '>
          <p className='font-bold'>Winner Winner Chicken Dinner!</p>
          <p>Total Winnings {ethers.utils.formatEther(winnings.toString())}{" "}
          {currency}</p>
          <br/>
          <p className='font semi-bold'>Click here to withdraw</p>
        </button>
      </div>
      
      )
    }


    {/* Next Draw Box */}  
      <div className='space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start
      justify-center md:space-x-5'>
        <div className='stats-container'>
            <h1 className='text-5xl text-white font-semibold text-center'>The Next Draw
            </h1>
          <div className='flex justify-between p-2 space-x-2'>
            <div className='stats'>
              <h2 className='text-sm'>Total Pool</h2>
            <p className='text-xl'>
              {currentWinningReward && ethers.utils.formatEther
              (currentWinningReward.toString())}{" "}
              ETH
            </p>
            </div>
            <div className='stats'>
              <h2 className='text-sm'>Tickets Remainig</h2>
              <p className='text-xl'>{remainingTickets?.toNumber()}</p>
            </div>
          </div>

          {/*Countdown Timer*/}
          <div className='mt-5 mb-3'>
            <CountdownTimer/>
          </div>
        </div>

        <div className='stats-container space-y-2'>
            <div className="stats-container">
              <div className='flex justify-between items-center text-white pb-2'>
                <h2>Price per Ticket</h2>
                <p>
                  {ticketPrice && ethers.utils.formatEther
              (ticketPrice.toString())}{" "}
              ETH</p>
            </div>
              <div className='flex text-white items-center space-x-2  border-[#004337] border p-4'>
              <p>TICKETS</p>
              <input 
  className='flex w-full bg-transparent text-right outline-none' 
  type='Number'
  min={1}
  max={10}
  value={quantity}
  onChange= {e => {
    const inputValue = Number(e.target.value);
    if (inputValue > 10) {
      setQuantity(10);  // If the value is greater than 10, set it to 10.
    } else {
      setQuantity(inputValue);
    }
  }}
/>
            </div>
            <div className='space-y-2 mt-5'>
              <div className='flex item-center justify-between text-emerald-300 text-xs italic font-extrabold'>
               <p>Total cost of tickets</p>
               <p>{ticketPrice && Number(ethers.utils.formatEther
              (ticketPrice.toString())) * quantity}{" "}</p>
              </div>
              <div className='flex item-center justify-between text-emerald-300 text-xs italic'>
                <p>Service Fees</p>
                <p>{ticketCommision && ethers.utils.formatEther
              (ticketCommision.toString())}{" "}
              ETH</p>
              </div>
              <div className='flex item-center justify-between text-emerald-300 text-xs italic'>
                <p>+ Network Fees</p>
                <p>TBC</p>
              </div>
            </div>
            <button 
            disabled={expiration?.toString() < Date.now().toString()
            || remainingTickets?.toNumber() === 0}
            onClick={handleClick}
            className='mt-5 w-full bg-gradient-to-br from-emerald-200 
            to-emerald-600 px-10 font-semibold py-5 rounded-md text-gray 
            shadow-xl disabled:from-gray-600 disabled:text-gray-100 disabled:to-gray-600 disabled:cursor-not-allowed'>
             
              Buy {quantity} Tickets for {ticketPrice && 
              Number(ethers.utils.formatEther(ticketPrice.toString()))
               * quantity}{" "}
               {currency}
              </button>
              <Toaster />  
          </div>
              
            {userTickets > 0 && (<div className='stats'>
              <p className='text-lg mb-2'>You have {userTickets} Tickets in this Draw</p>

              <div className='flex max-w-sm flex-wrap gap-x-2 gap-y-2'>{Array(userTickets).fill("").map((_, index) => (
                <p key={index} className='text-emerald-300 h-20 w-12 bg-emerald-500/20 
                rounded-lg flex flex-shrink-0 items-center justify-center text-xs italic'>
                  {index + 1}</p>
              ))} 
              </div>
              </div>
              )}
        </div>
      </div>
      <div></div>
    </div>
    </div>
  );
}


export default Home;
