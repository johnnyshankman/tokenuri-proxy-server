# TokenURI Proxy Server

Returns the data found at the token URI of the given contract with token ID.

Can have the Ethereum RPC Node swapped with any RPC, but currently uses CloudFlare's. Find more free-to-use RPC's at https://ethereumnodes.com/

Made to be deployed easily as a Heroku web app.

## Why Did I Build This?

Lots of older Smart Contracts that live on Ethereum use the ERC721 and ERC1155 standards which force the developer to pick a `baseURI` that is then concatenated with the token's uint256 id in order to retrieve its `tokenURI`. This produces a web2 URL something like `https://mybaseuri.com/1.json`. 

In those cases, there's no clean way to fully migrate on-chain even if you have a beautiful renderer contract that returns a valid `tokenURI`, as there is nowhere to input the address for a rendering contract and have it return its `tokenURI`.

In comes this proxy server as a bridge solution. You put your renderer on-chain with a `tokenURI` method, then simply standup this server to point to it. When this API is hit publicly using a web2 URL in line with the syntax of `baseURI` it will return your onchain `tokenURI` as the metadata in JSON form.

Huzzah you are now as onchain as you're ever going to get!

## Usage and Running Locally

First, fork this repo. Then to build:

```sh
npm i
npm run start
```

## Linting

```sh
npm run lint
```

## Testing and Usage

After forking this repo by default it is setup to retrieve the tokenURI from the contract on mainnet at `0x5694010444cC8fbbed96c23a65FbC3714F624A26`. You can override this by editing the code anytime.

This should return Radioactive Punk #5
```
curl http://localhost:3000/0x5694010444cC8fbbed96c23a65FbC3714F624A26/5
```

API will run until manually killed.

## Deploying to Heroku

Ensure your app

```
$ heroku login # ensure you're logged in
# make this repo connected to heroku by creating a new app
# or connect to a previously existing heroku app
$ heroku create # new app
$ heroku git:remote -a tokenuri-proxy-server # existing app
# push code to heroku and trigger build
$ git push heroku main
# turn on the web dyno not the worker dyno just in case
$ heroku ps:scale web=1 worker=0
```

### Troubleshooting

One common issue is that if you have both a `package-lock.json` and `yarn.lock` the deploy will fail.

## Documentation

* https://devcenter.heroku.com/articles/procfile
* https://devcenter.heroku.com/articles/git
* https://devcenter.heroku.com/articles/scaling

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
