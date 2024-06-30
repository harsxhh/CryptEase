import React from 'react';
import Dropdown from './Dropdown';

const Navbar = () => {
  const investItems = [
    { label: 'Invest Now', href: '/invest' },
    { label: 'Show My Investments', href: '/my-investments' },
  ];

  const nftItems = [
    { label: 'Explore NFTs', href: '/nfts' },
    { label: 'My NFTs', href: '/my-nfts' },
  ];

  return (
    <nav className="flex items-center p-4">
      <a className="m-2 text-gray-700 font-medium hover:text-blue-500" href="/portfolio">
        PORTFOLIO
      </a>
      <a className="m-2 text-gray-700 font-medium hover:text-blue-500" href="/deposit">
        DEPOSIT
      </a>
      <a className="m-2 text-gray-700 font-medium hover:text-blue-500" href="/loan">
        LOAN
      </a>
      <Dropdown title="INVEST" items={investItems} />
      <Dropdown title="NFT's" items={nftItems} />
    </nav>
  );
};

export default Navbar;
