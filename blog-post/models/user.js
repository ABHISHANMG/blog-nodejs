const mongoose = require('mongoose');;
const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ['admin', 'editor', 'member', 'viewer'],
        default: 'viewer'
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
// userSchema.pre('save', async function(next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// });