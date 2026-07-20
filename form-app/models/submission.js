import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class Submission extends Model {}
  Submission.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    formId: { type: DataTypes.UUID, allowNull: false },
    enteredName: { type: DataTypes.STRING, allowNull: false },
    matched: { type: DataTypes.BOOLEAN, allowNull: false },
    ipAddress: { type: DataTypes.STRING },
    userAgent: { type: DataTypes.TEXT },
    deviceType: { type: DataTypes.STRING },
    browser: { type: DataTypes.STRING },
    os: { type: DataTypes.STRING },
  }, { sequelize, modelName: 'Submission', tableName: 'submissions' });
  return Submission;
};