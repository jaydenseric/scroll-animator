// @ts-check

import { deepStrictEqual } from "node:assert";

import enablePlaywrightPageCoverage from "./enablePlaywrightPageCoverage.mjs";

/**
 * Creates a new Playwright page for testing served package files with script
 * coverage enabled, if supported by the Playwright browser.
 * @param {import("playwright").Browser} browser Playwright browser.
 * @param {URL} packageDirectoryUrl Package directory URL.
 * @param {URL} packageFilesOriginUrl Package files origin URL.
 * @param {boolean} enableCoverage Enable script coverage.
 * @param {(page: import("playwright").Page) => void | Promise<void>} callback
 *   Receives the Playwright page, ready for testing.
 */
export default async function testingPlaywrightPage(
  browser,
  packageDirectoryUrl,
  packageFilesOriginUrl,
  enableCoverage,
  callback
) {
  // Unable to do an `instanceof` check.
  if (typeof browser !== "object")
    throw new TypeError(
      "Argument 1 `browser` must be a Playwright `Browser` instance."
    );

  if (!(packageDirectoryUrl instanceof URL))
    throw new TypeError(
      "Argument 2 `packageDirectoryUrl` must be a `URL` instance."
    );

  if (!(packageFilesOriginUrl instanceof URL))
    throw new TypeError(
      "Argument 3 `packageFilesOriginUrl` must be a `URL` instance."
    );

  if (typeof enableCoverage !== "boolean")
    throw new TypeError("Argument 4 `enableCoverage` must be a boolean.");

  if (typeof callback !== "function")
    throw new TypeError("Argument 5 `callback` must be a function.");

  const browserContext = await browser.newContext();
  const page = await browserContext.newPage();

  try {
    /** @type {Array<Error>} */
    const pageErrors = [];

    page.on("pageerror", (error) => {
      pageErrors.push(error);
    });

    page.on("console", async (message) => {
      console.group(`Playwright page console ${message.type()}:`);
      console.log(message.text());
      console.groupEnd();
    });

    if (enableCoverage)
      await enablePlaywrightPageCoverage(
        page,
        packageDirectoryUrl,
        packageFilesOriginUrl,
        () => callback(page)
      );
    else await callback(page);

    deepStrictEqual(pageErrors, []);
  } finally {
    await browserContext.close();
  }
}
