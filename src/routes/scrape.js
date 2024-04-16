import { Router } from 'express';

const puppeteer = require('puppeteer');
const fs = require('fs');

const router = Router();

router.get('/', async (req, res) => {

  const url = "https://www.redtube.com/103853771"; //

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    userDataDir: '/var/www/html/tmp',
    headless: true,
    args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-features=Crashpad',
    '--disable-gpu',
    '--disable-background-networking',
    '--disable-default-apps',
    '--disable-extensions',
    '--disable-sync',
    '--disable-translate',
    '--disable-notifications',
    '--disable-popup-blocking',
    '--ignore-certificate-errors'
    ],
  });

  const page = await browser.newPage();
  let result = "";
  try {

    //await page.setViewport({ width: 1400, height: 600 });
    await page.goto(url, { waitUntil: 'networkidle2' });

    await page.waitForSelector('body');  // 

    const pageContent = await page.content();
    const videoUrlRegex = /"format":"mp4","videoUrl":"(.*?)"/;
    const match = pageContent.match(videoUrlRegex);
    if (match && match[1]) {
      const videoUrl = match[1].replace(/\\/g, '');
      await page.goto('https://www.redtube.com' + videoUrl);
      const videoContent = await page.content();
      const startIndex = videoContent.indexOf('[');
      const endIndex = videoContent.lastIndexOf(']');
      const videoContentWithoutHtml = videoContent.substring(startIndex, endIndex + 1);
      console.log(videoContentWithoutHtml);
      //fs.writeFileSync('0.json', JSON.stringify(videoContentWithoutHtml, null, 2));

      result = videoContentWithoutHtml;
    } else {
      result = 'Unable to retrieve video content.';
      console.log('Unable to retrieve video content.');
    }

  } catch (e) {
    console.log(e);
    result = "Error";
  } finally {
    await browser.close();
  }

  return res.send({ result });

});

export default router;
