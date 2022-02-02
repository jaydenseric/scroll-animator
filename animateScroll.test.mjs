// @ts-check

import assertBundleSize from "./test/assertBundleSize.mjs";

/**
 * Adds `animateScroll` tests.
 * @param {import("test-director").default} tests Test director.
 */
export default (tests) => {
  tests.add("`animateScroll` bundle size.", async () => {
    await assertBundleSize(
      new URL("./animateScroll.mjs", import.meta.url),
      550
    );
  });
};
