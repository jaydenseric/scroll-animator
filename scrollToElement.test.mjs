import assertBundleSize from "./test/assertBundleSize.mjs";

export default (tests) => {
  tests.add("`scrollToElement` bundle size.", async () => {
    await assertBundleSize(
      new URL("./scrollToElement.mjs", import.meta.url),
      650
    );
  });
};
