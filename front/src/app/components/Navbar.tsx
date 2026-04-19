'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()

  function logout() {
    localStorage.removeItem('token')
    router.push('/login')
  }

  return (
    <nav className="bg-black text-white px-6 py-3 flex gap-6 items-center">
      <Link href="/query" className="hover:text-gray-300">Query</Link>
      <Link href="/stream" className="hover:text-gray-300">Stream</Link>
      <button onClick={logout} className="ml-auto text-sm text-gray-400 hover:text-white">
        Logout
      </button>
    </nav>
  )
}
