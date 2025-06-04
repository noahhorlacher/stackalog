// delete stack
export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    // Delete the stack
    await useDrizzle().delete(tables.stacks).where(eq(tables.stacks.id, id))

    // Return a success message
    return { message: 'Stack deleted successfully' }
})