export default defineEventHandler(async (event) => {
    const { name, category, subcategory, status, assignedTo, location, purchaseDate, value, serialNumber } = await readBody(event)

    const insertedLog = await useDrizzle().insert(tables.logs).values({
        name,
        category,
        subcategory,
        status,
        assignedTo,
        location,
        purchaseDate,
        value,
        serialNumber
    })

    return { id: insertedLog[0].insertId }
})