import {
  Bot,
  InputFile,
  webhookCallback,
} from "https://deno.land/x/grammy@v1.18.1/mod.ts";
import { getScreenshot } from "./puppet.ts";

const bot = new Bot(Deno.env.get("TELEGRAM_KEY") || "");

bot.command(
  "start",
  (ctx) => ctx.reply("Hello. get French words meanings in English"),
);
bot.on("message", async (ctx) => {
  const user = await ctx.getAuthor();
  if (
    !Deno.env.get("USERS")!.split(",").includes(
      user.user.username!,
    )
  ) {
    console.log("*******", user.user.username, "*****", Deno.env.get("USERS"));
    return ctx.reply("Scram! You're not allowed to use this bot.");
  }
  if (!ctx.message.text) {
    return ctx.reply("Send a word in french");
  }
  try {
    const result = await getScreenshot(ctx.message.text!);
    const buffer = result?.res;
    if (!buffer) throw Error("something bad happened");
    const image = new InputFile(buffer, `${ctx.message.text}.png`);
    return ctx.replyWithDocument(image);
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return ctx.reply(error.message);
  }
});

const handleUpdate = webhookCallback(bot, "std/http");

Deno.serve(async (req) => {
  if (req.method === "POST") {
    const url = new URL(req.url);
    if (url.pathname.slice(1) === bot.token) {
      try {
        return await handleUpdate(req);
      } catch (err) {
        console.error(err);
      }
    }
  }
  return new Response();
});
