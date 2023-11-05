require('dotenv').config();
const port = require('config').get('port');

const server = require('./settings/express');

require("./settings/database").configure({ force: false });

server.listen(port, () => console.log(`listening  on port:${port}`));
