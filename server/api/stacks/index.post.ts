export default defineEventHandler(async (event) => {
    const { title, description } = await readBody(event)

    const insertedStack = await useDrizzle().insert(tables.stacks).values({
        title,
        description
    })

    return { id: insertedStack[0].insertId }
})