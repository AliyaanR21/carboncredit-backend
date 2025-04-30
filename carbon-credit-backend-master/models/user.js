import bcrypt from 'bcrypt';
import { Schema, model, Types } from 'mongoose';

const { SALT_ROUNDS } = process.env;

import { USER_ROLE, USER_STATUS } from '../routes/utils/constants';

const schema = new Schema({
  name: { type: String },
  email: {
    type: String,
    unique: true,
    required: 'Email Address is required'
  },
  password: { 
    type: String,
    //unique: true,
    required: 'Password is required'
  },
  userRole: {
    type: String,
    enum: Object.values(USER_ROLE),
    required: true
  },
  userStatus: {
    type: String,
    enum: Object.values(USER_STATUS),
    default: USER_STATUS.PENDING
  },
  token: { type: String }
}, {
  timestamps: true,
  strict: false
});

// schema.pre('save', async function SavePassword(next) {
//   try {
//     const user = this;
//     if (!user.isModified('password')) {
//       return next();
//     }
//     const hashSalt = parseInt(SALT_ROUNDS, 10) || 10;
//     const hashedPassword = await bcrypt.hash(user.password, hashSalt);
//     this.password = hashedPassword;

//     return next();
//   } catch (error) {
//     const err = new Error();
//     err.errorMessage = 'Error while encrypting';
//     throw err;
//   }
// });

schema.pre('save', async function SavePassword(next) {
  try {
    const user = this;

    console.log("⏳ Saving User...");
    console.log("🔐 Incoming password:", user.password);

    if (!user.isModified('password')) {
      console.log("⚠️ Password not modified. Skipping hashing.");
      return next();
    }

    const hashSalt = parseInt(SALT_ROUNDS, 10) || 10;
    const hashedPassword = await bcrypt.hash(user.password, hashSalt);

    console.log("✅ Hashed password:", hashedPassword);

    this.password = hashedPassword;
    next();
  } catch (error) {
    const err = new Error('Error while encrypting');
    throw err;
  }
});


schema.methods.ValidatePassword = function (candidatePassword) {
  try {
    return bcrypt.compareSync(candidatePassword, this.password);
  } catch (error) {
    const err = new Error();
    err.errorMessage = 'Error In Password Validation';

    throw err;
  }
};

const User = model('user', schema, 'users');

export default User;
