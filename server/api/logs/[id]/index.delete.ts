// delete stack
export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    // Delete the stack
    await useDrizzle().delete(tables.logs).where(eq(tables.logs.id, id))

    // Return a success message
    return { message: 'Log deleted successfully' }
})