import bcrypt from 'bcrypt';
import User from '../../models/user.js';  // Adjust path as needed

const SignUp = async ({ name, email, password, userRole }) => {
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      name,
      email,
      password,
      userRole
    });

    return 'User created successfully';
  } catch (err) {
    console.error('❌ SignUp Error:', err);
    throw new Error('Unable to sign up user');
  }
};

export default SignUp;
