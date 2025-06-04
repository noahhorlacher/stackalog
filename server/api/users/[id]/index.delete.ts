export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    await useDrizzle().delete(tables.users).where(eq(tables.users.id, id))

    return { message: 'User deleted successfully' }
})