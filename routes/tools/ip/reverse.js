const dns = require("dns")
const express = require("express")
const router = express.Router()
const empty = (val) => {
    return val == undefined || val == '' || val == ' ' || val == null
}
const request = require("request")
const replace = (str, separator, replace) => {
    return str.split(separator).join(replace)
}
router.get("/revip", (req, res) => {
    res.render("revip", {url: "", output: ""})

})
module.exports = router