import { Router } from 'express';

const puppeteer = require('puppeteer');
const fs = require('fs');

const router = Router();

router.get('/', async (req, res) => {

  const url = "https://ipinfo.io"; //

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/google-chrome',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });

  const page = await browser.newPage();
  let result = "";
  try {

    await page.setViewport({ width: 1400, height: 600 });
    await page.goto(url, { waitUntil: 'networkidle2' });

    await page.waitForSelector('input.w-full');  // 

    const ipAddress = await page.$eval('input.w-full', el => el.value);

    //const data = { ip: ipAddress };
    //fs.writeFileSync('0.json', JSON.stringify(data, null, 2));

    console.log('IP:', ipAddress);

    await browser.close();

    result = ipAddress + ' From ' + url;

  } catch (e) {
    console.log(e);
    result = "Error";
  } finally {
    await browser.close();
  }

  return res.send({ result });

});

export default router;
