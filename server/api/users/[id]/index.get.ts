export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const user = await useDrizzle().select({
        id: tables.users.id,
        firstName: tables.users.firstName,
        lastName: tables.users.lastName,
        email: tables.users.email,
        isAdmin: tables.users.isAdmin
    }).from(tables.users).where(eq(tables.users.id, id))

    return user[0] 
})