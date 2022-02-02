import assertBundleSize from "../assertBundleSize.mjs";

export default (tests) => {
  tests.add("`animateScroll` bundle size.", async () => {
    await assertBundleSize(
      new URL("../../public/animateScroll.mjs", import.meta.url),
      500
    );
  });
};
