// @ts-check

import assertBundleSize from "./test/assertBundleSize.mjs";

/**
 * Adds `scrollToElement` tests.
 * @param {import("test-director").default} tests Test director.
 */
export default (tests) => {
  tests.add("`scrollToElement` bundle size.", async () => {
    await assertBundleSize(
      new URL("./scrollToElement.mjs", import.meta.url),
      750
    );
  });
};
