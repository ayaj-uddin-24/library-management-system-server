import { MemberRepository } from "../repositories/member.repository";
import { AppError } from "../middlewares/error.middleware";
import { IMember } from "../models/Member.model";

export class MemberService {
  static async createMember(memberData: Partial<IMember>) {
    // Check if member already exists for this user
    const existing = await MemberRepository.findByUserId(
      memberData.user! as any,
    );
    if (existing) {
      throw new AppError("Member profile already exists for this user", 409);
    }

    return MemberRepository.create(memberData);
  }

  static async getMembers(page: number, limit: number) {
    return MemberRepository.getAll(page, limit);
  }

  static async getMemberById(id: string) {
    const member = await MemberRepository.findById(id);
    if (!member) throw new AppError("Member not found", 404);
    return member;
  }

  static async updateMember(id: string, updateData: Partial<IMember>) {
    const member = await MemberRepository.update(id, updateData);
    if (!member) throw new AppError("Member not found", 404);
    return member;
  }
}
