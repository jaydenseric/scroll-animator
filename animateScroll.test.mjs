// @ts-check

import { throws } from "node:assert";

import revertableGlobals from "revertable-globals";

import animateScroll from "./animateScroll.mjs";
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
};
