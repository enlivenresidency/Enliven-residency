const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('./models/user');  // Adjust the path if needed

async function createUser(username, password, role) {
  await mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  });
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log(`User "${username}" already exists.`);
      return;
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      passwordHash,
      role,  // Either 'admin' or 'manager'
    });

    await newUser.save();
    console.log(`User "${username}" created successfully!`);
  } catch (err) {
    console.error('Error creating user:', err);
  } finally {
    mongoose.connection.close();
  }
}

// Usage Example:
// Replace these values with desired username/password/role

createUser('manager', 'enlivenmanager123', 'manager');
