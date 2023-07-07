// import { DataTypes, Model, Sequelize } from "sequelize";

// interface ProductAttributes {
//   id: number;
//   name: string;
//   price: number;
//   description?: string;
//   stock: number;
//   info_adicional?: string;
//   calification: number;
//   inCart: boolean;
//   status: boolean;
// }

// export const initProduct = (sequelize: Sequelize) => {
//   class Product extends Model<ProductAttributes> implements ProductAttributes {
//     public id!: number;
//     public name!: string;
//     public price!: number;
//     public description?: string;
//     public stock!: number;
//     public info_adicional?: string;
//     public calification!: number;
//     public inCart!: boolean;
//     public status!: boolean;
//   }

//   Product.init(
//     {
//       id: {
//         type: DataTypes.BIGINT,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       name: {
//         type: DataTypes.STRING,
//         unique: true,
//         allowNull: false,
//       },
//       price: {
//         type: DataTypes.DOUBLE,
//         allowNull: false,
//       },
//       description: {
//         type: DataTypes.TEXT,
//       },
//       stock: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         validate: {
//           min: 0,
//           max: 100,
//         },
//       },
//       info_adicional: {
//         type: DataTypes.STRING,
//       },
//       calification: {
//         type: DataTypes.DOUBLE,
//         defaultValue: 0,
//       },
//       inCart: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: false,
//       },
//       status: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: true,
//       },
//     },
//     { sequelize, modelName: "product", timestamps: false }
//   );

//   return Product;
// };


import { DataTypes, Model, Sequelize } from "sequelize";

interface ProductAttributes {
  id: number;
  name: string;
  price: number;
  description?: string;
  stock: number;
}

class Product extends Model<ProductAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public price!: number;
  public description?: string;
  public stock!: number;
}
export const initProduct = (sequelize: Sequelize) => {

  Product.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 100,
        },
      },
    },
    { sequelize, modelName: "product", timestamps: false }
  );
};