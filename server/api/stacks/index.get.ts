export default defineEventHandler(async (event) => {
    const stacks = await useDrizzle().select().from(tables.stacks)

    return stacks
})