import React from 'react'
import NavButton from './NavButton';
import { Bars3BottomRightIcon } from '@heroicons/react/24/solid';
import { useAddress, useDisconnect } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';
import { disconnect } from 'process';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import Loading from './Loading';

function Header() {
    const address = useAddress()
    const [isLoading, setIsLoading] = useState(true);
    const disconnect = useDisconnect();
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // 3 seconds

        return () => {
            clearTimeout(timer);
        };
    }, []); // Empty dependency array to run this effect once on component mount

    const handleClick = async () => {
        try {
            await disconnect(); // Calling the function directly to disconnect.
            toast.success("Successfully disconnected!");
        } catch(err) {
            toast.error("Failed to disconnect!");
            console.error("Error disconnecting:", err);
        }
    }

    if (isLoading) {
        return <Loading />;
    }



    return (
        <header className="grid grid-cols-2 md:grid-cols-5 justify-between items-center p-5">
            <div className='flex items-center space-x-2'>
                <img 
                className="rounded-full h-10 w-10" 
                src="./logo.png" 
                alt="" />
            <div>
                <h1 className="text-lg text-white font-bold">Venium</h1>
                <p className="text-xs text-emerald-500 truncate">User: {address?.substring(0,5)}...{address?.substring(address.length, address.length -5)} </p>
            </div>
        </div>

        <div className='hidden md:flex md:col-span-3 items-center justify-center rounded-md'>
            <div className="p-4 space-x-2">
                <NavButton isActive title='Buy Tickets'/>
                <NavButton onClick={handleClick}title= 'Log out'/>
            </div>
        </div>

        <div className='flex flex-col ml-auto text-right'>
            <Bars3BottomRightIcon className="h-8 w-8 mx-auto text-white cursor-pointer" />
            <span className='md:hidden'>
                <NavButton onClick={handleClick} title= 'Logout'/>
            </span>
        </div>
    </header>
    );
}

export default Header;