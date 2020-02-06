// MIDDLEWARES
const helmet = require("helmet"); // creates headers that protect from attacks (security)
const bodyParser = require("body-parser"); // turns response into usable format
const cors = require("cors"); // allows/disallows cross-site communication
const morgan = require("morgan"); // logs requests


// const whitelist = ['http://localhost:3001']
// const corsOptions = {
//   origin: function(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   }
// };

module.exports = app => {
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(morgan("combined")); // use 'tiny' or 'combined'
};
