import { Member, IMember } from "../models/Member.model";
import { AppError } from "../middlewares/error.middleware";

export class MemberRepository {
  static async create(memberData: Partial<IMember>) {
    return Member.create(memberData);
  }

  static async findById(id: string) {
    return Member.findById(id).populate("user", "name email phone role");
  }

  static async findByUserId(userId: string) {
    return Member.findOne({ user: userId });
  }

  static async getAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const members = await Member.find()
      .populate("user", "name email phone")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Member.countDocuments();
    return { members, total, page, limit };
  }

  static async update(id: string, updateData: Partial<IMember>) {
    return Member.findByIdAndUpdate(id, updateData, { new: true }).populate(
      "user",
    );
  }
}
