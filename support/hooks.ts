import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Page, BrowserContext } from "@playwright/test";
import { POManager } from "../pages/POManager";

declare module "@cucumber/cucumber" {
  interface World {
    context: BrowserContext;
    page: Page;
    poManager: POManager;
  }
}
// Set Cucumber's default step timeout globally (before any hooks/steps run)
setDefaultTimeout(60 * 1000);

Before(async function () {
  const browser = await chromium.launch({ headless: false });
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
  // Make Playwright page actions more tolerant (30s)
  this.page.setDefaultTimeout(30 * 1000);
  this.poManager = new POManager(this.page);
});

// Clean up after tests
// After(async function () {
//   if (this.page) await this.page.close();
//   if (this.context) await this.context.close();
// });
