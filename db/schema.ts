import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const notes = sqliteTable("notes", {
  id: text("id").primaryKey(),
  title: text("title"),
  note_text: text("note_text"),
  note_audio: text("note_audio").notNull(),
  created_at: text("created_at").notNull(),
});

export type Note = typeof notes.$inferSelect;
export type NewNote = typeof notes.$inferInsert;
