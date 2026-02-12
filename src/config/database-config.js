import mongoose from "mongoose";

import configVar from "./server-config.js";

const DB_URL =  configVar.DB_URL;

const connect = async () => {
    await mongoose.connect(DB_URL);
}
 
export default connect;