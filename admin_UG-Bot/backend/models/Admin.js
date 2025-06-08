import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const AdminModel = mongoose.model('users', AdminSchema);

export default AdminModel;
