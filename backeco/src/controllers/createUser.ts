import { Request, Response } from "express";
import { User } from "../../db";

export const crear = async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
  
      const userCreate = await User.create({ 
        username,
        email,
        password
      })
  
      return res.json({
        msg: `User created successfully`,
        success: true,
        user: userCreate,
      });
    } catch (error) {
      return res.json({ msg: `Error 404 - ${error}` });
    }
}


