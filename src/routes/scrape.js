import { Router } from 'express';

const puppeteer = require('puppeteer');
const fs = require('fs');
const { SocksProxyAgent } = require('socks-proxy-agent');

const router = Router();

router.get('/', async (req, res) => {

  const url = "https://www.redtube.com/103853771"; //

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
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
    '--ignore-certificate-errors',
    '--start-fullscreen',
    '--disable-session-crashed-bubble',
    '--disable-infobars',
    ],
  });

  const page = await browser.newPage();

  const username = 'johndoe';
  const password = 'qwerty1';

  await page.authenticate({
    username,
    password,
  });

  let result = "";
  try {

    const socksServers = 'socks5:// user : pass @ IP : port'; // Specificați serverul SOCKS5

    const targetUrl = 'https://www.redtube.com/21927031'; // URL-ul paginii cu ID-ul specificat

    const agent = new SocksProxyAgent(socksServers); // Crearea agentului SOCKS5

    await page.goto(targetUrl, { agent }); // Navigarea către pagina folosind agentul SOCKS5
    await page.waitForSelector('body');

    const pageContent = await page.content();
    const videoUrlRegex = /"format":"mp4","videoUrl":"(.*?)"/;
    const match = pageContent.match(videoUrlRegex);

    console.log(match);

    if (match && match[1]) {
      const videoUrl = match[1].replace(/\\/g, '');
      await page.goto('https://www.redtube.com' + videoUrl, { agent }); // Navigarea către URL-ul videoclipului folosind agentul SOCKS5

      const videoContent = await page.content();
      const startIndex = videoContent.indexOf('[');
      const endIndex = videoContent.lastIndexOf(']');
      const videoContentWithoutHtml = videoContent.substring(startIndex, endIndex + 1);

      console.log(videoContentWithoutHtml);
      //fs.writeFileSync('0.json', JSON.stringify(videoContentWithoutHtml, null, 2));

      result = videoContentWithoutHtml;
    } else {
      result = 'Unable to retrieve video content  for ID: 21927031.';
      console.log('Unable to retrieve video content  for ID: 21927031.');
    }

  } catch (e) {
    console.log(e);
    result = "Error";
  } finally {
    await browser?.close();
  }

  return res.send({ result });

});

export default router;
