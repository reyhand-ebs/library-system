const { Book } = require('../models');

class BookRepository {
  async findAll() {
    return await Book.findAll();
  }

  async findById(code) {
    return await Book.findByPk(code);
  }

  async create(bookData) {
    return await Book.create(bookData);
  }

  async update(code, bookData) {
    const book = await Book.findByPk(code);
    if (book) {
      return await book.update(bookData);
    }
    return null;
  }

  async delete(code) {
    const book = await Book.findByPk(code);
    if (book) {
      return await book.destroy();
    }
    return null;
  }
}

module.exports = new BookRepository();
