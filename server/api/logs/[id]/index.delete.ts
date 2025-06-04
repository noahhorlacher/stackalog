export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    await useDrizzle().delete(tables.logs).where(eq(tables.logs.id, id))

    return { message: 'Log deleted successfully' }
})