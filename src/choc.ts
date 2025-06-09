import { DTO } from "./DTO";
import html from "./render/index.html" with { type: "text" };
import js from "./render/main.js" with { type: "text" };
import css from "./render/main.css" with { type: "text" };
import type { Options } from "./types.js";
import { platform } from "node:process";
const start = () =>
  platform === "darwin" ? "open" : platform === "win32" ? "start" : "xdg-open";

const choc = async (file: string, options: Options) => {
  const talks = DTO(await Bun.file(file).json(), options);
  const server = Bun.serve({
    port: 1337,
    async fetch(req) {
      const path = new URL(req.url).pathname;
      if (path === "/main.css")
        return new Response(
          `
${css}
${options.withAddresses ? ".addresses {display: table-cell;}" : ""}
${options.withLanguages ? ".languages {display: table-cell;}" : ""}
${options.withFormats ? ".format {display: table-cell;}" : ""}
${options.withCompanies ? ".companies {display: table-cell;}" : ""}
${options.withCategories ? ".category {display: table-cell;}" : ""}
`,
          {
            headers: { "content-type": "text/css" },
          },
        );
      if (path === "/main.js")
        return new Response(
          `
          const talks = ${JSON.stringify(talks).replaceAll("\n", "<br>")};
          const options = ${JSON.stringify(options)};
          ${js}
          `.trim(),
          {
            headers: {
              "Content-Type": "application/javascript",
            },
            status: 200,
          },
        );
      return new Response(html, {
        headers: {
          "Content-Type": "text/html",
        },
        status: 200,
      });
    },
  });

  console.log("🍫 is listening on \x1b[1m\x1b[35;49m%s\x1b[0m", server.url);
  Bun.spawn([start(), server.url.toString()]);
};

export default choc;
