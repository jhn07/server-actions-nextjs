"use client";

import { useFormStatus } from "react-dom"



const DeleteButton = ({ btnName }: { btnName: string }) => {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="rounded-lg bg-red-400/50 ml-2 px-1 hover:bg-red-600">
      {pending ? "deted..." : btnName}
    </button>
  )
}

export default DeleteButton