import { Repository } from "typeorm";
import { Note } from "../entities";
import { CreateNoteRequest, UpdateNoteRequest } from "../models";
import { AppDataSource } from "../database/DataSource";

// Service class for notes
export class NotesService {
    // private repository
    private notesRepository: Repository<Note>;

    // constructor: initialize the repository
    constructor() {
        this.notesRepository = AppDataSource.getRepository(Note);
    }

    // Methods of the service
    /**
     * Get all notes
     * @returns {Promise<Note[]>}
     */
    async getAllNotes(): Promise<Note[]> {
        try {
            // Get all notes ordered by createdAt in descending order
            const notes = await this.notesRepository.find({
                order: {
                    createdAt: 'DESC'
                }
            });

            console.log(`Retrieved ${notes.length} notes from database`);
            return notes;
        } catch (error) {
            // Log error
            console.error('Error getting all notes:', error);
            throw new Error('Failed to get all notes');
        }
    }

    /**
     * Get a note by id
     * @param {number} id
     * @returns {Promise<Note | null>}
     */
    async getNoteById(id: number): Promise<Note | null> {
        try {
            // Get a note by id
            const note = await this.notesRepository.findOne({ where: { id } });

            if (!note) {
                console.log(`No note found with id ${id}`);
                return null;
            }

            console.log(`Retrieved note with id ${id} from database`);
            return note;
        } catch (error) {
            // Log error
            console.error(`Error getting note with id ${id}:`, error);
            throw new Error(`Failed to get note with id ${id}`);
        }
    }

    /**
     * Create a new note
     * @param {CreateNoteRequest} request
     * @returns {Promise<Note>}
     */
    async createNote(request: CreateNoteRequest): Promise<Note> {
        try {
            // Create object from request
        const note = this.notesRepository.create({
            title: request.title,
            markdownContent: request.markdownContent,
        });

            // Save the note
            const savedNote = await this.notesRepository.save(note);
            console.log(`Created note with id ${savedNote.id} in database`);
            return savedNote;
        } catch (error) {
            // Log error
            console.error('Error creating note:', error);
            throw new Error('Failed to create note');
        }
    }

    /**
     * Update a note
     * @param {number} id
     * @param {UpdateNoteRequest} request
     * @returns {Promise<Note>}
     */
    async updateNote(id: number, request: UpdateNoteRequest): Promise<Note> {
        try {
            // Get the note to update
            const existingNote = await this.getNoteById(id);

            if (!existingNote) {
                console.log(`No note found with id ${id}`);
                throw new Error(`Note with id ${id} not found`);
            }

            // Update the note
            if (request.title !== undefined) {
                existingNote.title = request.title;
            }

            if (request.markdownContent !== undefined) {
                existingNote.markdownContent = request.markdownContent;
            }

            // Save the note
            const updatedNote = await this.notesRepository.save(existingNote);
            console.log(`Updated note with id ${updatedNote.id} in database`);
            return updatedNote;
        } catch (error) {
            // Log error
            console.error(`Error updating note with id ${id}:`, error);
            throw new Error(`Failed to update note with id ${id}`);
        }
    }

    /**
     * Delete a note
     * @param {number} id
     * @returns {Promise<void>}
     */
    async deleteNote(id: number): Promise<void> {
        try {
            // Get the note to delete
            const existingNote = await this.getNoteById(id);

            if (!existingNote) {
                console.log(`No note found with id ${id}`);
                throw new Error(`Note with id ${id} not found`);
            }

            // Delete the note
            await this.notesRepository.delete(id);
            console.log(`Deleted note with id ${id} from database`);
        } catch (error) {
            // Log error
            console.error(`Error deleting note with id ${id}:`, error);
            throw new Error(`Failed to delete note with id ${id}`);
        }
    }
}