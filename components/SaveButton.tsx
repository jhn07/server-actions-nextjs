"use client";

import { useFormStatus } from "react-dom"


const SaveButton = ({ btnName }: { btnName: string }) => {

  const { pending } = useFormStatus()

  return (
    <button type="submit" className="rounded-lg bg-green-300/50 ml-2 px-1 hover:bg-green-400">
      {pending ? "Savaing..." : btnName}
    </button>

  )
}

export default SaveButton