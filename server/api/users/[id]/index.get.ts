export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const user = await useDrizzle().select().from(tables.users).where(eq(tables.users.id, id))

    return user[0] 
})