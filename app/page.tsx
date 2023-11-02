import prisma from "@/db";
import { revalidatePath } from "next/cache";

async function getData() {
  const data = await prisma.todo.findMany({
    select: {
      id: true,
      input: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return data
}


export default async function Home() {

  const data = await getData()

  async function create(formData: FormData) {
    "use server";

    const input = formData.get("input") as string

    await prisma.todo.create({
      data: {
        input: input
      }
    })

    revalidatePath("/")
  }

  async function edit(formData: FormData) {
    "use server"

    const input = formData.get("input") as string
    const inputId = formData.get("inputId") as string

    await prisma.todo.update({
      where: {
        id: inputId
      },
      data: input
    })

    revalidatePath("/")
  }

  async function deleteTodo(formData: FormData) {
    "use server";

    const inputId = formData.get("inputId") as string

    await prisma.todo.delete({
      where: {
        id: inputId
      }
    })

    revalidatePath("/")
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="border rounded-lg shadow-xl p-10 w-[30vw]">
        <form action={create} className="flex flex-col gap-2">
          <input
            type="text"
            name="input"
            placeholder="type here..."
            className="border-2 p-1 rounded-lg border-zinc-600"
          />
          <button
            className="rounded-lg bg-zinc-800 text-white font-semibold py-2 hover:bg-zinc-900"
            type="submit"
          >
            Submit
          </button>
        </form>


        <div className="mt-5 flex flex-col gap-y-2">
          {data?.map((todo) => (
            <form action={edit} key={todo.id} className="flex">
              <input type="hidden" name="inputId" value={todo.id} />
              <input
                type="text"
                name="updateInput"
                defaultValue={todo.input}
                className="border border-zinc-600 p-1 rounded-lg"
              />
              <button type="submit" className="rounded-lg bg-green-300/50 ml-2 px-1 hover:bg-green-400">save</button>
              <button formAction={deleteTodo} className="rounded-lg bg-red-400/50 ml-2 px-1 hover:bg-red-600">delete</button>
            </form>
          ))}
        </div>
      </div>
    </div>
  )
}
