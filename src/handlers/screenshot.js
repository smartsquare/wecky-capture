import log from '../utils/log'
import screenshot from '../chrome/screenshot'
var AWS = require("aws-sdk");
var s3 = new AWS.S3();

export default async function handler (event, context, callback) {
  event.Records.forEach(async (record) => {
    if (record.eventName == 'INSERT') {
      const url = record.dynamodb.NewImage.url.S;
      const websiteId = record.dynamodb.NewImage.websiteId.S;
      const hashValue = record.dynamodb.NewImage.hashValue.N;

      let data
      log('Processing screenshot capture for', url)
      const startTime = Date.now()

      try {
        data = await screenshot(url, false)
      } catch (error) {
        console.error('Error capturing screenshot for', url, error)
        return callback(error)
      }

      log(`Chromium took ${Date.now() - startTime}ms to load URL and capture screenshot.`)
      const key = `${websiteId}-${Math.abs(hashValue)}.png`
      const params = {
        Bucket : "wecky-screens",
        Key : key,
        Body : new Buffer(data, 'base64')
      }
      s3.putObject(params, function(err, data) {
        if (err) console.log(err, err.stack);
      });
      log(`Successfully uploaded ${key} to bucket wecky-screens`)
    } else {
      log('Skipping dynamodb non insert');
    }
  });
  return callback(null, "Processed all dynamodb events");
};
