import { Request, Response } from "express";
import { product } from "../../db";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, description, stock } = req.body;

    if (!name || !price || !stock) throw Error("Mandatory data missing");
    console.log(req.body);

    const result = await product.create({
      name,
      price,
      stock,
      description,
    });

    return res.json({
      msg: `Product created successfully`,
      success: true,
      product: result,
    });
  } catch (error) {
    console.log(error, "error");

    return res.json({ msg: `Error 404 - ${error}` });
  }
};

export const productPut = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, description, stock } = req.body;
    console.log(req.body);
    
    const productToUpdate = await product.findByPk(id);

    if (!productToUpdate) throw new Error("El producto que desea actualizar no existe");

    if (!name || !price || !description || !stock) return res.json({ msg: "Missing required fields" });

    const update = await product.update(
      { name, price, description, stock },
      { where: { id } }
    );

    return res.status(200).json({
      msg: `Product update successfully`,
      success: true,
      user: update,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.json({ msg: `Error 404 - ${error.message}` });
    }
    return res.json({ msg: `Error 404 - Unknown error occurred` });
  }
  }

