import assertBundleSize from "./test/assertBundleSize.mjs";

export default (tests) => {
  tests.add("`animateScroll` bundle size.", async () => {
    await assertBundleSize(
      new URL("./animateScroll.mjs", import.meta.url),
      500
    );
  });
};
