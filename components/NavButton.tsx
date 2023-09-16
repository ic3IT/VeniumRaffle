import React from 'react'

interface Props {
    title: string;
    isActive?: boolean;
    onClick?: () => void;
}

function NavButton({ title, isActive, onClick }: Props) {
  const baseClasses = "hover:bg-[#03] text-white py-2 px-4 rounded font-bold";
  const activeClasses = isActive ? "bg-blue-500" : "";  // Replace 'bg-blue-500' with your desired active style.

  return (
    <button 
        onClick={onClick}
        className={`${baseClasses} ${activeClasses}`}
    >
        {title}
    </button>
  );
}

export default NavButton;
