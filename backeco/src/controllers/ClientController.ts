import { Request, Response } from "express";
import { Client } from "../../db";

export const clientCreate = async (req: Request, res: Response) => { 
    try {
        const { name, lastname, phonenumber, city, adress } = req.body;
        const regexName = /^([a-zA-Z ]+)$/i;
        const regexNumber = /^[0-9]+$/;
        const regexAdress = /^[a-zA-Z0-9]+$/;

        const infoUser = {
            name,
            lastname,
            phonenumber,
            city,
            adress
          };
      
    
        if (!name || !lastname || !phonenumber || !city || !adress )
          return res.json({ msg: "Missing required fields" });
    
       
          if (name && name.length > 0 && name != "") {
            if (regexName.test(name)) {
              infoUser.name = `${name}`;
            } else {
              return res.json({ msg: "The name is invalid" });
            }
          }

          if (lastname && lastname.length > 0 && lastname != "") {
            if (regexName.test(lastname)) {
              infoUser.lastname = `${lastname}`;
            } else {
              return res.json({ msg: "The lastname is invalid" });
            }
          }
          if (phonenumber && phonenumber.length > 0 && phonenumber != "") {
            if (regexNumber.test(phonenumber)) {
              infoUser.phonenumber = `${phonenumber}`;
            } else {
              return res.json({ msg: "The phonenumber is invalid" });
            }
          }
    
          if (city && city.length > 0 && city != "") {
            if (regexName.test(city)) {
              infoUser.city = `${city}`;
            } else {
              return res.json({ msg: "The city is invalid" });
            }
          }

          if (adress && adress.length > 0 && adress != "") {
            if (regexAdress.test(adress)) {
              infoUser.adress = `${adress}`;
            } else {
              return res.json({ msg: "The adress is invalid" });
            }
          }
    
        const clientCreate = await Client.create({
          name, 
          lastname, 
          phonenumber,
          city,
          adress
        });
    
        return res.json({
          msg: `User created successfully`,
          success: true,
          client: clientCreate,
        });
      } catch (error) {
        return res.json({ msg: `Error 404 - ${error}` });
      }
};

// export const clientPut = async (req: Request, res: Response) => { 

// };

// export const getClients = async (req: Request, res: Response) => { 

// };

// export const getClientParams = async (req: Request, res: Response) => { 

// };

// export const deleteClient = async (req: Request, res: Response) => { 

// };

// export const clientLogin = async (req: Request, res: Response) => { 

// };
