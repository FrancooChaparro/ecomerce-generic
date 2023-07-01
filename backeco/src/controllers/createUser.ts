import { Request, Response } from "express";
import { User } from "../../db";
import { encrypt } from "../helpers/bcrypt";

export const UserCreate = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const regexName = /^([a-zA-Z ]+)$/i;
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const infoUser = {
      username,
      password,
    };

    if (!username || !password || !email)
      return res.json({ msg: "Missing required fields" });

    if (email && email.length > 0 && email != "") {
      if (regexEmail.test(email)) {
        const userBD = await User.findOne({ where: { email: `${email}` } });
        if (userBD) {
          return res.json({ msg: "The email already exists" });
        }
      }

      if (username && username.length > 0 && username != "") {
        if (regexName.test(username)) {
          infoUser.username = `${username}`;
        } else {
          return res.json({ msg: "The name is invalid" });
        }
      }

      if (password && password.length > 0 && password != "") {
        const passwordHash = await encrypt(password);
        infoUser.password = `${passwordHash}`;
      } else {
        return res.json({ msg: "The password is invalid" });
      }
    }

    const userCreate = await User.create({
      username,
      email,
      password: infoUser.password,
    });

    return res.json({
      msg: `User created successfully`,
      success: true,
      user: userCreate,
    });
  } catch (error) {
    return res.json({ msg: `Error 404 - ${error}` });
  }
};

export const UserPut = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, username, password } = req.body;

  try {
    if (!username || !password || !email)
      return res.json({ msg: "Missing required fields" });
    const userBD = await User.findOne({ where: { email: `${email}` } });

    if (userBD) throw Error("The email already exists");

    if (password) {
      const passwordHash = await encrypt(password);
      await User.update(
        { email, password: passwordHash, username },
        { where: { id } }
      );

      return res.status(200).json("Usuario actualizado");
    }

    await User.update({ username, email, password }, { where: { id } });

    return res.status(200).json("Usuario actualizado");
  } catch (error) {
    return res.json({ msg: `Error 404 - ${error}` });
  }
};
