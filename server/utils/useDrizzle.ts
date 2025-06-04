import { db } from './db'
export { sql, eq, and, or } from 'drizzle-orm'
import * as schema from '../database/migrations/schema'
export const tables = schema

export default function useDrizzle() {
    return db
}

export type Stack = typeof schema.stacks.$inferSelect