export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    if (!body) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Bad Request',
            message: 'Request body is required'
        })
    }

    console.log('body', body)

    const result = await useDrizzle().update(tables.stacks)
        .set(body)
        .where(eq(tables.stacks.id, id))

    return result[0]
})