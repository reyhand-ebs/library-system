const request = require("supertest");
const app = require("../index");
const { sequelize, MemberBook } = require("../app/models");

beforeAll(async () => {
  await sequelize.sync({ alter: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Member Endpoints", () => {
  it("should fetch all members", async () => {
    const res = await request(app).get("/members");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("length");
  });

  it("should borrow a book", async () => {
    const memberId = "M001";
    const bookId = "SHR-1";
    const res = await request(app).post(
      `/members/${memberId}/borrow/${bookId}`
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Book borrowed successfully");
  });

  it("should not borrow more than 2 books", async () => {
    const memberId = "M002";
    const bookIds = ["TW-11", "HOB-83", "NRN-7"];

    for (let i = 0; i < bookIds.length; i++) {
      const res = await request(app).post(
        `/members/${memberId}/borrow/${bookIds[i]}`
      );
      if (i < 2) {
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty(
          "message",
          "Book borrowed successfully"
        );
      } else {
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty(
          "error",
          "Member cannot borrow more than 2 books"
        );
      }
    }
  });

  it("should return a book", async () => {
    const memberId = "M001";
    const bookId = "SHR-1";
    const res = await request(app).post(
      `/members/${memberId}/return/${bookId}`
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Book returned successfully");
  });

  it("should handle late return without penalty", async () => {
    const memberId = "M001";
    const bookId = "TW-11";

    // Simulate borrowing a book
    const resBorrow = await request(app).post(
      `/members/${memberId}/borrow/${bookId}`
    );
    expect(resBorrow.statusCode).toEqual(200);
    expect(resBorrow.body).toHaveProperty(
      "message",
      "Book borrowed successfully"
    );

    // Simulate late return by manipulating the borrow date
    const memberBook = await MemberBook.findOne({
      where: { MemberId: memberId, BookId: bookId },
    });

    memberBook.createdAt = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000);
    await memberBook.save();

    const res = await request(app).post(
      `/members/${memberId}/return/${bookId}`
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Book returned successfully");
  });
});
