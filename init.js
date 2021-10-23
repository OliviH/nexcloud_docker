const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config()

String.prototype.replaceAll = function(search, replacement) {
    let target = this
    return target.split(search).join(replacement)
}

fs.copyFile('docker-compose.yml', `docker-compose_old_${new Date().toISOString()}.yml`, (err) => {
    if (err) throw err
})

const buffer = fs.readFileSync('docker-compose.yml')
let fileContent = buffer.toString()

const NETWORKFIND = '{{NETWORK}}'

fileContent = fileContent.replaceAll(NETWORKFIND, process.env.NETWORK)

fs.writeFile('docker-compose.yml', fileContent, (err) => {
    if (err) throw err;
    console.log('DONE: vous pouvez maintenant utiliser docker-compose')
});
console.log(fileContent)