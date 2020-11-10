add = require('./add.js')
sub = require('./sub.js')
mul = require('./mul.js')
div = require('./div.js')

var express = require('express')
const fs = require('fs');

var html = ""
var output = ""
var x = 0
var y = 0

fs.readFile('./index.html', (err, data) => {
    if (err) {
        console.log("err")
        throw err
    }

    html = data.toString()
})


const app = express()

app.use(express.urlencoded({
  extended: true
}))

app.get('/', (req, res) => {
    res.writeHeader(200, {"Content-Type": "text/html"})
    res.write(template(html, output, x, y))
})

app.post('/', (req, res) => {
    res.writeHeader(200, {"Content-Type": "text/html"})
    res.write(template(html,calculate(req.body.fn, parseFloat(req.body.x), parseFloat(req.body.y)),
                       req.body.x, req.body.y))
})

function calculate(fn, x, y) {
    switch (fn) {
    case '+':
        return add(x, y)
    case '-':
        return sub(x, y)
    case '*':
        return mul(x, y)
    case '/':
        return div(x, y)
    }
}


function template(html, output, x, y) {
    return html.replace('{{OUTPUT}}', output)
               .replace('{{X}}', x)
               .replace('{{Y}}', y)
}




app.listen(3000)
