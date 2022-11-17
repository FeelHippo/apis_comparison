const fetch = require('node-fetch');
const fs = require('fs');

const getBullshit = async (_req, res) => {
  try {
    console.log('getBullshit');
    const response = await fetch('https://corporatebs-generator.sameerkumar.website/', {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};

const bodyParser = async (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', data => body += data);
    req.on('end', () => resolve(body));
    req.on('error', console.error);
  });
};

const postBullshit = async (req, res) => {
  try {
    console.log('postBullshit');
    const path = __dirname + '/temp.txt';
    const body = await bodyParser(req);
    fs.writeFile(path, body, err => err && console.error(err));
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(body);
  } catch (error) {
    console.error(error);
  }
};

const postBullcrap = async (req, res, client) => {
  try {
    console.log('postBullcrap');
    const body = await bodyParser(req);
    const collection = client.db('test').collection('node');
    const parsed_body = JSON.parse(body);
    const result = await collection.updateOne(parsed_body, { $set: parsed_body }, { upsert: true });
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ _id: result.insertedId }));
    res.end();
  } catch (error) {
    console.error(error);
  }
};

const patchBullcrap = async (req, res, client) => {
  try {
    console.log('patchBullcrap');
    const body = await bodyParser(req);
    const collection = client.db('test').collection('node');
    const parsed_body = JSON.parse(body);
    await collection.updateOne(parsed_body, { $set: { updated: true } });
    res.writeHead(204);
    res.end();
  } catch (error) {
    console.error(error);
  }
};

const deleteBullcrap = async (req, res, client) => {
  try {
    console.log('deleteBullcrap');
    const { message } = require('url').parse(req.url, true).query;
    const collection = client.db('test').collection('node');
    await collection.deleteOne({ message });
    res.writeHead(204);
    res.end();
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getBullshit, postBullshit, postBullcrap, patchBullcrap, deleteBullcrap };
