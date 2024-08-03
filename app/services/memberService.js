const memberRepository = require("../repositories/memberRepository");
const bookRepository = require("../repositories/bookRepository");
const { MemberBook, Penalty } = require("../models");

class MemberService {
  async getAllMembers() {
    return await memberRepository.findAll();
  }

  async getMemberById(code) {
    const book = await memberRepository.findById(code);
    if (!book) {
      throw new Error("Member not found");
    }
    return book;
  }

  async createMember(memberData) {
    return await memberRepository.create(memberData);
  }

  async updateMember(code, memberData) {
    const book = await memberRepository.update(code, memberData);
    if (!book) {
      throw new Error("Member not found");
    }
    return book;
  }

  async deleteMember(code) {
    const book = await memberRepository.delete(code);
    if (!book) {
      throw new Error("Member not found");
    }
    return book;
  }

  async borrowBook(memberId, bookId) {
    const member = await memberRepository.findById(memberId);
    const book = await bookRepository.findById(bookId);

    if (!member || !book) {
      throw new Error("Member or Book not found");
    }

    if (book.stock < 1) {
      throw new Error("Book is not available");
    }

    const borrowedBooks = await member.getBooks();
    if (borrowedBooks.length >= 2) {
      throw new Error("Member cannot borrow more than 2 books");
    }

    // Check if member has a penalty
    const penalty = await Penalty.findOne({
      where: { MemberId: memberId },
    });
    if (penalty && new Date() < new Date(penalty.endDate)) {
      throw new Error("Member cannot borrow books due to penalty");
    }

    await member.addBook(book);
    book.stock -= 1;
    await book.save();

    return "Book borrowed successfully";
  }

  async returnBook(memberId, bookId) {
    const member = await memberRepository.findById(memberId);
    const book = await bookRepository.findById(bookId);

    if (!member || !book) {
      throw new Error("Member or Book not found");
    }

    const borrowedBooks = await member.getBooks({ where: { code: bookId } });
    if (borrowedBooks.length === 0) {
      throw new Error("Book was not borrowed by this member");
    }

    const memberBook = await MemberBook.findOne({
      where: { MemberId: memberId, BookId: bookId },
    });

    if (!memberBook) {
      throw new Error("Borrow record not found");
    }

    const borrowDate = new Date(memberBook.createdAt);
    const returnDate = new Date();
    const diffDays = Math.ceil(
      (returnDate - borrowDate) / (1000 * 60 * 60 * 24)
    );

    if (diffDays > 7) {
      await Penalty.create({
        MemberId: memberId,
        endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      });
    }

    await member.removeBook(book);
    book.stock += 1;
    await book.save();

    return "Book returned successfully";
  }
}

module.exports = MemberService;
