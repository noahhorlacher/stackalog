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

    const result = await useDrizzle().update(tables.logs)
        .set(body)
        .where(eq(tables.logs.id, id))

    return result[0]
})