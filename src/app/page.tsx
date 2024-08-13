"use client";

import { auth } from "@/firebaseConfig";
import { axiosInstance, fetchData } from "@/utils/axios.helper";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetchData('/api/articles').then((data) => {
      console.log(data);
    })
  });

  const handleLogout = () => {
    localStorage.removeItem('refreshToken');
    axiosInstance.defaults.headers.common['Authorization'] = '';
    auth.signOut().then(() => {
      console.log('logged out');
    }).catch((error) => {
      console.log('error logging out', error);
    });
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          Welcome <Link href="/Authentication" className="btn-success">Sign in</Link>
          <button className="btn-primary" onClick={handleLogout}>log out</button>
      </div>
    </main>
  );
}
