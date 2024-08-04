const memberRepository = require("../app/repositories/memberRepository");
const bookRepository = require("../app/repositories/bookRepository");
const { MemberBook, Penalty } = require("../app/models");
const MemberService = require("../app/services/memberService");

jest.mock("../app/repositories/memberRepository");
jest.mock("../app/repositories/bookRepository");
jest.mock("../app/models");

describe("MemberService", () => {
  let memberService;

  beforeEach(() => {
    memberService = new MemberService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Borrow and Return Books", () => {
    test("should borrow a book", async () => {
      const member = { id: "M001", getBooks: jest.fn().mockResolvedValue([]) };
      const book = { id: "SHR-1", stock: 1, save: jest.fn() };
      memberRepository.findById.mockResolvedValue(member);
      bookRepository.findById.mockResolvedValue(book);
      member.addBook = jest.fn();

      const result = await memberService.borrowBook("M001", "SHR-1");

      expect(result).toBe("Book borrowed successfully");
      expect(member.addBook).toHaveBeenCalledWith(book);
      expect(book.stock).toBe(0);
      expect(book.save).toHaveBeenCalled();
    });

    test("should return a book", async () => {
      const member = {
        id: "M001",
        getBooks: jest.fn().mockResolvedValue([{ id: "SHR-1" }]),
        removeBook: jest.fn(),
      };
      const book = { id: "SHR-1", stock: 0, save: jest.fn() };
      const memberBook = {
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      };
      memberRepository.findById.mockResolvedValue(member);
      bookRepository.findById.mockResolvedValue(book);
      MemberBook.findOne.mockResolvedValue(memberBook);

      const result = await memberService.returnBook("M001", "SHR-1");

      expect(result).toBe("Book returned successfully");
      expect(member.removeBook).toHaveBeenCalledWith(book);
      expect(book.stock).toBe(1);
      expect(book.save).toHaveBeenCalled();
    });

    test("should not allow member to borrow more than 2 books", async () => {
      const member = {
        id: "M001",
        getBooks: jest
          .fn()
          .mockResolvedValue([{ id: "JK-45" }, { id: "SHR-1" }]),
      };
      const book = { id: "B003", stock: 1, save: jest.fn() };
      memberRepository.findById.mockResolvedValue(member);
      bookRepository.findById.mockResolvedValue(book);

      await expect(memberService.borrowBook("M001", "TW-11")).rejects.toThrow(
        "Member cannot borrow more than 2 books"
      );

      expect(member.getBooks).toHaveBeenCalled();
      expect(bookRepository.findById).toHaveBeenCalledWith("TW-11");
      expect(memberRepository.findById).toHaveBeenCalledWith("M001");
    });
  });

  describe("Handle Penalties", () => {
    test("should handle late return with penalty", async () => {
      const member = {
        id: "M001",
        getBooks: jest.fn().mockResolvedValue([{ id: "NRN-7" }]),
        removeBook: jest.fn(),
      };
      const book = { id: "NRN-7", stock: 0, save: jest.fn() };
      const memberBook = {
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      };
      memberRepository.findById.mockResolvedValue(member);
      bookRepository.findById.mockResolvedValue(book);

      MemberBook.findOne.mockResolvedValue(memberBook);
      Penalty.create.mockResolvedValue({});

      const result = await memberService.returnBook("M001", "NRN-7");

      expect(result).toBe("Book returned successfully");
      expect(member.removeBook).toHaveBeenCalledWith(book);
      expect(book.stock).toBe(1);
      expect(book.save).toHaveBeenCalled();
      expect(Penalty.create).toHaveBeenCalledWith({
        MemberId: "M001",
        endDate: expect.any(Date),
      });
    });

    test("should handle return without penalty", async () => {
      const member = {
        id: "M001",
        getBooks: jest.fn().mockResolvedValue([{ id: "NRN-7" }]),
        removeBook: jest.fn(),
      };
      const book = { id: "NRN-7", stock: 0, save: jest.fn() };
      const memberBook = {
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      };
      memberRepository.findById.mockResolvedValue(member);
      bookRepository.findById.mockResolvedValue(book);

      MemberBook.findOne.mockResolvedValue(memberBook);

      const result = await memberService.returnBook("M001", "NRN-7");

      expect(result).toBe("Book returned successfully");
      expect(member.removeBook).toHaveBeenCalledWith(book);
      expect(book.stock).toBe(1);
      expect(book.save).toHaveBeenCalled();
      expect(Penalty.create).not.toHaveBeenCalled();
    });
  });
});
