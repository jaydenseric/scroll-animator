// @ts-check

import { strictEqual } from "node:assert";

import easeInOutCubic from "./easeInOutCubic.mjs";

/**
 * Adds `easeInOutCubic` tests.
 * @param {import("test-director").default} tests Test director.
 */
export default (tests) => {
  tests.add("`easeInOutCubic` at 0.", () => {
    strictEqual(easeInOutCubic(0), 0);
  });

  tests.add("`easeInOutCubic` at 0.25.", () => {
    strictEqual(easeInOutCubic(0.25), 0.0625);
  });

  tests.add("`easeInOutCubic` at 0.5.", () => {
    strictEqual(easeInOutCubic(0.5), 0.5);
  });

  tests.add("`easeInOutCubic` at 0.75.", () => {
    strictEqual(easeInOutCubic(0.75), 0.9375);
  });

  tests.add("`easeInOutCubic` at 1.", () => {
    strictEqual(easeInOutCubic(1), 1);
  });
};
