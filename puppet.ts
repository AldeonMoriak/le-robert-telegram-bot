import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";

const BROWSERLESS_TOKEN = Deno.env.get("BROWSERLESS_TOKEN");
if (BROWSERLESS_TOKEN === undefined) {
  throw new TypeError("Missing BROWSERLESS_TOKEN environment variable.");
}

export async function getScreenshot(word: string) {
  const browser = await puppeteer.connect({
    browserWSEndpoint: `wss://chrome.browserless.io?token=${BROWSERLESS_TOKEN}`,
  });
  try {
    const page = await browser.newPage();
    await page.goto(`https://dictionnaire.lerobert.com/definition/${word}`, {
      waitUntil: "domcontentloaded",
    });
    const closeButton = await page.waitForSelector(
      "#onetrust-close-btn-container > button",
      { timeout: 0 },
    );
    await closeButton?.click();
    const main = await page.waitForSelector("main");
    const image = await main!.screenshot() as Uint8Array;
    return { res: image };
  } catch(error) {
    console.error(JSON.stringify(error, null, 2));
  } finally {
    await browser.close();
  }
}
