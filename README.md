# French to English Telegram Bot

This Telegram bot allows you to get the meanings of French words in English. It utilizes the Deno runtime and is hosted on Deno Deploy.

## Usage

Follow these steps to host the bot on Deno Deploy:

1. Fork this repository.

2. Create an account on [Deno Deploy](https://deno.com/deploy).

3. Create an account on [Browserless.io](https://www.browserless.io/).

4. In your Deno Deploy settings, add the following environment variables:

   - `USERS`: A string containing the allowed users separated by commas without any spaces, e.g., 'test,second_test'.
   - `BROWSERLESS_TOKEN`: Your API token from Browserless.io.
   - `TELEGRAM_KEY`: Your Telegram Bot API token.

5. Select the forked repository and the `main.ts` file when setting up your Deno Deploy project.

6. Send a request to the following URL to configure your bot's webhook to point to your app:
   ```
   https://api.telegram.org/bot<token>/setWebhook?url=<url>/<token>
   ```
   Replace `<token>` with your Telegram Bot API token and `<url>` with the URL of your Deno Deploy app.

Now, your Telegram bot for getting French word meanings in English is ready to use. Users who are listed in the `USERS` environment variable will be able to interact with the bot by sending French words, and the bot will respond with the English meanings in the form of PNG files.

Enjoy using your French to English Telegram Bot! If you have any questions or encounter any issues, please refer to the documentation of Deno Deploy and Browserless.io for troubleshooting and support.
