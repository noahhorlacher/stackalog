export default defineEventHandler(async (event) => {
    const stacks = await useDrizzle().select().from(tables.logs)

    return stacks
})