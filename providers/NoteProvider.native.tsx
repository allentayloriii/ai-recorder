import { notes as NotesTable, type NewNote, type Note } from "@/db/schema";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface NoteContextType {
  notes: Note[];
  saveNote: (note: NewNote) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  updateNote: (id: string, newNote: NewNote) => Promise<void>;
}

const NoteContext = createContext<NoteContextType | null>(null);

export function NoteProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const sqlite = useSQLiteContext();
  const db = drizzle(sqlite);

  useEffect(() => {
    if (!db) return;
    const initStorage = async () => {
      try {
        const result = await db.select().from(NotesTable).all();
        setNotes(result);
      } catch (err) {
        console.error(err);
      }
    };

    initStorage();
  }, [db]);

  const saveNote = async (newNote: NewNote) => {
    try {
      await db.insert(NotesTable).values(newNote);
      const result = await db.select().from(NotesTable).all();
      setNotes(result);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const updateNote = async (id: string, newNote: NewNote) => {
    try {
      await db
        .update(NotesTable)
        .set(newNote)
        .where(sql`id = ${id}`);
      const result = await db.select().from(NotesTable).all();
      setNotes(result);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await db.delete(NotesTable).where(sql`id = ${id}`);
      const result = await db.select().from(NotesTable).all();
      setNotes(result);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const value = {
    notes,
    saveNote,
    deleteNote,
    updateNote,
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
}

export function useNotes() {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNotes must be used within a NoteProvider");
  }
  return context;
}
