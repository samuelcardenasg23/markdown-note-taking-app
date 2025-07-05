import { Request, Response } from 'express';
import { Note, CreateNoteRequest, UpdateNoteRequest } from '../models';
import { Body, Controller, Delete, Get, Path, Post, Put, Route, Tags } from 'tsoa';

/**
 * Controller for managing markdown notes
 * @example
 * This controller provides endpoints for CRUD operations on notes
 */
@Route("api/notes")
@Tags("Notes")
export class NotesController extends Controller {
    /**
     * Get all notes
     * @summary Retrieve all notes
     * @returns An array of notes
     */
    @Get("/")
    public async getAllNotes(): Promise<Note[]> {
        // hardcoded response
        return [
            {
                id: 1,
                title: 'Note 1',
                markdownContent: 'This is the content of note 1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                title: 'Note 2',
                markdownContent: 'This is the content of note 2',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ];
    }

    /**
     * Get a single note
     * @summary Retrieve a note by ID
     * @param id The ID of the note to get
     * @returns The note
     */
    @Get("/{id}")
    public async getNoteById(@Path() id: number): Promise<Note> {
        // hardcoded response
        return {
            id: 1,
            title: 'Note 1',
            markdownContent: 'This is the content of note 1',
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    }

    /**
     * Create a new note
     * @summary Create a new note
     * @param request The request body
     * @returns The created note
     */
    @Post("/")
    public async createNote(@Body() request: CreateNoteRequest): Promise<Note> {
        // hardcoded response
        return {
            id: 1,
            title: request.title,
            markdownContent: request.markdownContent,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    }

    /**
     * Render markdown to HTML
     * @param id The ID of the note to render
     * @returns The rendered HTML
     */
    // @Get("/{id}/html")

    /**
     * Grammar check
     */
    // @Post("/{id}/grammar")

    /**
     * Update a note
     * @param id The ID of the note to update
     * @param request The request body
     * @returns The updated note
     */
    // @Put("/{id}")

    /**
     * Delete a note
     * @param id The ID of the note to delete
     * @returns The deleted note
     */
    // @Delete("/{id}")

}