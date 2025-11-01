import { type Note, type InsertNote, type Config, type InsertConfig } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // Notes
  getNote(id: string): Promise<Note | undefined>;
  getAllNotes(): Promise<Note[]>;
  createNote(note: InsertNote): Promise<Note>;
  updateNote(id: string, note: Partial<InsertNote>): Promise<Note | undefined>;
  deleteNote(id: string): Promise<boolean>;
  
  // Config
  getConfig(key: string): Promise<Config | undefined>;
  setConfig(config: InsertConfig): Promise<Config>;
}

export class MemStorage implements IStorage {
  private notes: Map<string, Note>;
  private configs: Map<string, Config>;

  constructor() {
    this.notes = new Map();
    this.configs = new Map();
  }

  // Notes methods
  async getNote(id: string): Promise<Note | undefined> {
    return this.notes.get(id);
  }

  async getAllNotes(): Promise<Note[]> {
    return Array.from(this.notes.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createNote(insertNote: InsertNote): Promise<Note> {
    const id = randomUUID();
    const now = new Date();
    const note: Note = { 
      id,
      title: insertNote.title,
      body: insertNote.body || "",
      isImportant: insertNote.isImportant || false,
      summaryTldr: insertNote.summaryTldr || null,
      transcriptText: insertNote.transcriptText || null,
      createdAt: now,
      updatedAt: now
    };
    this.notes.set(id, note);
    return note;
  }

  async updateNote(id: string, updates: Partial<InsertNote>): Promise<Note | undefined> {
    const note = this.notes.get(id);
    if (!note) return undefined;

    const updatedNote: Note = {
      ...note,
      ...updates,
      updatedAt: new Date(),
    };
    this.notes.set(id, updatedNote);
    return updatedNote;
  }

  async deleteNote(id: string): Promise<boolean> {
    return this.notes.delete(id);
  }

  // Config methods
  async getConfig(key: string): Promise<Config | undefined> {
    return this.configs.get(key);
  }

  async setConfig(config: InsertConfig): Promise<Config> {
    this.configs.set(config.key, config);
    return config;
  }
}

export const storage = new MemStorage();
