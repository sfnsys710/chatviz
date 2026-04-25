'use client'
import { useState } from 'react'
import Input from '../ui/input'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [submitEnabled, setSubmitEnabled] = useState(false)

    function onInputChange(name: string, value: string) {
        name === 'username' ? setUsername(value) : setPassword(value)
        if (username.length > 8 && password.length > 8) {
            setSubmitEnabled(true)
        } else {
            setSubmitEnabled(false)
        }
    }

    function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        console.log('login', username, password)
    }

    return (
        <form onSubmit={handleLogin} className='flex flex-col items-start gap-3 border-2 border-zinc-200 rounded-md p-6 w-2xl'>
            <h3>Login</h3>
            <Input name='username' placeholder='Username' value={username} onChange={onInputChange}/>
            <Input name='password' placeholder='Password' type='password' value={password} onChange={onInputChange} />
            <button
                type="submit"
                disabled={!submitEnabled}
                className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-500 disabled:bg-zinc-400 disabled:cursor-not-allowed"
            >
                Login
            </button>
        </form>
    )
}

// TODO: Replace submitEnabled state with a derived const. → fixes the stale-state bug and the never-disables bug.        
//   3. (optional) >= 8 instead of > 8, trim(), max-w-md instead of w-2xl. 
// Second bug: submitEnabled is one keystroke behind