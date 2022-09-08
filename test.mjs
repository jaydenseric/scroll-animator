// @ts-check

import TestDirector from "test-director";

import test_animateScroll from "./animateScroll.test.mjs";
import test_easeInOutCubic from "./easeInOutCubic.test.mjs";
import test_scrollToElement from "./scrollToElement.test.mjs";
import servePackageFiles from "./test/servePackageFiles.mjs";

async function test() {
  const packageFilesServer = await servePackageFiles(
    new URL(".", import.meta.url)
  );
  const { port } = /** @type {import("node:net").AddressInfo} */ (
    packageFilesServer.address()
  );
  const packageFilesOriginUrl = new URL(`http://localhost:${port}/`);

  try {
    const tests = new TestDirector();

    test_animateScroll(tests);
    test_easeInOutCubic(tests);
    test_scrollToElement(tests, packageFilesOriginUrl);

    await tests.run();
  } finally {
    packageFilesServer.close();
  }
}

test();
