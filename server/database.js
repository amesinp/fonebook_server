import 'dotenv/config';
import mongoose from 'mongoose';

const initializeDb = () => {
    mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, function(err, client) {
        if (err) console.log(err);
        console.log("Connected to database successfully");
    });
}

export default initializeDb;