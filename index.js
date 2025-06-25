require('dotenv').config(); // Load .env file

const { Telegraf } = require('telegraf');
const fs = require('fs');
const path = require('path');
const { obfuscate } = require('js-confuser');
// Bot token from .env
const bot = new Telegraf(process.env.BOT_TOKEN);
function arabEncrypt(jsCode) {
  const arabicChars = 'شسيرهجحخهصضطظعغفقكلمنويءآأؤإئىبتث'.split('');

  // Replace basic variable/function names
  let transformed = jsCode.replace(/\b[_a-zA-Z][_a-zA-Z0-9]*\b/g, (match) => {
    // Skip reserved words (like if, var, return, etc.)
    if (['if', 'else', 'return', 'let', 'const', 'var', 'function', 'true', 'false'].includes(match)) {
      return match;
    }

    const rand = () => arabicChars[Math.floor(Math.random() * arabicChars.length)];
    return Array.from({ length: match.length }).map(rand).join('');
  });

  return transformed;
}
// /start command

bot.start(async (ctx) => {
  await ctx.replyWithPhoto(
    { url: 'https://files.catbox.moe/4ga40i.png' },
    {
      caption: `╭─『 *🤖 𝙈𝙍 𝙎𝙈𝙄𝙇𝙀 𝙀𝙉𝘾 𝘽𝙊𝙏* 』─╮
│
│ 👋 *Hello ${ctx.from.first_name || 'there'}!*
│ 
│ I'm an advanced Telegram bot created by *Mr Smile*.
│
│ 📜 Type */smile* to explore my features.
│
╰────────────────────────╯`,
      parse_mode: 'Markdown'
    }
  );
});

bot.command('arabfree', async (ctx) => {
  const reply = (text) => ctx.reply(text);

  const replied = ctx.message.reply_to_message;
  const fromId = ctx.from.id;

  // Must reply to a .js file
  if (!replied || !replied.document || !replied.document.file_name.endsWith('.js')) {
    return reply('❌ Please reply to a `.js` file with `/arab`.');
  }

  // Only the original sender can run this
  if (replied.from.id !== fromId) {
    return reply('⚠️ Only the person who uploaded the file can encrypt it.');
  }

  try {
    const fileId = replied.document.file_id;
    const fileLink = await ctx.telegram.getFileLink(fileId);

    const res = await fetch(fileLink.href);
    const jsCode = await res.text();

    await reply('🔐 Applying Arab-style encryption...');

    const transformed = arabEncrypt(jsCode);

    const filePath = path.join(__dirname, 'arab_encrypted.js');
    fs.writeFileSync(filePath, transformed);

    await ctx.replyWithDocument({ source: filePath, filename: 'arab_encrypted.js' }, {
      caption: `🔒 Encrypted using Arab-style scrambling.\nNot secure, but confusing! 😎`,
    });

    fs.unlinkSync(filePath);
  } catch (err) {
    console.error(err);
    reply('❌ Arab encryption failed.');
  }
});
bot.command('encryptfree', async (ctx) => {
  const reply = (text) => ctx.reply(text);

  const replied = ctx.message.reply_to_message;
  const fromId = ctx.from.id;

  // Must reply to a .js file
  if (!replied || !replied.document || !replied.document.file_name.endsWith('.js')) {
    return reply('❌ Please reply to a `.js` file with `/encrypt`.');
  }

  // Only the original sender of the file can encrypt
  if (replied.from.id !== fromId) {
    return reply('⚠️ Only the person who uploaded the file can encrypt it.');
  }

  try {
    const fileId = replied.document.file_id;
    const fileLink = await ctx.telegram.getFileLink(fileId);
    const res = await fetch(fileLink.href);
    const jsCode = await res.text();

    await reply('🔐 Encrypting your JavaScript file...');

    const obfuscated = await obfuscate(jsCode, {
      target: "node",
      preset: "high",
      compact: true,
      minify: true,
      flatten: true,
      identifierGenerator: function () {
        const originalString = "素JAMES晴TECH晴" + "素JAMES晴TECH晴";
        const removeUnwantedChars = (input) => input.replace(/[^a-zA-Z素GIDDY晴TENNOR晴]/g, "");
        const randomString = (length) => {
          let result = "";
          const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
          for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
          }
          return result;
        };
        return removeUnwantedChars(originalString) + randomString(2);
      },
      renameVariables: true,
      renameGlobals: true,
      stringEncoding: true,
      stringSplitting: 0.0,
      stringConcealing: true,
      stringCompression: true,
      duplicateLiteralsRemoval: 1.0,
      shuffle: { hash: 0.0, true: 0.0 },
      stack: true,
      controlFlowFlattening: 1.0,
      opaquePredicates: 0.9,
      deadCode: 0.0,
      dispatcher: true,
      rgf: false,
      calculator: true,
      hexadecimalNumbers: true,
      movedDeclarations: true,
      objectExtraction: true,
      globalConcealing: true,
    });

    const filePath = path.join(__dirname, 'james.js');
    fs.writeFileSync(filePath, obfuscated);

    await ctx.replyWithDocument({ source: filePath, filename: 'encrypted.js' }, {
      caption: `✅ Successfully Encrypted\n• Type: Hard Obfuscation\n• From: JamesTech`,
    });

    fs.unlinkSync(filePath);

  } catch (error) {
    console.error(error);
    reply('❌ Encryption failed. Please try again.');
  }
});


// /help command
bot.command('help', (ctx) => {
  ctx.reply('Available Commands:\n/start - Welcome Message\n/help - Show this help\n/about - About this bot');
});
// /about command
bot.command('smile', async (ctx) => {
  try {
    await ctx.replyWithPhoto(
      { url: 'https://files.catbox.moe/4ga40i.png' }, // Replace with your image URL
      {
        caption: ` 𝐌𝐑 𝐒𝐌𝐈𝐋𝐄 𝐄𝐍𝐂 𝐁𝐎𝐓

𝐂𝐑𝐄𝐀𝐓𝐎𝐑 : 𝐌𝐑 𝐒𝐌𝐈𝐋𝐄
𝐑𝐎𝐋𝐄 : 𝐄𝐍𝐂 𝐁𝐎𝐓

𝐌𝐘 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒
┏━━♰ 𝙏𝙊𝙊𝙇𝙎 𝘾𝙈𝘿 ♰━━
┃/encrypt
┃/arab
┃/about
┃/helP
┗━━━━━━━━━
┏━━♰ 𝙎𝙔𝙎𝙏𝙀𝙈 𝘾𝙈𝘿 ♰━━
┃/ping
┃/alive
┃/version
┃/id
┗━━━━━━━━━
`,
        parse_mode: 'Markdown'
      }
    );
  } catch (err) {
    console.error(err);
    ctx.reply('Failed to load menu.');
  }
});
bot.command('arab', async (ctx) => {
  const reply = (text) => ctx.reply(text);

  if (!ctx.message.document || !ctx.message.document.file_name.endsWith('.js')) {
    return reply('❌ Please upload a .js file with this command.');
  }

  try {
    const fileId = ctx.message.document.file_id;
    const fileLink = await ctx.telegram.getFileLink(fileId);

    const res = await fetch(fileLink.href);
    const jsCode = await res.text();

    await reply('🔐 Applying Arab-style encryption...');

    const transformed = arabEncrypt(jsCode);

    const filePath = path.join(__dirname, 'arab_encrypted.js');
    fs.writeFileSync(filePath, transformed);

    await ctx.replyWithDocument({ source: filePath, filename: 'arab_encrypted.js' }, {
      caption: `🔒 Encrypted using Arab-style scrambling.\nNot secure, but confusing! 😎`,
    });

    fs.unlinkSync(filePath);
  } catch (err) {
    console.error(err);
    reply('❌ Arab encryption failed.');
  }
});
bot.command('about', (ctx) => {
  ctx.reply('🤖 mr smile enc Bot is built with Node.js and hosted on Render.com');
});

bot.command('ping', async (ctx) => {
  const start = Date.now();
  const sent = await ctx.replyWithPhoto(
    { url: 'https://files.catbox.moe/4ga40i.png' },
    { caption: '⏳ Pinging bot...' }
  );

  const latency = Date.now() - start;

  const message = `╭─『 *⚙️ MR SMILE ENC BOT PING* 』─╮
│
│ 🤖 *Bot:* Mr Smile ENC Bot
│ 📶 *Ping:* ${latency} ms
│ 🟢 *Status:* Active & Ready
│
╰────────────────────────╯`;

  await ctx.telegram.editMessageCaption(
    sent.chat.id,
    sent.message_id,
    null,
    message
  );
});


bot.command('version', async (ctx) => {
  const versionText = `
╭──〔 *📦 BOT VERSION INFO* 〕──
│ 🤖 *Bot:* Mr Smile ENC Bot
│ 🆙 *Version:* 4.0.2
│ 📅 *Updated:* June 2025
│ 🧑‍💻 *Developer:* Mr Smile
╰────────────────────────────`;

  await ctx.replyWithPhoto(
    { url: 'https://files.catbox.moe/4ga40i.png' },
    {
      caption: versionText,
      reply_markup: {
        inline_keyboard: [
          [{ text: '📢 Support Channel', url: 'https://whatsapp.com/channel/0029VaesBAXJJhzefVszDu3h' }],
          [{ text: '👨‍💻 Developer', url: 'https://wa.me/254107065646' }]
        ]
      }
    }
  );
});



bot.command('channelid', async (ctx) => {
  const input = ctx.message.text.split(' ').slice(1).join(' ');
  if (!input) return ctx.reply('⚠️ Please provide the channel username or invite link.');

  try {
    // Try to get chat info by username or invite link
    const chat = await ctx.telegram.getChat(input);

    const message = `╭─『 *📢 CHANNEL INFO* 』─╮
│
│ 🆔 *Channel ID:* chat.id
│ 🏷️ *Title:*{chat.title}
│ 📛 *Username:* ${chat.username ? '@' + chat.username : 'N/A'}
│
╰────────────────────────╯`;

    ctx.reply(message);
  } catch (error) {
    ctx.reply('❌ Failed to get channel info. Make sure the username or link is valid and the bot is a member.');
  }
});



bot.command('alive', async (ctx) => {
  await ctx.replyWithPhoto(
    { url: 'https://files.catbox.moe/4ga40i.png' },
    {
      caption: `
╭─〔 *📡 SYSTEM ONLINE* 〕─╮
│ 🤖 *BOT:* Mr Smile ENC Bot
│ 👤 *OWNER:* Mr Smile
│ 💡 *STATUS:* Active & Responsive
│ 🔋 *POWERED BY:* Node.js
│ 📅 *DATE:* new Date().toLocaleDateString()
│ ⏱ *TIME:*{new Date().toLocaleTimeString()}
╰────────────────────╯

🛠 Use /help to see available commands.`,
    }
  );
});




// Launch bot with long polling
bot.launch();
console.log('✅ Bot is running...');

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
