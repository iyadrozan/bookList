import express from 'express';
import { Book } from '../models/bookModels.js';

const router = express.Router();

// Route for Save a new Book
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).json({ message: "All fields are required" });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };

        const book = await Book.create(newBook);

        return response.status(201).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).json({ message: error.message});
    }
});

// Route for get all Books from database
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            books: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).json({ message: error.message});
    }
});

// Route for get a Book by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);
        if (!book) {
            return response.status(404).json({ message: "Book not found" });
        }
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).json({ message: error.message});
    }
});

// Route for update a Book
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).json({
                message: "All fields are required"
            });
        }

        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).json({ message: "Book not found" });
        }
        return response.status(200).json({ message : "Book updated successfully"});

    } catch (error) {
        console.log(error.message);
        response.status(500).json({ message: error.message});
    }
});

// Route for Delete a book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: "Book not found" });
        }
        return response.status(200).json({ message : "Book deleted successfully"});

    } catch (error) {
        console.log(error.message);
        response.status(500).json({ message: error.message});
    }
});

export default router;