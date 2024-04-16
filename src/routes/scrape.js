import { Router } from 'express';

const puppeteer = require('puppeteer');
const fs = require('fs');

const router = Router();

router.get('/', async (req, res) => {

  const url = "https://api.ipify.org";

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/google-chrome',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });

  const page = await browser.newPage();

  try {

    await page.setViewport({ width: 1400, height: 600 });
    await page.goto(url, { waitUntil: 'networkidle2' });

    await page.waitForSelector('pre');

    const ipAddress = await page.$eval('pre', el => el.innerText);

    const data = { ip: ipAddress };
    //fs.writeFileSync('0.json', JSON.stringify(data, null, 2));

    console.log('IP:', ipAddress);
    return res.send({ result: ipAddress});

  } catch (e) {
    console.log(e);
  } finally {
    await browser.close();
    return res.send({ result: "Error"});
  }

});

export default router;
