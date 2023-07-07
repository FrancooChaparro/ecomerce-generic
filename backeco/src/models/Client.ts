import { DataTypes, Model, Sequelize } from "sequelize";

export class Client extends Model {
    public id!: number;
    public name!: string;
    public lastname!: string;
    public phonenumber!: string;
    public city!: string;
    public adress!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  export const initClient = (sequelize: Sequelize) => {
    Client.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phonenumber: {
          type: DataTypes.STRING,
          allowNull: false,
        }, 
        city: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        adress: {
            type: DataTypes.STRING,
            allowNull: false,
          },
      },
      {
        sequelize,
        tableName: "client",
        timestamps: false,
      }
    );
  };
  