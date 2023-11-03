import Link from 'next/link';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';

const Navbar = () => {
  const links = [
    { href: '/', label: 'Dashboard' },
    { href: '/issues', label: 'Issue' },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      {links.map((link) => {
        return (
          <Link
            href={link.href}
            key={link.href}
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
