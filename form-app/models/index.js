import { Sequelize } from 'sequelize';
import pg from 'pg';
import UserModel from './user.js';
import FormModel from './form.js';
import SubmissionModel from './submission.js';
import SubmissionLocationModel from './submissionLocation.js';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

const User = UserModel(sequelize);
const Form = FormModel(sequelize);
const Submission = SubmissionModel(sequelize);
const SubmissionLocation = SubmissionLocationModel(sequelize);

User.hasMany(Form, { foreignKey: 'publisherId', as: 'forms' });
Form.belongsTo(User, { foreignKey: 'publisherId', as: 'publisher' });

Form.hasMany(Submission, { foreignKey: 'formId', as: 'submissions' });
Submission.belongsTo(Form, { foreignKey: 'formId', as: 'form' });

Submission.hasOne(SubmissionLocation, { foreignKey: 'submissionId', as: 'location' });
SubmissionLocation.belongsTo(Submission, { foreignKey: 'submissionId', as: 'submission' });

export { sequelize, User, Form, Submission, SubmissionLocation };