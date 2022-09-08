// @ts-check

import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname } from "node:path";

/**
 * Serves `package.json` `files` field files on a free port.
 * @param {URL} packageDirectoryUrl Package directory URL.
 * @returns {Promise<import("node:http").Server>} The listening server. To get
 *   the localhost port use `server.address().port`. To stop listening use
 *   `server.close()`.
 */
export default async function servePackageFiles(packageDirectoryUrl) {
  if (!(packageDirectoryUrl instanceof URL))
    throw new TypeError(
      "Argument 1 `packageDirectoryUrl` must be a `URL` instance."
    );

  const packageJson = JSON.parse(
    await readFile(new URL("package.json", packageDirectoryUrl), "utf8")
  );

  if (typeof packageJson !== "object" || !packageJson)
    throw new Error("`package.json` data invalid.");

  if (!Array.isArray(packageJson.files))
    throw new TypeError("`package.json` field `files` must be an array.");

  const server = createServer(async (request, response) => {
    /** @type {number} */
    let statusCode;

    /** @type {string | null} */
    let contentType = null;

    /** @type {string | null} */
    let body = null;

    if (
      request.url &&
      // Request matches a file in the `package.json` `files` field.
      packageJson.files.some(
        (/** @type {unknown} */ filePath) =>
          typeof filePath == "string" && `/${filePath}` === request.url
      )
    ) {
      // Try to serve the file.
      try {
        statusCode = 200;

        switch (extname(request.url)) {
          case ".mjs":
            contentType = "text/javascript";
            break;
          default:
            contentType = null;
        }

        body = await readFile(
          new URL("." + request.url, packageDirectoryUrl),
          "utf8"
        );
      } catch (error) {
        console.error(error);

        // Serve a 500 error.
        statusCode = 500;
        contentType = null;
        body = null;
      }
    } else {
      // Serve a 404 error.
      statusCode = 404;
      contentType = null;
      body = null;
    }

    response.setHeader("Access-Control-Allow-Origin", "*");

    if (contentType !== null) response.setHeader("Content-Type", contentType);

    response.writeHead(statusCode);

    if (body !== null) response.end(body);
    else response.end();
  });

  await new Promise((resolve) => {
    server.listen(resolve);
  });

  return server;
}
