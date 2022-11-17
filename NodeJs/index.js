const http = require('http');
const { MongoClient } = require('mongodb');
const { getBullshit, postBullshit, postBullcrap, patchBullcrap, deleteBullcrap } = require('./controllers');

http.createServer(async (req, res) => {
  const { url, method } = req;
  const client = new MongoClient('mongodb://localhost:27017/');
  await client.connect();
  switch(method) {
    case 'GET':
      await getBullshit(req, res);
      break;
    case 'POST':
      if (url === '/file') await postBullshit(req, res);
      else if (url === '/db') await postBullcrap(req, res, client);
      else res.end();
      break;
    case 'PUT':
      await patchBullcrap(req, res, client);
      break;
    case 'DELETE':
      await deleteBullcrap(req, res, client);
      break;
    default:
      console.log('Method not recognized');
  }
}).listen(3000, () => console.log('Server running on port 3000'));
