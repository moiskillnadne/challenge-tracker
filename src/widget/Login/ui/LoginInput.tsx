import { HTMLInputTypeAttribute } from 'react'

type Props = {
  type: HTMLInputTypeAttribute
  name: string
  id: string
  placeholder: string
  autoComplete: string
  onChange: (value: string) => void
}

export const LoginInput = ({
  type,
  name,
  id,
  placeholder,
  autoComplete,
  onChange,
}: Props) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className="bg-transparent focus:outline-none duration-300 h-[40px] placeholder-black/50 border-b-1 border-violet hover:border-violet20 focus:border-violet50 w-[300px]"
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
