const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://abhishanmg:3br19me402@cluster0.vopgpjq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0I', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("Mongo connect server");
        
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB