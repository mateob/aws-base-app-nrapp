import { DataTypes } from 'sequelize';

export const defaultOptions = (tableName: string) => {
  return {
    tableName,
    timestamps: true,
    paranoid: true,
  };
};

export const defaultEntity = (data: any) => {
  return {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    isBloqued: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    ...data,
  };
};
