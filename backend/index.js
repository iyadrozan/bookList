import express, { request, response } from "express"
import { PORT, mongoDBURL } from "./config.js"
import booksRoute from "./routes/bookRoute.js"
import mongoose from "mongoose"
import cors from "cors"

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Content-Type"]
//     })
// )

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome To MERN Stack Project')
})

app.use('/books', booksRoute)

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App Connect To DataBase Successfully");
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
        
    })
    .catch((error) => {
        console.log(error);
    });