export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const stack = await useDrizzle().select().from(tables.logs).where(eq(tables.logs.id, id))

    return stack[0] 
})