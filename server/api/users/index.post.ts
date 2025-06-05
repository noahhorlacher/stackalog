export default defineEventHandler(async (event) => {
    const { firstName, lastName, email, password, isAdmin } = await readBody(event)

    const insertedUser = await useDrizzle().insert(tables.users).values({
        firstName,
        lastName,
        email,
        password,
        isAdmin: isAdmin || false
    })

    return { id: insertedUser[0].insertId }
})