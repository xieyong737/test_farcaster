import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
// import { neynar } from 'frog/hubs'

export const app = new Frog({
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  title: "Frog Frame",
});

app.use("/*", serveStatic({ root: "./public" }));

app.frame("/", (c) => {
  return c.res({
    action: "/submit",
    image: <div style={{ color: "black", fontSize: 60 }}>123456</div>,
    intents: [
      <Button value="apple">Apple</Button>,
      <Button value="banana">Banana</Button>,
      <Button value="mango">Mango</Button>,
    ],
  });
});

// // Frame to display user's response.
// app.frame("/submit", (c) => {
//   const { buttonValue } = c;
//   return c.res({
//     action: "/",
//     image: <div style={{ color: "black", fontSize: 60 }}>{buttonValue}</div>,
//     intents: [
//       <Button value="apple">Apple</Button>,
//       <Button value="banana">Banana</Button>,
//       <Button value="back">Back</Button>,
//     ],
//   });
// });

const port = 9528;
console.log(`Server is running on port ${port}`);

devtools(app, { serveStatic });

serve({
  fetch: app.fetch,
  port,
});
