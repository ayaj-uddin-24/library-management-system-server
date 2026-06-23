import { Request, Response } from "express";
import { MemberService } from "../services/member.service";

export class MemberController {
  static async createMember(req: Request, res: Response) {
    const member = await MemberService.createMember(req.body);
    res.status(201).json({
      success: true,
      message: "Member created successfully",
      data: member,
    });
  }

  static async getMembers(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await MemberService.getMembers(page, limit);

    res.status(200).json({
      success: true,
      ...result,
    });
  }

  static async getMemberById(req: Request, res: Response) {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const member = await MemberService.getMemberById(id);
    res.status(200).json({
      success: true,
      data: member,
    });
  }

  static async updateMember(req: Request, res: Response) {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const member = await MemberService.updateMember(id, req.body);
    res.status(200).json({
      success: true,
      message: "Member updated successfully",
      data: member,
    });
  }
}
