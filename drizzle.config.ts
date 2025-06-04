import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    dialect: 'mysql',
    schema: './server/database/migrations/schema.ts',
    out: './server/database/migrations',
    dbCredentials: {
        url: process.env.DATABASE_URL || 'mysql://root:@localhost:3306/stackalog',
    },
})