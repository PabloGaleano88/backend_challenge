//Frameworks
import express from "express";
import mongoose from "mongoose"
import dotenv from 'dotenv'
import cors from "cors"

//import Routes
import filmsRouter from "./routes/filmsRouter";
import peopleRouter from "./routes/peopleRouter";
import planetsRouter from "./routes/planetsRouter";
import starshipsRouter from "./routes/starshipsRouter";

//Cron implementation 
import cron from "node-cron"
import * as uploadData from "./utils/cron";

dotenv.config()

const app = express()

app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET',
    allowedHeaders: 'Content-Type,Authorization'
}));

//listening port connection
const PORT = process.env.PORT || "8000";

app.listen(PORT, () => {
    console.log("server running on port:", PORT)
})

//Mongo connection
const mongoPath = process.env.MONGODB_PATH;

if (!mongoPath) {
    throw new Error("MONGODB_PATH variable is not defined in enviroment file");
}

mongoose.connect(mongoPath, { maxPoolSize: 5 })
    .then(() => {
        console.log("DB connection successful")
    })
    .catch((error) => {
        console.error("Error trying to connect to MONGO DB", error);
    });

//routes

app.use("/films", filmsRouter)
app.use("/people", peopleRouter)
app.use("/planets", planetsRouter)
app.use("/starships", starshipsRouter)


// schedule 

cron.schedule('00 00 * * *', async () => {
    if (mongoose.connection.readyState === 1) {
        const uploadToMongo = [uploadData.savePlanetsToMongoDB(), uploadData.savePeopleToMongoDB(), uploadData.saveStarshipsToMongoDB(), uploadData.saveFilmsToMongoDB()]
        try {
            console.log('Running cron job to sync data with MongoDB...');
            Promise.all(uploadToMongo).then(info => console.log(info))
                .catch(error => console.error(error));
            console.log('Data synchronization completed.');
        } catch (error) {
            console.log(`Error during cron job: ${error}`);
        }
    } else {
        console.log("MongoDB no está conectado.");
    }
});

export default app


