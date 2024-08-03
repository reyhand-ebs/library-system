const MemberService = require("../services/memberService");
const memberService = new MemberService();

class MemberController {
  // Retrieve all members
  async getAllMembers(req, res) {
    try {
      const members = await memberService.getAllMembers();
      res.json(members);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Retrieve a member by ID
  async getMemberById(req, res) {
    const { code } = req.params;
    try {
      const member = await memberService.getMemberById(code);
      res.json(member);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Create a new member
  async createMember(req, res) {
    const memberData = req.body;
    try {
      const member = await memberService.createMember(memberData);
      res.status(201).json(member);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update an existing member
  async updateMember(req, res) {
    const { code } = req.params;
    const memberData = req.body;
    try {
      const member = await memberService.updateMember(code, memberData);
      res.json(member);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Delete a member by ID
  async deleteMember(req, res) {
    const { code } = req.params;
    try {
      const member = await memberService.deleteMember(code);
      res.json({ message: "Member deleted successfully" });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Member borrows a book
  async borrowBook(req, res) {
    const { memberId, bookId } = req.params;
    try {
      const message = await memberService.borrowBook(memberId, bookId);
      res.json({ message });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Member returns a book
  async returnBook(req, res) {
    const { memberId, bookId } = req.params;
    try {
      const message = await memberService.returnBook(memberId, bookId);
      res.json({ message });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new MemberController();
