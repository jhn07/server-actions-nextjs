"use server";

import prisma from "@/db";
import { revalidatePath } from "next/cache";

export const create = async (prevState: any, formData: FormData): Promise<string | undefined> => {

  try {
    const input = formData.get("input") as string

    await prisma.todo.create({
      data: {
        input: input
      }
    })

    revalidatePath("/better")

  } catch (error) {
    return "Failed to create! Please try again..."
  }
}

export const edit = async (formData: FormData): Promise<void> => {
  const updateInput = formData.get("updateInput") as string
  const inputId = formData.get("inputId") as string

  await prisma.todo.update({
    where: {
      id: inputId
    },
    data: {
      input: updateInput
    }
  })

  revalidatePath("/better")
}

export const deleteTodo = async (formData: FormData): Promise<void> => {
  const inputId = formData.get("inputId") as string

  await prisma.todo.delete({
    where: {
      id: inputId
    }
  })

  revalidatePath("/better")
}