import { relations } from "drizzle-orm/relations";
import { logs, logStack, stacks } from "./schema";

export const logStackRelations = relations(logStack, ({one}) => ({
	log: one(logs, {
		fields: [logStack.logId],
		references: [logs.id]
	}),
	stack: one(stacks, {
		fields: [logStack.stackId],
		references: [stacks.id]
	}),
}));

export const logsRelations = relations(logs, ({many}) => ({
	logStacks: many(logStack),
}));

export const stacksRelations = relations(stacks, ({many}) => ({
	logStacks: many(logStack),
}));