import { Request, Response } from "express";
import { User } from "../../db";
import { encrypt, compare } from "../helpers/bcrypt";
import { Op } from "sequelize";

export const userCreate = async (req: Request, res: Response) => {
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

export const userPut = async (req: Request, res: Response) => {
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

export const getUsers = async (req: Request, res: Response) => {
  const regex_FullText = /^([a-zA-Z ]+)/i;

  const { name } = req.query;
  let users;

  try {
    if (typeof name === "string") {
      if (name.trim() === "") {
        users = await User.findAll();
        res.status(200).json({ data: users, message: "Listado de usuarios" });
      } else {
        if (regex_FullText.test(name)) {
          users = await User.findAll({
            where: {
              username: { [Op.iLike]: `%${name}%` },
            },
          });

          if (users.length == 0) {
            res.status(500).json({
              status: false,
              msg: `No se encontro ningun User con el atributo ${name}`,
              errorCode: 12,
            });
          } else {
            res
              .status(200)
              .json({ data: users, message: "Listado de usuarios" });
          }
        } else {
          res.status(500).json({
            status: false,
            msg: `Formato de busqueda invalido`,
            errorCode: 14,
          });
        }
      }
    } else {
      users = await User.findAll();
      res.status(200).json({ data: users, message: "Listado de usuarios" });
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      msg: `Entro al catch, ${error}`,
      errorCode: 400,
    });
  }
};

export const getUserParams = async (req: Request, res: Response) => {
  const userID = req.params.id;
  try {
    const result = await User.findByPk(userID);
    if (result) {
      res.status(200).json({ data: result, message: "Usuario solicitado" });
    } else {
      res
        .status(404)
        .json({ error: `No existe un usuario con el ID ${userID}` });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.destroy({
      where: {
        id: `${id}`,
      },
    });
    if (!deletedUser) return res.json({ msg: "Username does not exist" });
    return res.json({ msg: "User Deleted" });
  } catch (error) {
    return res.json({ msg: `Error 404 - ${error}` });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: `${email}` } });
    if (!user) return res.json({ msg: "User not found", success: user });

    const checkPassword = await compare(password, user.dataValues.password);

    if (checkPassword) {
      const { email, username } = user.dataValues;
      return res.status(200).send({
        data: { email, username },
        success: true,
      });
    }
    if (!checkPassword) {
      return res.json({ msg: "Invalid password", success: false });
    }
  } catch (error) {
    return res.json({ msg: `Error 404 - ${error}` });
  }
  throw new Error("Unexpected error occurred.");
};
