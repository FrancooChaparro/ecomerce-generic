import { Request, Response } from "express";
import { product } from "../../db";
import { Op } from "sequelize";

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

    if (!productToUpdate)
      throw new Error("El producto que desea actualizar no existe");

    if (!name && !price && !description && !stock)
      return res.json({ msg: "Missing required fields" });

    await product.update(
      { name, price, description, stock },
      { where: { id } }
    );
    const update = await product.findByPk(id);

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
};

export const getProducts = async (req: Request, res: Response) => {
  const { name } = req.query;
  const regex_FullText = /^([a-zA-Z ]+)/i;

  try {
    let products;

    if (typeof name === "string" && name.trim() !== "") {
      if (regex_FullText.test(name)) {
        products = await product.findAll({
          where: {
            name: { [Op.iLike]: `%${name}%` },
          },
        });

        if (products.length === 0) {
          return res.status(500).json({
            status: false,
            msg: `No se encontró ningún producto con el atributo '${name}'`,
            errorCode: 12,
          });
        }
      } else {
        return res.status(500).json({
          status: false,
          msg: `Formato de búsqueda inválido`,
          errorCode: 14,
        });
      }
    } else {
      products = await product.findAll();
    }

    return res.status(200).json({ data: products, message: "Listado de productos" });
  } catch (error) {
    return res.status(400).json({
      status: false,
      msg: `Error en la solicitud: ${error}`,
      errorCode: 400,
    });
  }
};


export const getProductParams = async (req: Request, res: Response) => { 
  const productID = req.params.id;
  try {
    const result = await product.findByPk(productID);
    if (result) {
      res.status(200).json({ data: result, message: "Producto solicitado" });
    } else {
      res
        .status(404)
        .json({ error: `No existe un usuario con el ID ${productID}` });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
}


export const deleteProduct = async (req: Request, res: Response) => { 
  const { id } = req.params;

  try {
    const deletedProduct = await product.destroy({
      where: {
        id: `${id}`,
      },
    });
    if (!deletedProduct) return res.json({ msg: "product does not exist" });
    return res.json({ msg: "product Deleted" });
  } catch (error) {
    return res.json({ msg: `Error 404 - ${error}` });
  }
}