// @ts-check

import { throws } from "node:assert";

import playwright from "playwright";
import revertableGlobals from "revertable-globals";
import TestDirector from "test-director";

import animateScroll from "./animateScroll.mjs";
import assertBundleSize from "./test/assertBundleSize.mjs";
import playwrightBrowserNames from "./test/playwrightBrowserNames.mjs";
import testingPlaywrightPage from "./test/testingPlaywrightPage.mjs";

const packageDirectoryUrl = new URL(".", import.meta.url);

/**
 * Adds `animateScroll` tests.
 * @param {import("test-director").default} tests Test director.
 * @param {URL} packageFilesOriginUrl Package files origin URL.
 */
export default (tests, packageFilesOriginUrl) => {
  tests.add("`animateScroll` bundle size.", async () => {
    await assertBundleSize(
      new URL("./animateScroll.mjs", import.meta.url),
      550
    );
  });

  tests.add(
    "`animateScroll` with option `container` not a `Element` instance.",
    () => {
      class Element {}

      const revertGlobals = revertableGlobals({ Element });

      try {
        throws(() => {
          animateScroll({
            // @ts-expect-error Testing invalid.
            container: true,
          });
        }, new TypeError("Option `container` must be a `Element` instance."));
      } finally {
        revertGlobals();
      }
    }
  );

  for (const playwrightBrowserName of playwrightBrowserNames)
    tests.add(
      `\`animateScroll\` within a \`${playwrightBrowserName}\` browser environment.`,
      async () => {
        const browser = await playwright[playwrightBrowserName].launch();

        try {
          const enableCoverage = playwrightBrowserName === "chromium";
          const tests = new TestDirector();

          tests.add(
            "`animateScroll` with option `container` an element, options `targetX` and `targetY` < maximums.",
            async () => {
              await testingPlaywrightPage(
                browser,
                packageDirectoryUrl,
                packageFilesOriginUrl,
                enableCoverage,
                async (page) => {
                  await page.setContent(/* HTML */ `<!DOCTYPE html>
                    <html>
                      <head>
                        <style>
                          #scrolling-element {
                            width: 1000px;
                            height: 1000px;
                            overflow: auto;
                          }

                          #padding {
                            width: 200%;
                            height: 200%;
                          }
                        </style>
                      </head>
                      <body>
                        <div id="scrolling-element">
                          <div id="padding"></div>
                        </div>
                      </body>
                    </html>`);

                  await page.evaluate(async (packageFilesOriginHref) => {
                    /** @type {import("./animateScroll.mjs")} */
                    const { default: animateScroll, durationDefault } =
                      await import(
                        `${packageFilesOriginHref}animateScroll.mjs`
                      );

                    const scrollingElement = /** @type {HTMLDivElement} */ (
                      document.getElementById("scrolling-element")
                    );

                    const targetX = 400;
                    const targetY = 600;

                    animateScroll({
                      container: scrollingElement,
                      targetX,
                      targetY,
                    });

                    await new Promise((resolve) =>
                      setTimeout(
                        resolve,
                        // Half the scroll animation duration.
                        durationDefault / 2
                      )
                    );

                    if (
                      !scrollingElement.scrollLeft ||
                      !scrollingElement.scrollTop
                    )
                      throw new Error(
                        `Should scroll during the scroll animation duration.`
                      );

                    await new Promise((resolve) =>
                      setTimeout(
                        resolve,
                        // The remaining scroll animation duration.
                        durationDefault / 2 +
                          // Extra time for scroll animation end code to run.
                          20
                      )
                    );

                    if (scrollingElement.scrollLeft !== targetX)
                      throw new Error("Incorrect final scroll left position.");

                    if (scrollingElement.scrollTop !== targetY)
                      throw new Error("Incorrect final scroll top position.");
                  }, packageFilesOriginUrl.href);
                }
              );
            }
          );

          tests.add(
            "`animateScroll` with option `container` an element, option `targetX` < maximum.",
            async () => {
              await testingPlaywrightPage(
                browser,
                packageDirectoryUrl,
                packageFilesOriginUrl,
                enableCoverage,
                async (page) => {
                  await page.setContent(/* HTML */ `<!DOCTYPE html>
                    <html>
                      <head>
                        <style>
                          #scrolling-element {
                            width: 1000px;
                            height: 1000px;
                            overflow: auto;
                          }

                          #padding {
                            width: 200%;
                            height: 200%;
                          }
                        </style>
                      </head>
                      <body>
                        <div id="scrolling-element">
                          <div id="padding"></div>
                        </div>
                      </body>
                    </html>`);

                  await page.evaluate(async (packageFilesOriginHref) => {
                    /** @type {import("./animateScroll.mjs")} */
                    const { default: animateScroll, durationDefault } =
                      await import(
                        `${packageFilesOriginHref}animateScroll.mjs`
                      );

                    const scrollingElement = /** @type {HTMLDivElement} */ (
                      document.getElementById("scrolling-element")
                    );

                    // Arbitrary.
                    const scrollTop = 20;

                    scrollingElement.scrollTop = scrollTop;

                    // < the maximum.
                    const targetX = 100;

                    animateScroll({
                      container: scrollingElement,
                      targetX,
                    });

                    await new Promise((resolve) =>
                      setTimeout(
                        resolve,
                        // Half the scroll animation duration.
                        durationDefault / 2
                      )
                    );

                    if (!scrollingElement.scrollLeft)
                      throw new Error(
                        `Should scroll during the scroll animation duration.`
                      );

                    await new Promise((resolve) =>
                      setTimeout(
                        resolve,
                        // The remaining scroll animation duration.
                        durationDefault / 2 +
                          // Extra time for scroll animation end code to run.
                          20
                      )
                    );

                    if (scrollingElement.scrollLeft !== targetX)
                      throw new Error("Incorrect final scroll left position.");

                    if (scrollingElement.scrollTop !== scrollTop)
                      throw new Error("Shouldn’t have scrolled vertically.");
                  }, packageFilesOriginUrl.href);
                }
              );
            }
          );

          tests.add(
            "`animateScroll` with option `container` an element, option `targetX` > maximum.",
            async () => {
              await testingPlaywrightPage(
                browser,
                packageDirectoryUrl,
                packageFilesOriginUrl,
                enableCoverage,
                async (page) => {
                  await page.setContent(/* HTML */ `<!DOCTYPE html>
                    <html>
                      <head>
                        <style>
                          #scrolling-element {
                            width: 1000px;
                            height: 1000px;
                            overflow: auto;
                          }

                          #padding {
                            width: 200%;
                            height: 200%;
                          }
                        </style>
                      </head>
                      <body>
                        <div id="scrolling-element">
                          <div id="padding"></div>
                        </div>
                      </body>
                    </html>`);

                  await page.evaluate(async (packageFilesOriginHref) => {
                    /** @type {import("./animateScroll.mjs")} */
                    const { default: animateScroll, durationDefault } =
                      await import(
                        `${packageFilesOriginHref}animateScroll.mjs`
                      );

                    const scrollingElement = /** @type {HTMLDivElement} */ (
                      document.getElementById("scrolling-element")
                    );

                    // Arbitrary.
                    const scrollTop = 20;

                    scrollingElement.scrollTop = scrollTop;

                    // > the maximum.
                    const targetX = 3000;

                    animateScroll({
                      container: scrollingElement,
                      targetX,
                    });

                    await new Promise((resolve) =>
                      setTimeout(
                        resolve,
                        // Half the scroll animation duration.
                        durationDefault / 2
                      )
                    );

                    if (!scrollingElement.scrollLeft)
                      throw new Error(
                        `Should scroll during the scroll animation duration.`
                      );

                    await new Promise((resolve) =>
                      setTimeout(
                        resolve,
                        // The remaining scroll animation duration.
                        durationDefault / 2 +
                          // Extra time for scroll animation end code to run.
                          20
                      )
                    );

                    if (scrollingElement.scrollLeft !== 1000)
                      throw new Error(
                        "Container should’ve scrolled all the way horizontally."
                      );

                    if (scrollingElement.scrollTop !== scrollTop)
                      throw new Error("Shouldn’t have scrolled vertically.");
                  }, packageFilesOriginUrl.href);
                }
              );
            }
          );

          tests.add(
            "`animateScroll` with option `container` an element, option `targetY` < maximum.",
            async () => {
              await testingPlaywrightPage(
                browser,
                packageDirectoryUrl,
                packageFilesOriginUrl,
                enableCoverage,
                async (page) => {
                  await page.setContent(/* HTML */ `<!DOCTYPE html>
                    <html>
                      <head>
                        <style>
                          #scrolling-element {
                            width: 1000px;
                            height: 1000px;
                            overflow: auto;
                          }

                          #padding {
                            width: 200%;
                            height: 200%;
                          }
                        </style>
                      </head>
                      <body>
                        <div id="scrolling-element">
                          <div id="padding"></div>
                        </div>
                      </body>
                    </html>`);

                  await page.evaluate(async (packageFilesOriginHref) => {
                    /** @type {import("./animateScroll.mjs")} */
                    const { default: animateScroll, durationDefault } =
                      await import(
                        `${packageFilesOriginHref}animateScroll.mjs`
                      );

                    const scrollingElement = /** @type {HTMLDivElement} */ (
                      document.getElementById("scrolling-element")
                    );

                    // Arbitrary.
                    const scrollLeft = 20;

                    scrollingElement.scrollLeft = scrollLeft;

                    // < the maximum.
                    const targetY = 100;

                    animateScroll({
                      container: scrollingElement,
                      targetY,
                    });

                    await new Promise((resolve) =>
                      setTimeout(
                        resolve,
                        // Half the scroll animation duration.
                        durationDefault / 2
                      )
                    );

                    if (!scrollingElement.scrollTop)
                      throw new Error(
                        `Should scroll during the scroll animation duration.`
                      );

                    await new Promise((resolve) =>
                      setTimeout(
                        resolve,
                        // The remaining scroll animation duration.
                        durationDefault / 2 +
                          // Extra time for scroll animation end code to run.
                          20
                      )
                    );

                    if (scrollingElement.scrollLeft !== scrollLeft)
                      throw new Error("Shouldn’t have scrolled horizontally.");

                    if (scrollingElement.scrollTop !== targetY)
                      throw new Error("Incorrect final scroll top position.");
                  }, packageFilesOriginUrl.href);
                }
              );
            }
          );

          tests.add(
            "`animateScroll` with option `container` an element, option `targetY` > maximum.",
            async () => {
              await testingPlaywrightPage(
                browser,
                packageDirectoryUrl,
                packageFilesOriginUrl,
                enableCoverage,
                async (page) => {
                  await page.setContent(/* HTML */ `<!DOCTYPE html>
                    <html>
                      <head>
                        <style>
                          #scrolling-element {
                            width: 1000px;
                            height: 1000px;
                            overflow: auto;
                          }

                          #padding {
                            width: 200%;
                            height: 200%;
                          }
                        </style>
                      </head>
                      <body>
                        <div id="scrolling-element">
                          <div id="padding"></div>
                        </div>
                      </body>
                    </html>`);

                  await page.evaluate(async (packageFilesOriginHref) => {
                    /** @type {import("./animateScroll.mjs")} */
                    const { default: animateScroll, durationDefault } =
                      await import(
                        `${packageFilesOriginHref}animateScroll.mjs`
                      );

                    const scrollingElement = /** @type {HTMLDivElement} */ (
                      document.getElementById("scrolling-element")
                    );

                    // Arbitrary.
                    const scrollLeft = 20;

                    scrollingElement.scrollLeft = scrollLeft;

                    // > the maximum.
                    const targetY = 3000;

                    animateScroll({
                      container: scrollingElement,
                      targetY,
                    });

                    await new Promise((resolve) =>
                      setTimeout(
                        resolve,
                        // Half the scroll animation duration.
                        durationDefault / 2
                      )
                    );

                    if (!scrollingElement.scrollTop)
                      throw new Error(
                        `Should scroll during the scroll animation duration.`
                      );

                    await new Promise((resolve) =>
                      setTimeout(
                        resolve,
                        // The remaining scroll animation duration.
                        durationDefault / 2 +
                          // Extra time for scroll animation end code to run.
                          20
                      )
                    );

                    if (scrollingElement.scrollLeft !== scrollLeft)
                      throw new Error("Shouldn’t have scrolled horizontally.");

                    if (scrollingElement.scrollTop !== 1000)
                      throw new Error(
                        "Container should’ve scrolled to the end vertically."
                      );
                  }, packageFilesOriginUrl.href);
                }
              );
            }
          );

          tests.add(
            "`animateScroll` with option `container` an element, option `targetX` < maximum, option `offsetX` negative.",
            async () => {
              await testingPlaywrightPage(
                browser,
                packageDirectoryUrl,
                packageFilesOriginUrl,
                enableCoverage,
                async (page) => {
                  await page.setContent(/* HTML */ `<!DOCTYPE html>
                    <html>
                      <head>
                        <style>
                          #scrolling-element {
                            width: 1000px;
                            height: 1000px;
                            overflow: auto;
                          }

                          #padding {
                            width: 200%;
                            height: 200%;
                          }
                        </style>
                      </head>
                      <body>
                        <div id="scrolling-element">
                          <div id="padding"></div>
                        </div>
                      </body>
                    </html>`);

                  await page.evaluate(async (packageFilesOriginHref) => {
                    /** @type {import("./animateScroll.mjs")} */
                    const { default: animateScroll, durationDefault } =
                      await import(
                        `${packageFilesOriginHref}animateScroll.mjs`
                      );

                    const scrollingElement = /** @type {HTMLDivElement} */ (
                      document.getElementById("scrolling-element")
                    );

                    // Arbitrary.
                    const scrollTop = 20;

                    scrollingElement.scrollTop = scrollTop;

                    // < the maximum.
                    const targetX = 100;

                    // Negative.
                    const offsetX = -10;

                    animateScroll({
                      container: scrollingElement,
                      targetX,
                      offsetX,
                    });

                    await new Promise((resolve) =>
                      setTimeout(
                        resolve,
                        // Half the scroll animation duration.
                        durationDefault / 2
                      )
                    );

                    if (!scrollingElement.scrollLeft)
                      throw new Error(
                        `Should scroll during the scroll animation duration.`
                      );

                    await new Promise((resolve) =>
                      setTimeout(
                        resolve,
                        // The remaining scroll animation duration.
                        durationDefault / 2 +
                          // Extra time for scroll animation end code to run.
                          20
                      )
                    );

                    if (scrollingElement.scrollLeft !== targetX + offsetX)
                      throw new Error("Incorrect final scroll left position.");

                    if (scrollingElement.scrollTop !== scrollTop)
                      throw new Error("Shouldn’t have scrolled vertically.");
                  }, packageFilesOriginUrl.href);
                }
              );
            }
          );

          tests.add(
            "`animateScroll` with option `container` an element, option `targetX` < maximum, option `offsetX` positive.",
            async () => {
              await testingPlaywrightPage(
                browser,
                packageDirectoryUrl,
                packageFilesOriginUrl,
                enableCoverage,
                async (page) => {
                  await page.setContent(/* HTML */ `<!DOCTYPE html>
                    <html>
                      <head>
                        <style>
                          #scrolling-element {
                            width: 1000px;
                            height: 1000px;
                            overflow: auto;
                          }

                          #padding {
                            width: 200%;
                            height: 200%;
                          }
                        </style>
                      </head>
                      <body>
                        <div id="scrolling-element">
                          <div id="padding"></div>
                        </div>
                      </body>
                    </html>`);

                  await page.evaluate(async (packageFilesOriginHref) => {
                    /** @type {import("./animateScroll.mjs")} */
                    const { default: animateScroll, durationDefault } =
                      await import(
                        `${packageFilesOriginHref}animateScroll.mjs`
                      );

                    const scrollingElement = /** @type {HTMLDivElement} */ (
                      document.getElementById("scrolling-element")
                    );

                    // Arbitrary.
                    const scrollTop = 20;

                    scrollingElement.scrollTop = scrollTop;

                    // < the maximum, when the offset is added.
                    const targetX = 100;

                    // Positive.
                    const offsetX = 10;

                    animateScroll({
                      container: scrollingElement,
                      targetX,
                      offsetX,
                    });

                    await new Promise((resolve) =>
                      setTimeout(
                        resolve,
                        // Half the scroll animation duration.
                        durationDefault / 2
                      )
                    );

                    if (!scrollingElement.scrollLeft)
                      throw new Error(
                        `Should scroll during the scroll animation duration.`
                      );

                    await new Promise((resolve) =>
                      setTimeout(
                        resolve,
                        // The remaining scroll animation duration.
                        durationDefault / 2 +
                          // Extra time for scroll animation end code to run.
                          20
                      )
                    );

                    if (scrollingElement.scrollLeft !== targetX + offsetX)
                      throw new Error("Incorrect final scroll left position.");

                    if (scrollingElement.scrollTop !== scrollTop)
                      throw new Error("Shouldn’t have scrolled vertically.");
                  }, packageFilesOriginUrl.href);
                }
              );
            }
          );

          tests.add(
            "`animateScroll` with option `container` an element, option `targetX` > maximum, option `offsetX` negative.",
            async () => {
              await testingPlaywrightPage(
                browser,
                packageDirectoryUrl,
                packageFilesOriginUrl,
                enableCoverage,
                async (page) => {
                  await page.setContent(/* HTML */ `<!DOCTYPE html>
                    <html>
                      <head>
                        <style>
                          #scrolling-element {
                            width: 1000px;
                            height: 1000px;
                            overflow: auto;
                          }

                          #padding {
                            width: 200%;
                            height: 200%;
                          }
                        </style>
                      </head>
                      <body>
                        <div id="scrolling-element">
                          <div id="padding"></div>
                        </div>
                      </body>
                    </html>`);

                  await page.evaluate(async (packageFilesOriginHref) => {
                    /** @type {import("./animateScroll.mjs")} */
                    const { default: animateScroll, durationDefault } =
                      await import(
                        `${packageFilesOriginHref}animateScroll.mjs`
                      );

                    const scrollingElement = /** @type {HTMLDivElement} */ (
                      document.getElementById("scrolling-element")
                    );

                    // Arbitrary.
                    const scrollTop = 20;

                    scrollingElement.scrollTop = scrollTop;

                    // > the maximum.
                    const targetX = 1100;

                    // Negative enough for the final scroll position to be > 0
                    // but < the maximum.
                    const offsetX = -200;

                    animateScroll({
                      container: scrollingElement,
                      targetX,
                      offsetX,
                    });

                    await new Promise((resolve) =>
                      setTimeout(
                        resolve,
                        // Half the scroll animation duration.
                        durationDefault / 2
                      )
                    );

                    if (!scrollingElement.scrollLeft)
                      throw new Error(
                        `Should scroll during the scroll animation duration.`
                      );

                    await new Promise((resolve) =>
                      setTimeout(
                        resolve,
                        // The remaining scroll animation duration.
                        durationDefault / 2 +
                          // Extra time for scroll animation end code to run.
                          20
                      )
                    );

                    if (scrollingElement.scrollLeft !== targetX + offsetX)
                      throw new Error("Incorrect final scroll left position.");

                    if (scrollingElement.scrollTop !== scrollTop)
                      throw new Error("Shouldn’t have scrolled vertically.");
                  }, packageFilesOriginUrl.href);
                }
              );
            }
          );

          tests.add(
            "`animateScroll` with option `container` an element, option `targetY` < maximum, option `offsetY` negative.",
            async () => {
              await testingPlaywrightPage(
                browser,
                packageDirectoryUrl,
                packageFilesOriginUrl,
                enableCoverage,
                async (page) => {
                  await page.setContent(/* HTML */ `<!DOCTYPE html>
                    <html>
                      <head>
                        <style>
                          #scrolling-element {
                            width: 1000px;
                            height: 1000px;
                            overflow: auto;
                          }

                          #padding {
                            width: 200%;
                            height: 200%;
                          }
                        </style>
                      </head>
                      <body>
                        <div id="scrolling-element">
                          <div id="padding"></div>
                        </div>
                      </body>
                    </html>`);

                  await page.evaluate(async (packageFilesOriginHref) => {
                    /** @type {import("./animateScroll.mjs")} */
                    const { default: animateScroll, durationDefault } =
                      await import(
                        `${packageFilesOriginHref}animateScroll.mjs`
                      );

                    const scrollingElement = /** @type {HTMLDivElement} */ (
                      document.getElementById("scrolling-element")
                    );

                    // Arbitrary.
                    const scrollLeft = 20;

                    scrollingElement.scrollLeft = scrollLeft;

                    // < the maximum.
                    const targetY = 100;

                    // Negative.
                    const offsetY = -10;

                    animateScroll({
                      container: scrollingElement,
                      targetY,
                      offsetY,
                    });

                    await new Promise((resolve) =>
                      setTimeout(
                        resolve,
                        // Half the scroll animation duration.
                        durationDefault / 2
                      )
                    );

                    if (!scrollingElement.scrollTop)
                      throw new Error(
                        `Should scroll during the scroll animation duration.`
                      );

                    await new Promise((resolve) =>
                      setTimeout(
                        resolve,
                        // The remaining scroll animation duration.
                        durationDefault / 2 +
                          // Extra time for scroll animation end code to run.
                          20
                      )
                    );

                    if (scrollingElement.scrollLeft !== scrollLeft)
                      throw new Error(
                        "Container  shouldn’t have scrolled horizontally."
                      );

                    if (scrollingElement.scrollTop !== targetY + offsetY)
                      throw new Error("Incorrect final scroll top position.");
                  }, packageFilesOriginUrl.href);
                }
              );
            }
          );

          tests.add(
            "`animateScroll` with option `container` an element, option `targetY` < maximum, option `offsetY` positive.",
            async () => {
              await testingPlaywrightPage(
                browser,
                packageDirectoryUrl,
                packageFilesOriginUrl,
                enableCoverage,
                async (page) => {
                  await page.setContent(/* HTML */ `<!DOCTYPE html>
                    <html>
                      <head>
                        <style>
                          #scrolling-element {
                            width: 1000px;
                            height: 1000px;
                            overflow: auto;
                          }

                          #padding {
                            width: 200%;
                            height: 200%;
                          }
                        </style>
                      </head>
                      <body>
                        <div id="scrolling-element">
                          <div id="padding"></div>
                        </div>
                      </body>
                    </html>`);

                  await page.evaluate(async (packageFilesOriginHref) => {
                    /** @type {import("./animateScroll.mjs")} */
                    const { default: animateScroll, durationDefault } =
                      await import(
                        `${packageFilesOriginHref}animateScroll.mjs`
                      );

                    const scrollingElement = /** @type {HTMLDivElement} */ (
                      document.getElementById("scrolling-element")
                    );

                    // Arbitrary.
                    const scrollLeft = 20;

                    scrollingElement.scrollLeft = scrollLeft;

                    // < the maximum.
                    const targetY = 100;

                    // Positive.
                    const offsetY = 10;

                    animateScroll({
                      container: scrollingElement,
                      targetY,
                      offsetY,
                    });

                    await new Promise((resolve) =>
                      setTimeout(
                        resolve,
                        // Half the scroll animation duration.
                        durationDefault / 2
                      )
                    );

                    if (!scrollingElement.scrollTop)
                      throw new Error(
                        `Should scroll during the scroll animation duration.`
                      );

                    await new Promise((resolve) =>
                      setTimeout(
                        resolve,
                        // The remaining scroll animation duration.
                        durationDefault / 2 +
                          // Extra time for scroll animation end code to run.
                          20
                      )
                    );

                    if (scrollingElement.scrollLeft !== scrollLeft)
                      throw new Error("Shouldn’t have scrolled horizontally.");

                    if (scrollingElement.scrollTop !== targetY + offsetY)
                      throw new Error("Incorrect final scroll top position.");
                  }, packageFilesOriginUrl.href);
                }
              );
            }
          );

          tests.add(
            "`animateScroll` with option `container` an element, option `targetY` > maximum, option `offsetY` negative.",
            async () => {
              await testingPlaywrightPage(
                browser,
                packageDirectoryUrl,
                packageFilesOriginUrl,
                enableCoverage,
                async (page) => {
                  await page.setContent(/* HTML */ `<!DOCTYPE html>
                    <html>
                      <head>
                        <style>
                          #scrolling-element {
                            width: 1000px;
                            height: 1000px;
                            overflow: auto;
                          }

                          #padding {
                            width: 200%;
                            height: 200%;
                          }
                        </style>
                      </head>
                      <body>
                        <div id="scrolling-element">
                          <div id="padding"></div>
                        </div>
                      </body>
                    </html>`);

                  await page.evaluate(async (packageFilesOriginHref) => {
                    /** @type {import("./animateScroll.mjs")} */
                    const { default: animateScroll, durationDefault } =
                      await import(
                        `${packageFilesOriginHref}animateScroll.mjs`
                      );

                    const scrollingElement = /** @type {HTMLDivElement} */ (
                      document.getElementById("scrolling-element")
                    );

                    // Arbitrary.
                    const scrollLeft = 20;

                    scrollingElement.scrollLeft = scrollLeft;

                    // > the maximum.
                    const targetY = 1100;

                    // Negative enough for the final scroll position to be > 0
                    // but < the maximum.
                    const offsetY = -200;

                    animateScroll({
                      container: scrollingElement,
                      targetY,
                      offsetY,
                    });

                    await new Promise((resolve) =>
                      setTimeout(
                        resolve,
                        // Half the scroll animation duration.
                        durationDefault / 2
                      )
                    );

                    if (!scrollingElement.scrollTop)
                      throw new Error(
                        `Should scroll during the scroll animation duration.`
                      );

                    await new Promise((resolve) =>
                      setTimeout(
                        resolve,
                        // The remaining scroll animation duration.
                        durationDefault / 2 +
                          // Extra time for scroll animation end code to run.
                          20
                      )
                    );

                    if (scrollingElement.scrollLeft !== scrollLeft)
                      throw new Error("Shouldn’t have scrolled horizontally.");

                    if (scrollingElement.scrollTop !== targetY + offsetY)
                      throw new Error("Incorrect final scroll top position.");
                  }, packageFilesOriginUrl.href);
                }
              );
            }
          );

          tests.add("`animateScroll` with option `onArrive`.", async () => {
            await testingPlaywrightPage(
              browser,
              packageDirectoryUrl,
              packageFilesOriginUrl,
              enableCoverage,
              async (page) => {
                await page.setContent(/* HTML */ `<!DOCTYPE html>
                  <html>
                    <head>
                      <style>
                        #scrolling-element {
                          width: 1000px;
                          height: 1000px;
                          overflow: auto;
                        }

                        #padding {
                          width: 200%;
                          height: 200%;
                        }
                      </style>
                    </head>
                    <body>
                      <div id="scrolling-element">
                        <div id="padding"></div>
                      </div>
                    </body>
                  </html>`);

                await page.evaluate(async (packageFilesOriginHref) => {
                  /** @type {import("./animateScroll.mjs")} */
                  const { default: animateScroll, durationDefault } =
                    await import(`${packageFilesOriginHref}animateScroll.mjs`);

                  const scrollingElement = /** @type {HTMLDivElement} */ (
                    document.getElementById("scrolling-element")
                  );

                  const targetX = 400;
                  const targetY = 600;

                  let onArriveCalls = 0;

                  animateScroll({
                    container: scrollingElement,
                    targetX,
                    targetY,
                    onArrive(...args) {
                      onArriveCalls++;

                      if (args.length)
                        throw new Error(
                          "`animateScroll` option `onArrive` shouldn’t have arguments."
                        );
                    },
                  });

                  await new Promise((resolve) =>
                    setTimeout(
                      resolve,
                      // Half the scroll animation duration.
                      durationDefault / 2
                    )
                  );

                  if (
                    !scrollingElement.scrollLeft ||
                    !scrollingElement.scrollTop
                  )
                    throw new Error(
                      `Should scroll during the scroll animation duration.`
                    );

                  if (onArriveCalls)
                    throw new Error(
                      "`animateScroll` option `onArrive` shouldn’t be called before the scroll animation finishes."
                    );

                  await new Promise((resolve) =>
                    setTimeout(
                      resolve,
                      // The remaining scroll animation duration.
                      durationDefault / 2 +
                        // Extra time for scroll animation end code to run.
                        20
                    )
                  );

                  if (scrollingElement.scrollLeft !== targetX)
                    throw new Error("Incorrect final scroll left position.");

                  if (scrollingElement.scrollTop !== targetY)
                    throw new Error("Incorrect final scroll top position.");

                  if (onArriveCalls !== 1)
                    throw new Error(
                      "`animateScroll` option `onArrive` should’ve been called once after the scroll animation finishes."
                    );
                }, packageFilesOriginUrl.href);
              }
            );
          });

          tests.add(
            "`animateScroll` with options `onArrive` and `onInterrupt`, scroll animation interruption.",
            async () => {
              await testingPlaywrightPage(
                browser,
                packageDirectoryUrl,
                packageFilesOriginUrl,
                enableCoverage,
                async (page) => {
                  await page.setContent(/* HTML */ `<!DOCTYPE html>
                    <html>
                      <head>
                        <style>
                          #scrolling-element {
                            width: 1000px;
                            height: 1000px;
                            overflow: auto;
                          }

                          #padding {
                            width: 200%;
                            height: 200%;
                          }
                        </style>
                      </head>
                      <body>
                        <div id="scrolling-element">
                          <div id="padding"></div>
                        </div>
                      </body>
                    </html>`);

                  await page.evaluate(async (packageFilesOriginHref) => {
                    /** @type {import("./animateScroll.mjs")} */
                    const { default: animateScroll, durationDefault } =
                      await import(
                        `${packageFilesOriginHref}animateScroll.mjs`
                      );

                    const scrollingElement = /** @type {HTMLDivElement} */ (
                      document.getElementById("scrolling-element")
                    );

                    let onInterruptCalls = 0;

                    animateScroll({
                      container: scrollingElement,
                      targetX: 400,
                      targetY: 600,
                      onArrive() {
                        throw new Error(
                          "`animateScroll` option `onArrive` shouldn’t have run."
                        );
                      },
                      onInterrupt(...args) {
                        onInterruptCalls++;

                        if (args.length)
                          throw new Error(
                            "`animateScroll` option `onInterrupt` shouldn’t have arguments."
                          );
                      },
                    });

                    await new Promise((resolve) =>
                      setTimeout(
                        resolve,
                        // Half the scroll animation duration.
                        durationDefault / 2
                      )
                    );

                    if (
                      !scrollingElement.scrollLeft ||
                      !scrollingElement.scrollTop
                    )
                      throw new Error(
                        `Should scroll during the scroll animation duration.`
                      );

                    if (onInterruptCalls)
                      throw new Error(
                        "`animateScroll` option `onInterrupt` shouldn’t be called before the scroll animation is interrupted."
                      );

                    const interruptScrollLeft = 0;
                    const interruptScrollTop = 0;

                    // Interrupt the scroll animation.
                    scrollingElement.scrollTo(
                      interruptScrollLeft,
                      interruptScrollTop
                    );

                    await new Promise((resolve) =>
                      setTimeout(
                        resolve,
                        // Enough time for the interruption to have been handled.
                        20
                      )
                    );

                    if (
                      scrollingElement.scrollLeft !== interruptScrollLeft ||
                      scrollingElement.scrollTop !== interruptScrollTop
                    )
                      throw new Error(
                        `Shouldn’t scroll after the scroll animation is interrupted.`
                      );

                    if (onInterruptCalls !== 1)
                      throw new Error(
                        "`animateScroll` option `onInterrupt` should’ve been called once after the scroll animation was interrupted."
                      );
                  }, packageFilesOriginUrl.href);
                }
              );
            }
          );

          await tests.run(true);
        } finally {
          await browser.close();
        }
      }
    );
};
