// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: String }] // e.g., "LKA", "USA"
});

const User = mongoose.model('User', userSchema);
export default User;
