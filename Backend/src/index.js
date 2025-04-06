
import connectDB from './db/index.js';
import dotenv from 'dotenv';

dotenv.config({
    path: './env'
})

connectDB();
























// first approach to connect to mongoDB

// import express from 'express';
// const app = express();
// ;( async ()=>{
//    try {
//     await mongoose.connect(`${process.env.MONGO_URI}/&{DB_NAME}`)
//     app.on('error', (error) => {
//         console.log('Error in server:', error);
//         throw error;
//     })
//     app.listen(process.env.PORT,() => {
//         console.log(`Server is running on port ${process.env.PORT}`);
//     })
//    } catch (error) {
//     console.log('Error connecting to MongoDB:', error);
//     throw error;
//    }
// })()