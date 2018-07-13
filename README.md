# Wecky - Capture
Part of wecky, website checker, this function is responsible for capturing a screenshot of a website.
This node lambda function uses the plugin serverless-plugin-chrome, which comes with a headless chromium that is used to render the website.

## Dependencies
* Gets triggered by `DynamoDB` for new rows in  `WebsiteHashes`. 
* Puts screenshots in `S3` in bucket `wecky-screens`.

Region `eu-central-1` is hardcoded for now.

## Installation
A local node.js and the serverless framework is required.

```bash
npm install serverless -g
```

```bash
npm install
```
```bash
npm run deploy
```

## Thanks
...to https://github.com/adieuadieu/serverless-chrome for the work done!
