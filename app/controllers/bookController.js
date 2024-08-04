const BookService = require("../services/bookService");
const bookService = new BookService();

class BookController {
  // Retrieve all books
  async getAllBooks(req, res) {
    try {
      const books = await bookService.getAllBooks();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Retrieve a book by ID
  async getBookById(req, res) {
    const { code } = req.params;
    try {
      const book = await bookService.getBookById(code);
      res.json(book);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Create a new book
  async createBook(req, res) {
    const bookData = req.body;
    try {
      const book = await bookService.createBook(bookData);
      res.status(201).json(book);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update an existing book
  async updateBook(req, res) {
    const { code } = req.params;
    const bookData = req.body;
    try {
      const book = await bookService.updateBook(id, bookData);
      res.json(book);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Delete a book by ID
  async deleteBook(req, res) {
    const { code } = req.params;
    try {
      const book = await bookService.deleteBook(code);
      res.json({ message: "Book deleted successfully" });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new BookController();
