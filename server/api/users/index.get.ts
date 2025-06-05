export default defineEventHandler(async (event) => {
    const stacks = await useDrizzle().select({
        id: tables.users.id,
        firstName: tables.users.firstName,
        lastName: tables.users.lastName,
        email: tables.users.email,
        isAdmin: tables.users.isAdmin
    }).from(tables.users)

    return stacks
})