const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
    origin: (origin, callback) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
            // callback(err, boolean)
            callback(null, true)
        }
    },
    // set credential header
    credentials: true,
    optionsSuccessStatus: 200,
}

module.exports = corsOptions