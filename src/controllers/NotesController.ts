import { Request, Response } from 'express';
import { Note, CreateNoteRequest, UpdateNoteRequest } from '../models';
import { Body, Controller, Delete, Get, Path, Post, Put, Route, Tags } from 'tsoa';
import { NotesService } from '../services/NotesService';

/**
 * Controller for managing markdown notes
 * @example
 * This controller provides endpoints for CRUD operations on notes
 */
@Route("api/notes")
@Tags("Notes")
export class NotesController extends Controller {
    // private service
    private notesService: NotesService;

    // constructor: initialize the service
    constructor() {
        super();
        this.notesService = new NotesService();
    }

    // Methods of the controller

    /**
     * Get all notes
     * @summary Retrieve all notes
     * @returns An array of notes
     */
    @Get("/")
    public async getAllNotes(): Promise<Note[]> {
        return await this.notesService.getAllNotes();
    }

    /**
     * Get a single note
     * @summary Retrieve a note by ID
     * @param id The ID of the note to get
     * @returns The note
     */
    @Get("/{id}")
    public async getNoteById(@Path() id: number): Promise<Note | null> {
        return await this.notesService.getNoteById(id);
    }

    /**
     * Create a new note
     * @summary Create a new note
     * @param request The request body
     * @returns The created note
     */
    @Post("/")
    public async createNote(@Body() request: CreateNoteRequest): Promise<Note> {
        return await this.notesService.createNote(request);
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
    @Put("/{id}")
    public async updateNote(@Path() id: number, @Body() request: UpdateNoteRequest): Promise<Note> {
        return await this.notesService.updateNote(id, request);
    }

    /**
     * Delete a note
     * @param id The ID of the note to delete
     * @returns The deleted note
     */
    @Delete("/{id}")
    public async deleteNote(@Path() id: number): Promise<void> {
        return await this.notesService.deleteNote(id);
    }

}