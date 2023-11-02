import prisma from "@/db"
import { create, deleteTodo, edit } from "../action"
import SaveButton from "@/components/SaveButton"
import DeleteButton from "@/components/DeleteButton"
import FormElement from "@/components/Form"

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

export default async function BetterPage() {

  const data = await getData()

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="border rounded-lg shadow-xl p-10 w-[30vw]">
        <FormElement />

        <div className="mt-5 flex flex-col gap-y-2">
          {data?.map((todo) => (
            <div key={todo.id} className="w-full h-full flex items-center">
              <form action={edit} className="flex">
                <input type="hidden" name="inputId" value={todo.id} />
                <input
                  type="text"
                  name="updateInput"
                  defaultValue={todo.input}
                  className="border border-zinc-600 p-1 rounded-lg"
                />
                <SaveButton btnName="save" />
              </form>
              <form action={deleteTodo}>
                <input type="hidden" name="inputId" value={todo.id} />
                <DeleteButton btnName="delete" />
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
