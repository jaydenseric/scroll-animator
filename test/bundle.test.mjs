import { strictEqual } from "assert";
import esbuild from "esbuild";
import { gzipSize } from "gzip-size";
import { fileURLToPath } from "url";

export default (tests) => {
  tests.add("Bundle.", async () => {
    const {
      outputFiles: [bundle],
    } = await esbuild.build({
      entryPoints: [
        fileURLToPath(new URL("../public/index.mjs", import.meta.url)),
      ],
      write: false,
      bundle: true,
      minify: true,
      legalComments: "none",
      format: "esm",
    });

    const kB = (await gzipSize(bundle.contents)) / 1000;

    console.info(`${kB} kB minified and gzipped bundle.`);

    strictEqual(kB < 1, true);
  });
};
