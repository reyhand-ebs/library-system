const bookRepository = require("../app/repositories/bookRepository");
const BookService = require("../app/services/bookService");

jest.mock("../app/repositories/bookRepository");

describe("BookService", () => {
  let bookService;

  beforeEach(() => {
    bookService = new BookService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllBooks", () => {
    test("should get all available books", async () => {
      const books = [
        { code: "JK-45", getMembers: jest.fn().mockResolvedValue([]) },
        { code: "SHR-1", getMembers: jest.fn().mockResolvedValue([{}]) },
      ];
      bookRepository.findAll.mockResolvedValue(books);

      const result = await bookService.getAllBooks();

      expect(result).toEqual([books[0]]);
      expect(books[0].getMembers).toHaveBeenCalled();
      expect(books[1].getMembers).toHaveBeenCalled();
    });
  });

  describe("getBookById", () => {
    test("should get book by ID", async () => {
      const book = {
        code: "JK-45",
        title: "Harry Potter",
        author: "J.K Rowling",
        stock: 1,
      };
      bookRepository.findById.mockResolvedValue(book);

      const result = await bookService.getBookById("JK-45");

      expect(result).toEqual(book);
    });

    test("should throw error if book not found by ID", async () => {
      bookRepository.findById.mockResolvedValue(null);

      await expect(bookService.getBookById("JK-45")).rejects.toThrow(
        "Book not found"
      );
    });
  });

  describe("createBook", () => {
    test("should create a new book", async () => {
      const bookData = {
        code: "NEW-1",
        title: "New Book",
        author: "New Author",
        stock: 1,
      };
      const createdBook = { ...bookData };
      bookRepository.create.mockResolvedValue(createdBook);

      const result = await bookService.createBook(bookData);

      expect(result).toEqual(createdBook);
    });
  });

  describe("updateBook", () => {
    test("should update a book", async () => {
      const bookData = {
        title: "Updated Book",
        author: "Updated Author",
        stock: 1,
      };
      const updatedBook = { code: "JK-45", ...bookData };
      bookRepository.update.mockResolvedValue(updatedBook);

      const result = await bookService.updateBook("JK-45", bookData);

      expect(result).toEqual(updatedBook);
    });

    test("should throw error if book not found for update", async () => {
      bookRepository.update.mockResolvedValue(null);

      await expect(bookService.updateBook("JK-45", {})).rejects.toThrow(
        "Book not found"
      );
    });
  });

  describe("deleteBook", () => {
    test("should delete a book", async () => {
      const book = { code: "JK-45" };
      bookRepository.delete.mockResolvedValue(book);

      const result = await bookService.deleteBook("JK-45");

      expect(result).toEqual(book);
    });

    test("should throw error if book not found for deletion", async () => {
      bookRepository.delete.mockResolvedValue(null);

      await expect(bookService.deleteBook("JK-45")).rejects.toThrow(
        "Book not found"
      );
    });
  });
});
