# WHOB Server

Returns the data found at the token URI of the given contract with token ID.

## Running Locally

```sh
npm i
npm run start
```

## Linting

```sh
npm run lint
```

Bot will run inside of terminal until killed.

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

https://devcenter.heroku.com/articles/procfile
https://devcenter.heroku.com/articles/git
https://devcenter.heroku.com/articles/scaling

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)

## Testing

This should return Radioactive Punk #5
```
curl http://localhost:3000/0x5694010444cC8fbbed96c23a65FbC3714F624A26/5
```
