import Validator from 'fastest-validator';

export const validator: Validator = new Validator();

export const userSchema = {
  email: {
    type: 'email', min: 3, max: 100,
  },
  name: {
    type: 'string', min: 3, max: 100, optional: true,
  },
  password: {
    type: 'string', min: 3, max: 100,
  },
};
