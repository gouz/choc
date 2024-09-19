import { DTO } from "./DTO";
import html from "./render/index.html" with { type: "text" };
import js from "./render/main.js" with { type: "text" };
import css from "./render/main.css" with { type: "text" };

const choc = async (file: string) => {
  const talks = DTO(await Bun.file(file).json());
  const server = Bun.serve({
    port: 1337,
    async fetch(req) {
      const path = new URL(req.url).pathname;
      if (path === "/main.css")
        return new Response(css, {
          headers: { "content-type": "text/css" },
        });
      if (path === "/main.js")
        return new Response(
          `
          const talks = ${JSON.stringify(talks).replaceAll("\n", "<br>")}
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
};

export default choc;
