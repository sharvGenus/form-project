import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class Form extends Model {}
  Form.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    expectedName: { type: DataTypes.STRING, allowNull: false },
    successMessage: { type: DataTypes.TEXT, allowNull: false },
    failureRedirectUrl: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM('draft', 'published'), defaultValue: 'draft' },
    publisherId: { type: DataTypes.UUID, allowNull: false },
  }, { sequelize, modelName: 'Form', tableName: 'forms' });
  return Form;
};