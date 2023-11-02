"use client";

import { create } from "@/app/action";
import { useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      className="rounded-lg bg-zinc-800 text-white font-semibold py-2 hover:bg-zinc-900"
      type="submit"
    >
      {pending ? "Saving..." : "Submit"}
    </button>
  )
}

const FormElement = () => {

  const formRef = useRef<HTMLFormElement>(null)

  const [state, formAction] = useFormState(create, null)

  return (
    <form ref={formRef} action={async (formData: FormData) => {
      formAction(formData)
      formRef.current?.reset()
    }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        name="input"
        placeholder="type here..."
        className="border-2 p-1 rounded-lg border-zinc-600"
      />
      <SubmitButton />

      <p className="text-red-600 text-center">{state as string}</p>
    </form>
  )
}

export default FormElement