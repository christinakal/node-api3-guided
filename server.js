const express = require('express'); // importing a CommonJS module

const hubsRouter = require('./hubs/hubs-router.js');
const helmet = require('helmet');
const server = express();

//the three amigas: rachel, rita and nancy


server.use(express.json());
server.use(helmet());
server.use('/api/hubs', gatekeeper, hubsRouter);

server.get('/', logger, greeter, (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome ${req.cohort} to the Lambda Hubs API</p>
    `);
});

module.exports = server;

function greeter(req, res, next) {
  req.cohort = "Web 26";
  next();
}

function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.originalUrl}`)
  next();
}

function gatekeeper(req, res, next){
  if (req.headers.password && req.headers.password.toLowerCase() !== "mellon"){
      res.status(401).json({error: "Wrong password!!!"});
      res.end();
  } else {
    next();
  }
}
