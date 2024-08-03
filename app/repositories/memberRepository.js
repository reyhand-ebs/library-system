const { Member } = require("../models");

class MemberRepository {
  async findAll() {
    return await Member.findAll();
  }

  async findById(code) {
    return await Member.findByPk(code);
  }

  async create(memberData) {
    return await Member.create(memberData);
  }

  async update(code, memberData) {
    const member = await Member.findByPk(code);
    if (member) {
      return await member.update(memberData);
    }
    return null;
  }

  async delete(code) {
    const member = await Member.findByPk(code);
    if (member) {
      return await member.destroy();
    }
    return null;
  }
}

module.exports = new MemberRepository();
