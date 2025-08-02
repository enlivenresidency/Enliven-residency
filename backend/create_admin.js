require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');  // Adjust path accordingly

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI, {
    // remove deprecated options as needed
  });

  const username = 'admin';
  const plainPassword = 'Anukuladmin@123';  // choose a strong password
  const role = 'admin';

  const existing = await User.findOne({ username });
  if (existing) {
    console.log(`User "${username}" already exists.`);
    return;
  }

  const passwordHash = await bcrypt.hash(plainPassword, 10);
  const adminUser = new User({
    username,
    passwordHash,
    role,
  });

  await adminUser.save();
  console.log('Admin user created successfully!');
  mongoose.connection.close();
}

createAdmin().catch(err => {
  console.error('Error creating admin user:', err);
  mongoose.connection.close();
});
