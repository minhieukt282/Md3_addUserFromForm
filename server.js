const http = require('http')
const fs = require('fs')
const qs = require('qs')

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        fs.readFile('./views/index.html', 'utf-8', (err, data) => {
            if (err) console.log(err)
            res.writeHead(200, {'Content-type': 'text/html'})
            res.write(data)
            res.end()
        })
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            let qsData
            qsData = qs.parse(data)
            saveData(qsData, './storage/listUser.JSON')
            return res.end('Register success!');
        })
        req.on('error', () => {
            console.log('error')
        })
    }
})

server.listen(8080, function () {
    console.log('server running at localhost:8080 ')
});

function saveData(qsData, path) {
    let dataJSON
    let dataString
    let listUserObj = []
    dataString = fs.readFileSync(path, {encoding: 'utf8', flag: 'r'})
    dataJSON = JSON.parse(dataString)
    dataJSON.forEach(item => {
        listUserObj.push(item)
    })
    listUserObj.push(qsData)
    dataString = JSON.stringify(listUserObj)
    fs.writeFile(path, dataString, (err) => {
        if (err) console.log(err)
        console.log("write done!")
    })
}