import { launch } from 'puppeteer';

(async () => {
  const browser = await launch();
  const page = await browser.newPage();
  await page.goto('https://next-route-puppeteer.vercel.app/');

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
    page.click('a[href="/page"]'),
  ]);

  const h1Content = await page.$eval('h1', (element) => element.textContent);

  if (h1Content === 'PAGE') {
    console.log('PASS');
  } else {
    console.log('FAIL');
  }

  await browser.close();
})();
