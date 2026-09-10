import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const ideas = sqliteTable(
  'ideas',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    idea: text('idea').notNull(),
    status: text('status').notNull().default('new'),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  },
  (table) => [index('idx_ideas_created_at').on(table.createdAt)],
);

export type Idea = typeof ideas.$inferSelect;
