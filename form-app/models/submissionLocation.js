import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class SubmissionLocation extends Model {}
  SubmissionLocation.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    submissionId: { type: DataTypes.UUID, allowNull: false },
    latitude: { type: DataTypes.FLOAT },
    longitude: { type: DataTypes.FLOAT },
    accuracy: { type: DataTypes.FLOAT },
  }, { sequelize, modelName: 'SubmissionLocation', tableName: 'submission_locations' });
  return SubmissionLocation;
};