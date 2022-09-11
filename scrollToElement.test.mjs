// @ts-check

import { throws } from "node:assert";

import playwright from "playwright";
import revertableGlobals from "revertable-globals";
import TestDirector from "test-director";

import scrollToElement from "./scrollToElement.mjs";
import assertBundleSize from "./test/assertBundleSize.mjs";
import playwrightBrowserNames from "./test/playwrightBrowserNames.mjs";
import testingPlaywrightPage from "./test/testingPlaywrightPage.mjs";

const packageDirectoryUrl = new URL(".", import.meta.url);

/**
 * Adds `scrollToElement` tests.
 * @param {import("test-director").default} tests Test director.
 * @param {URL} packageFilesOriginUrl Package files origin URL.
 */
export default (tests, packageFilesOriginUrl) => {
  tests.add("`scrollToElement` bundle size.", async () => {
    await assertBundleSize(
      new URL("./scrollToElement.mjs", import.meta.url),
      750
    );
  });

  tests.add(
    "`scrollToElement` with option `target` not a `Element` instance.",
    () => {
      class Element {}

      const revertGlobals = revertableGlobals({
        document: {
          scrollingElement: new Element(),
        },
        Element,
      });

      try {
        throws(() => {
          scrollToElement({
            // @ts-expect-error Testing invalid.
            target: true,
          });
        }, new TypeError("Option `target` must be a `Element` instance."));
      } finally {
        revertGlobals();
      }
    }
  );

  tests.add(
    "`scrollToElement` with option `container` not a `Element` instance.",
    () => {
      class Element {}

      const revertGlobals = revertableGlobals({ Element });

      try {
        throws(() => {
          scrollToElement({
            target: /** @type {globalThis.Element} */ (new Element()),
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
      `\`scrollToElement\` within a \`${playwrightBrowserName}\` browser environment.`,
      async () => {
        const browser = await playwright[playwrightBrowserName].launch();

        try {
          const enableCoverage = playwrightBrowserName === "chromium";
          const tests = new TestDirector();

          tests.add("`scrollToElement` with defaults.", async () => {
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
                        body {
                          margin: 0;
                        }

                        #padding {
                          padding: 200vh 200vw;
                        }

                        #target {
                          width: 1px;
                          height: 1px;
                        }
                      </style>
                    </head>
                    <body>
                      <div id="padding">
                        <div id="target"></div>
                      </div>
                    </body>
                  </html>`);

                await page.evaluate(async (packageFilesOriginHref) => {
                  /** @type {import("./scrollToElement.mjs")} */
                  const { default: scrollToElement, durationDefault } =
                    await import(
                      `${packageFilesOriginHref}scrollToElement.mjs`
                    );

                  const scrollingElement = /** @type {Element} */ (
                    document.scrollingElement
                  );
                  const targetElement = /** @type {HTMLDivElement} */ (
                    document.getElementById("target")
                  );

                  scrollToElement({ target: targetElement });

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

                  const targetBounds = targetElement.getBoundingClientRect();

                  if (targetBounds.left !== 0)
                    throw new Error(
                      "Container should’ve scrolled to the target horizontally."
                    );

                  if (targetBounds.top !== 0)
                    throw new Error(
                      "Container should’ve scrolled to the target vertically."
                    );
                }, packageFilesOriginUrl.href);
              }
            );
          });

          tests.add("`scrollToElement` with option `container`.", async () => {
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
                        body {
                          margin: 0;
                        }

                        #scrolling-element {
                          width: 100vw;
                          height: 100vh;
                          overflow: auto;
                        }

                        #padding {
                          padding: 200vh 200vw;
                        }

                        #target {
                          width: 1px;
                          height: 1px;
                        }
                      </style>
                    </head>
                    <body>
                      <div id="scrolling-element">
                        <div id="padding">
                          <div id="target"></div>
                        </div>
                      </div>
                    </body>
                  </html>`);

                await page.evaluate(async (packageFilesOriginHref) => {
                  /** @type {import("./scrollToElement.mjs")} */
                  const { default: scrollToElement, durationDefault } =
                    await import(
                      `${packageFilesOriginHref}scrollToElement.mjs`
                    );

                  const scrollingElement = /** @type {HTMLDivElement} */ (
                    document.getElementById("scrolling-element")
                  );
                  const targetElement = /** @type {HTMLDivElement} */ (
                    document.getElementById("target")
                  );

                  scrollToElement({
                    container: scrollingElement,
                    target: targetElement,
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

                  const targetBounds = targetElement.getBoundingClientRect();

                  if (targetBounds.left !== 0)
                    throw new Error(
                      "Container should’ve scrolled to the target horizontally."
                    );

                  if (targetBounds.top !== 0)
                    throw new Error(
                      "Container should’ve scrolled to the target vertically."
                    );
                }, packageFilesOriginUrl.href);
              }
            );
          });

          tests.add("`scrollToElement` with option `duration`.", async () => {
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
                        body {
                          margin: 0;
                        }

                        #padding {
                          padding: 200vh 200vw;
                        }

                        #target {
                          width: 1px;
                          height: 1px;
                        }
                      </style>
                    </head>
                    <body>
                      <div id="padding">
                        <div id="target"></div>
                      </div>
                    </body>
                  </html>`);

                await page.evaluate(async (packageFilesOriginHref) => {
                  /** @type {import("./scrollToElement.mjs")} */
                  const { default: scrollToElement } = await import(
                    `${packageFilesOriginHref}scrollToElement.mjs`
                  );

                  const scrollAnimationDuration = 250;
                  const scrollingElement = /** @type {Element} */ (
                    document.scrollingElement
                  );
                  const targetElement = /** @type {HTMLDivElement} */ (
                    document.getElementById("target")
                  );

                  scrollToElement({
                    target: targetElement,
                    duration: scrollAnimationDuration,
                  });

                  await new Promise((resolve) =>
                    setTimeout(
                      resolve,
                      // Half the scroll animation duration.
                      scrollAnimationDuration / 2
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
                      scrollAnimationDuration / 2 +
                        // Extra time for scroll animation end code to run.
                        20
                    )
                  );

                  const targetBounds = targetElement.getBoundingClientRect();

                  if (targetBounds.left !== 0)
                    throw new Error(
                      "Container should’ve scrolled to the target horizontally."
                    );

                  if (targetBounds.top !== 0)
                    throw new Error(
                      "Container should’ve scrolled to the target vertically."
                    );
                }, packageFilesOriginUrl.href);
              }
            );
          });

          tests.add(
            "`scrollToElement` with options `offsetX` and `offsetY`.",
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
                          body {
                            margin: 0;
                          }

                          #padding {
                            padding: 200vh 200vw;
                          }

                          #target {
                            width: 1px;
                            height: 1px;
                          }
                        </style>
                      </head>
                      <body>
                        <div id="padding">
                          <div id="target"></div>
                        </div>
                      </body>
                    </html>`);

                  await page.evaluate(async (packageFilesOriginHref) => {
                    /** @type {import("./scrollToElement.mjs")} */
                    const { default: scrollToElement, durationDefault } =
                      await import(
                        `${packageFilesOriginHref}scrollToElement.mjs`
                      );

                    const scrollingElement = /** @type {Element} */ (
                      document.scrollingElement
                    );
                    const targetElement = /** @type {HTMLDivElement} */ (
                      document.getElementById("target")
                    );
                    const offsetX = 50;
                    const offsetY = 60;

                    scrollToElement({
                      target: targetElement,
                      offsetX,
                      offsetY,
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

                    const targetBounds = targetElement.getBoundingClientRect();

                    if (targetBounds.left !== -offsetX)
                      throw new Error(
                        "Container should’ve scrolled to the target horizontally."
                      );

                    if (targetBounds.top !== -offsetY)
                      throw new Error(
                        "Container should’ve scrolled to the target vertically."
                      );
                  }, packageFilesOriginUrl.href);
                }
              );
            }
          );

          tests.add(
            "`scrollToElement` with option `onArrive`, non shifting target.",
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
                          body {
                            margin: 0;
                          }

                          #padding {
                            padding: 200vh 200vw;
                          }

                          #target {
                            width: 1px;
                            height: 1px;
                          }
                        </style>
                      </head>
                      <body>
                        <div id="padding">
                          <div id="target"></div>
                        </div>
                      </body>
                    </html>`);

                  await page.evaluate(async (packageFilesOriginHref) => {
                    /** @type {import("./scrollToElement.mjs")} */
                    const { default: scrollToElement, durationDefault } =
                      await import(
                        `${packageFilesOriginHref}scrollToElement.mjs`
                      );

                    const scrollingElement = /** @type {Element} */ (
                      document.scrollingElement
                    );
                    const targetElement = /** @type {HTMLDivElement} */ (
                      document.getElementById("target")
                    );

                    let onArriveCalls = 0;

                    scrollToElement({
                      target: targetElement,
                      onArrive(...args) {
                        onArriveCalls++;

                        if (args.length)
                          throw new Error(
                            "`scrollToElement` option `onArrive` shouldn’t have arguments."
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
                        "`scrollToElement` option `onArrive` shouldn’t be called before the scroll animation finishes."
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

                    const targetBounds = targetElement.getBoundingClientRect();

                    if (targetBounds.left !== 0)
                      throw new Error(
                        "Container should’ve scrolled to the target horizontally."
                      );

                    if (targetBounds.top !== 0)
                      throw new Error(
                        "Container should’ve scrolled to the target vertically."
                      );

                    if (onArriveCalls !== 1)
                      throw new Error(
                        "`scrollToElement` option `onArrive` should’ve been called once after the scroll animation finishes."
                      );
                  }, packageFilesOriginUrl.href);
                }
              );
            }
          );

          tests.add(
            "`scrollToElement` with option `onArrive`, shifting target.",
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
                          body {
                            margin: 0;
                          }

                          #padding {
                            padding: 200vh 200vw;
                          }

                          #target {
                            width: 1px;
                            height: 1px;
                          }
                        </style>
                      </head>
                      <body>
                        <div id="padding">
                          <div id="target"></div>
                        </div>
                      </body>
                    </html>`);

                  await page.evaluate(async (packageFilesOriginHref) => {
                    /** @type {import("./scrollToElement.mjs")} */
                    const { default: scrollToElement, durationDefault } =
                      await import(
                        `${packageFilesOriginHref}scrollToElement.mjs`
                      );

                    const scrollingElement = /** @type {Element} */ (
                      document.scrollingElement
                    );
                    const paddingElement = /** @type {HTMLDivElement} */ (
                      document.getElementById("padding")
                    );
                    const targetElement = /** @type {HTMLDivElement} */ (
                      document.getElementById("target")
                    );

                    let onArriveCalls = 0;

                    scrollToElement({
                      target: targetElement,
                      onArrive(...args) {
                        onArriveCalls++;

                        if (args.length)
                          throw new Error(
                            "`scrollToElement` option `onArrive` shouldn’t have arguments."
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
                        "`scrollToElement` option `onArrive` shouldn’t be called before the scroll animation finishes."
                      );

                    // Shift the target element.
                    paddingElement.style.padding = "400vh 400vw";

                    await new Promise((resolve) =>
                      setTimeout(
                        resolve,
                        // The remaining scroll animation duration.
                        durationDefault / 2 +
                          // Extra time for scroll animation end code to run.
                          20
                      )
                    );

                    if (onArriveCalls)
                      throw new Error(
                        "`scrollToElement` option `onArrive` shouldn’t be called before the second scroll animation finishes."
                      );

                    await new Promise((resolve) =>
                      setTimeout(
                        resolve,
                        // The remaining scroll animation duration.
                        durationDefault +
                          // Extra time for scroll animation end code to run.
                          20
                      )
                    );

                    const targetBounds = targetElement.getBoundingClientRect();

                    if (targetBounds.left !== 0)
                      throw new Error(
                        "Container should’ve scrolled to the target horizontally."
                      );

                    if (targetBounds.top !== 0)
                      throw new Error(
                        "Container should’ve scrolled to the target vertically."
                      );

                    if (onArriveCalls !== 1)
                      throw new Error(
                        "`scrollToElement` option `onArrive` should’ve been called once after the scroll animation finishes."
                      );
                  }, packageFilesOriginUrl.href);
                }
              );
            }
          );

          tests.add(
            "`scrollToElement` with options `onArrive` and `onInterrupt`, scroll animation interruption.",
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
                          body {
                            margin: 0;
                          }

                          #padding {
                            padding: 200vh 200vw;
                          }

                          #target {
                            width: 1px;
                            height: 1px;
                          }
                        </style>
                      </head>
                      <body>
                        <div id="padding">
                          <div id="target"></div>
                        </div>
                      </body>
                    </html>`);

                  await page.evaluate(async (packageFilesOriginHref) => {
                    /** @type {import("./scrollToElement.mjs")} */
                    const { default: scrollToElement, durationDefault } =
                      await import(
                        `${packageFilesOriginHref}scrollToElement.mjs`
                      );

                    const scrollingElement = /** @type {Element} */ (
                      document.scrollingElement
                    );
                    const targetElement = /** @type {HTMLDivElement} */ (
                      document.getElementById("target")
                    );

                    let onInterruptCalls = 0;

                    scrollToElement({
                      target: targetElement,
                      onArrive() {
                        throw new Error(
                          "`scrollToElement` option `onArrive` shouldn’t have run."
                        );
                      },
                      onInterrupt(...args) {
                        onInterruptCalls++;

                        if (args.length)
                          throw new Error(
                            "`scrollToElement` option `onInterrupt` shouldn’t have arguments."
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
                        "`scrollToElement` option `onInterrupt` shouldn’t be called before the scroll animation is interrupted."
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
                        "`scrollToElement` option `onInterrupt` should’ve been called once after the scroll animation was interrupted."
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
