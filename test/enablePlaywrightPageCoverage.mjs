// @ts-check

import saveNodeV8Coverage from "./saveNodeV8Coverage.mjs";

/**
 * Enables script coverage for local `.mjs` modules served for use in a
 * Playwright page. After the provided callback succeeds or errors the V8 script
 * coverage result for the served modules is converted to be for the local
 * modules and is saved to the
 * [`NODE_V8_COVERAGE`](https://nodejs.org/dist/latest-v17.x/docs/api/cli.html#node_v8_coveragedir)
 * environment variable directory.
 * @param {import("playwright").Page} page Playwright page.
 * @param {URL} directoryUrl Directory file URL for the served modules, ending
 *   with `/`.
 * @param {URL} originUrl Origin URL for the served modules, ending with `/`.
 * @param {() => void | Promise<void>} callback Runs when the Playwright page
 *   has script coverage enabled.
 */
export default async function enablePlaywrightPageCoverage(
  page,
  directoryUrl,
  originUrl,
  callback
) {
  // Unable to do an `instanceof` check.
  if (typeof page !== "object")
    throw new TypeError(
      "Argument 1 `page` must be a Playwright `Page` instance."
    );

  if (!(directoryUrl instanceof URL))
    throw new TypeError(
      "Argument 2 `servedDirectoryUrl` must be a `URL` instance."
    );

  if (!(originUrl instanceof URL))
    throw new TypeError("Argument 3 `serverOrigin` must be a `URL` instance.");

  if (typeof callback !== "function")
    throw new TypeError("Argument 4 `callback` must be a function.");

  await page.coverage.startJSCoverage();

  try {
    await callback();
  } finally {
    const result = await page.coverage.stopJSCoverage();

    /** @type {typeof result} */
    const extractedResult = [];

    for (const scriptCoverage of result)
      if (scriptCoverage.url.startsWith(originUrl.href))
        extractedResult.push({
          ...scriptCoverage,
          url:
            directoryUrl.href + scriptCoverage.url.slice(originUrl.href.length),
        });

    await saveNodeV8Coverage(extractedResult, "playwright");
  }
}
