'use client'

interface InputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (type: string, value:string) => void;
  type?: "text" | "email" | "password" | "number";
}

export default function Input({name, placeholder, value, onChange, type = "text"}: InputProps) {
  return (
    <input 
        name={name}
        placeholder={placeholder} 
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className="border-2 rounded-md border-zinc-200 focus:border-lime-500 focus:outline-none px-3 py-2 w-full" 
    />
  );
}
