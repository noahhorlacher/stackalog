export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    await useDrizzle().delete(tables.stacks).where(eq(tables.stacks.id, id))

    return { message: 'Stack deleted successfully' }
})