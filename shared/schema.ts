import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const notes = pgTable("notes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  body: text("body").notNull().default(""),
  isImportant: boolean("is_important").notNull().default(false),
  summaryTldr: text("summary_tldr"),
  transcriptText: text("transcript_text"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const media = pgTable("media", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  noteId: varchar("note_id").notNull().references(() => notes.id, { onDelete: "cascade" }),
  type: varchar("type").notNull(),
  uri: text("uri").notNull(),
  durationMs: integer("duration_ms"),
});

export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  noteId: varchar("note_id").notNull().references(() => notes.id, { onDelete: "cascade" }),
  provider: varchar("provider").notNull(),
  providerEventId: text("provider_event_id").notNull(),
  title: text("title").notNull(),
  startsAt: timestamp("starts_at").notNull(),
  endsAt: timestamp("ends_at").notNull(),
});

export const config = pgTable("config", {
  key: varchar("key").primaryKey(),
  value: text("value").notNull(),
});

export const insertNoteSchema = createInsertSchema(notes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMediaSchema = createInsertSchema(media).omit({
  id: true,
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
});

export const insertConfigSchema = createInsertSchema(config);

export type InsertNote = z.infer<typeof insertNoteSchema>;
export type Note = typeof notes.$inferSelect;
export type InsertMedia = z.infer<typeof insertMediaSchema>;
export type Media = typeof media.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;
export type InsertConfig = z.infer<typeof insertConfigSchema>;
export type Config = typeof config.$inferSelect;

// AI Provider configuration schema
export const aiConfigSchema = z.object({
  transcriptionProvider: z.enum(["ollama", "huggingface"]),
  summarizationProvider: z.enum(["ollama", "huggingface"]),
  ollamaModel: z.string().optional(),
  huggingfaceToken: z.string().optional(),
  huggingfaceSTTModel: z.string().optional(),
  huggingfaceSummarizationModel: z.string().optional(),
});

export type AIConfig = z.infer<typeof aiConfigSchema>;
