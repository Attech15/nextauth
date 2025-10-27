import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Database connected successfully');
        });

        connection.on('error', (err) => {
            console.log('Database connection error, please make sure db is running: ',err);
            process.exit();
        });
        
    } catch(err){
        console.log('Database connection failed ',err);
    }
};