const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const path = require("path")
const seoRCE = require("./routes/tools/rce/seomatic")
const revIP = require("./routes/tools/ip/reverse")
const os = require("os")
const hostname = os.hostname()
app.set("views", path.join(__dirname, "views"))
app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.get("/", (req, res) => {
    res.render("index")
})
app.use("/tools/rce/", seoRCE)
app.use("/tools/ip/", revIP)
app.use((req,res,next) => {
    res.status(404)
    res.render("404")
})
app.locals.baseURL = `http://localhost:3000`
app.listen(3000, () => {
    console.log("bisa dong awokaowkok")
})