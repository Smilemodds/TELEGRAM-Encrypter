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
bot.start((ctx) => {
  ctx.reply('👋 𝐇𝐄𝐋𝐋𝐎 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐓𝐎 𝐌𝐑 𝐒𝐌𝐈𝐋𝐄 𝐄𝐍𝐂 𝐁𝐎𝐓 !\n𝐓𝐘𝐏𝐄 /smile 𝐓𝐎 𝐒𝐄𝐄 𝐌𝐘 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒.');
});
bot.command('encrypt', async (ctx) => {
  const reply = (text) => ctx.reply(text);

  // Check if a document is attached
  if (!ctx.message.document || !ctx.message.document.file_name.endsWith('.js')) {
    return reply('❌ Please upload a .js file with this command.');
  }

  try {
    // Download the document
    const fileId = ctx.message.document.file_id;
    const fileLink = await ctx.telegram.getFileLink(fileId);
    
    const res = await fetch(fileLink.href);
    const jsCode = await res.text();

    // Inform user
    await reply('🔐 Encrypting your JavaScript file...');

    // Obfuscate the code
    const obfuscated = await obfuscate(jsCode, {
      target: "node",
      preset: "high",
      compact: true,
      minify: true,
      flatten: true,
      identifierGenerator: function () {
        const originalString = "素MR晴SMILE晴" + "素MR晴SMILE晴";
        const removeUnwantedChars = (input) => input.replace(/[^a-zA-Z素MR晴SMILE晴]/g, "");
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

    // Save to a temp file
    const filePath = path.join(__dirname, 'Smile.js');
    fs.writeFileSync(filePath, obfuscated);

    // Send the file back
    await ctx.replyWithDocument({ source: filePath, filename: 'encrypted.js' }, {
      caption: `✅ Successfully Encrypted\n• Type: Hard Obfuscation\n• From: SMILE ENC BOT`,
    });

    // Clean up
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
┏━━━━━━━━━
┃/encrypt
┃/arab
┃/about
┃/help
┗━━━━━━━━━`,
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

// Launch bot with long polling
bot.launch();
console.log('✅ Bot is running...');

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
