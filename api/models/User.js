
import mongoose from 'mongoose';
import moment from 'moment';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: moment().format('DD-MM-YYYY hh:mm:ss')
    },
    active: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'user'
    }
});

const User = mongoose.model('User', userSchema);

export default User;
