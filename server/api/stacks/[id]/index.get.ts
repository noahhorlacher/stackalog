export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const stack = await useDrizzle().select().from(tables.stacks).where(eq(tables.stacks.id, id))

    return stack[0] 
})