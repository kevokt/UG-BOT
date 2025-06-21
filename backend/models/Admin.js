import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String,
}, {
    collection: 'admin',
});

const AdminModel = mongoose.model('admin', AdminSchema);

export default AdminModel;
