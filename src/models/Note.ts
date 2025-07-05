/**
 * Represents a note in the database.
 */
interface Note {
    id: number;
    title: string;
    markdownContent: string;
    htmlRendered?: string;
    fileUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Represents a request to create a new note.
 */
interface CreateNoteRequest {
    title: string;
    markdownContent: string;
}

/**
 * Represents a request to update an existing note.
 */
interface UpdateNoteRequest {
    title?: string;
    markdownContent?: string;
}

export { Note, CreateNoteRequest, UpdateNoteRequest };

