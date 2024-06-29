import mongoose from "mongoose";
async function connect() {
    mongoose.set('strictQuery',true);
    const db=await mongoose.connect(process.env.DB_URI);
    console.log("Database Connected Successfully");
    return db;
}
export default connect;