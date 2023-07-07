import { Request, Response } from "express";
import { product } from "../../db";



export const createProduct = async (req: Request, res: Response) => { 
   try {
    const { name, price, description, stock } = req.body;

    if (!name || !price || !stock || !description) throw Error("Mandatory data missing");
    console.log(req.body);

    const result = await product.create({ 
        name: "hola",
        price: 22,
        stock: 22,
        description: "bien ahi"
    })
    return res.json({
        msg: `Product created successfully`,
        success: true,
        product: result,
      });

   } catch (error) {
    console.log(error, "error");
    
     return res.json({ msg: `Error 404 - ${error}`});
   }
}


