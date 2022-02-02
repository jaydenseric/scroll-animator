import assertBundleSize from "../assertBundleSize.mjs";

export default (tests) => {
  tests.add("`scrollToElement` bundle size.", async () => {
    await assertBundleSize(
      new URL("../../public/scrollToElement.mjs", import.meta.url),
      650
    );
  });
};
