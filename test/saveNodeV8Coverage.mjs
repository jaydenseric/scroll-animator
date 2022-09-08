// @ts-check

import { writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

let saveCount = 0;

/**
 * Saves a V8 script coverage result to the
 * [`NODE_V8_COVERAGE`](https://nodejs.org/dist/latest-v18.x/docs/api/cli.html#node_v8_coveragedir)
 * environment variable directory, in the format of a Node.js generated V8
 * script coverage result.
 * @param {Array<import("node:inspector").Profiler.ScriptCoverage>} result V8
 *   script coverage result.
 * @param {string} pid Process ID the coverage data relates to.
 */
export default async function saveNodeV8Coverage(result, pid) {
  if (!Array.isArray(result))
    throw new TypeError("Argument 1 `result` must be an array.");

  if (typeof pid !== "string")
    throw new TypeError("Argument 2 `pid` must be a string.");

  if (!process.env.NODE_V8_COVERAGE)
    throw new Error("Environment variable `NODE_V8_COVERAGE` missing.");

  await writeFile(
    new URL(
      // The JSON file name must start with `coverage-`. Node.js adds a process
      // ID, a timestamp, and a count (starts at 0), separated by `-`.
      `coverage-${pid}-${Date.now()}-${saveCount++}.json`,
      pathToFileURL(
        process.env.NODE_V8_COVERAGE.endsWith("/")
          ? process.env.NODE_V8_COVERAGE
          : process.env.NODE_V8_COVERAGE + "/"
      )
    ),
    JSON.stringify({ result })
  );
}
