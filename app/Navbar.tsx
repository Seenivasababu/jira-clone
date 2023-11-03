'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import classnames from 'classnames'
import { AiFillBug } from 'react-icons/ai';

const Navbar = () => {
   const currentPath = usePathname()
   
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
            className={classnames({
               'text-zinc-900': link.href === currentPath,
               'text-zinc-500': link.href !== currentPath,
               'hover:text-zinc-800 transition-colors': true,
             })}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
