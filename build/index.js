"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Frameworks
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
//import Routes
const filmsRouter_1 = __importDefault(require("./routes/filmsRouter"));
const peopleRouter_1 = __importDefault(require("./routes/peopleRouter"));
const planetsRouter_1 = __importDefault(require("./routes/planetsRouter"));
const starshipsRouter_1 = __importDefault(require("./routes/starshipsRouter"));
//Cron implementation 
const node_cron_1 = __importDefault(require("node-cron"));
const uploadData = __importStar(require("./utils/cron"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.URL_PORT_FRONT,
    methods: 'GET',
    allowedHeaders: 'Content-Type,Authorization'
}));
//listening port connection
const PORT = process.env.PORT || "8000";
app.listen(PORT, () => {
    console.log("server running on port:", PORT);
});
//Mongo connection
const mongoPath = process.env.MONGODB_PATH;
if (!mongoPath) {
    throw new Error("MONGODB_PATH variable is not defined in enviroment file");
}
mongoose_1.default.connect(mongoPath, { maxPoolSize: 5 })
    .then(() => {
    console.log("DB connection successful");
})
    .catch((error) => {
    console.error("Error trying to connect to MONGO DB", error);
});
//routes
app.use("/films", filmsRouter_1.default);
app.use("/people", peopleRouter_1.default);
app.use("/planets", planetsRouter_1.default);
app.use("/starships", starshipsRouter_1.default);
// schedule 
node_cron_1.default.schedule('00 00 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    if (mongoose_1.default.connection.readyState === 1) {
        const uploadToMongo = [uploadData.savePlanetsToMongoDB(), uploadData.savePeopleToMongoDB(), uploadData.saveStarshipsToMongoDB(), uploadData.saveFilmsToMongoDB()];
        try {
            console.log('Running cron job to sync data with MongoDB...');
            Promise.all(uploadToMongo).then(info => console.log(info))
                .catch(error => console.error(error));
            console.log('Data synchronization completed.');
        }
        catch (error) {
            console.log(`Error during cron job: ${error}`);
        }
    }
    else {
        console.log("MongoDB no está conectado.");
    }
}));
exports.default = app;
