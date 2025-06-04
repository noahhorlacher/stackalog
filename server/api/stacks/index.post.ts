export default defineEventHandler(async (event) => {
    const { title, description } = await readBody(event)

    console.log('new stack', title, description)

    const insertedStack = await useDrizzle().insert(tables.stacks).values({
        title,
        description
    })

    return insertedStack[0]
})