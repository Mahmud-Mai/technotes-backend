const { format } = require("date-fns")
const { v4: uuid } = require('uuid')
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises

const logEvents = async (message, logFileName) => {
   const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
   const logItem = `${dateTime}\t${uuid()}\t${message}\n`

   try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            console.log('/logs doesn\'t exist');
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
   } catch (error) {
        console.log(error);
   }

}

const logger = (req, res, next) => {
    // make sure to add conditions for narrowing down origin an the rest, to avoid filling up the file
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log('Some error around here:', `${req.method}\t${req.path}`)
    next()
}

module.exports = { logEvents, logger }