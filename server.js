import express from "express"
const app = express()
import { fileURLToPath } from 'url';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views",path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.static(path.join(__dirname, "public")))
app.get("/", (req, res) => {
    res.render("index")
})

app.listen(3000, () => {console.log("connected")})