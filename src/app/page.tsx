
// import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  // const router = useRouter();

  return (
    <div className='text-center h-screen bg-gradient-to-tr from-white to-green-500'>
      <div className='text-2xl font-bold font-mono text-blue-800 pt-10'>
        <h1>Resume Builder</h1>
        <h1 className='text-black'><span className='text-blue-800' >Crafted By </span>Muhammad Sami Q-K</h1>
      </div>
      <div className="flex items-center justify-center mt-52">
      
      <Link href={'/create'}
      className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
      >Make your Resume</Link>
        
    </div>
    </div>
  );
}
