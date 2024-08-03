const bookRepository = require("../repositories/bookRepository");

class BookService {
  async getAllBooks() {
    const books = await bookRepository.findAll();
    const availableBooks = [];

    for (const book of books) {
      const borrowedBooks = await book.getMembers();
      if (borrowedBooks.length === 0) {
        availableBooks.push(book);
      }
    }

    return availableBooks;
  }

  async getBookById(code) {
    const book = await bookRepository.findById(code);
    if (!book) {
      throw new Error("Book not found");
    }
    return book;
  }

  async createBook(bookData) {
    return await bookRepository.create(bookData);
  }

  async updateBook(id, bookData) {
    const book = await bookRepository.update(id, bookData);
    if (!book) {
      throw new Error("Book not found");
    }
    return book;
  }

  async deleteBook(code) {
    const book = await bookRepository.delete(code);
    if (!book) {
      throw new Error("Book not found");
    }
    return book;
  }
}

module.exports = new BookService();
