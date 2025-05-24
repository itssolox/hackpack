const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

// === CONFIGURATION ===
const TOKEN = '7944845382:AAFhsH134GXxpi-nhDDi9XPJgAJx0sfhA6o';
const CHANNEL_ID = '-1002697504696';
const CHANNEL_LINK = 'https://t.me/+Jj-2MqY4DbUzZGZl';
const OWNER_ID = '6994528708';


const DATA_FILE = path.join(__dirname, 'users.json');
const MIN_REFERRALS_TO_WITHDRAW = 2;
const BOT_USERNAME = 'method_free_robot';

// === DATA HANDLING ===
let users = {};
if (fs.existsSync(DATA_FILE)) {
  users = JSON.parse(fs.readFileSync(DATA_FILE));
}
function saveUsers() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
}

// === UTILS ===
function getReferralLink(userId) {
  return `https://t.me/${BOT_USERNAME}?start=${userId}`;
}
async function isMember(bot, userId) {
  try {
    const res = await bot.getChatMember(CHANNEL_ID, userId);
    return ['member', 'administrator', 'creator'].includes(res.status);
  } catch {
    return false;
  }
}
function registerUser(userId, referrerId, bot) {
  if (!users[userId]) {
    users[userId] = {
      points: 0,
      referrals: [],
      withdrawn: false,
      referrer: referrerId || null
    };
    if (referrerId && users[referrerId] && referrerId !== userId) {
      if (!users[referrerId].referrals.includes(userId)) {
        users[referrerId].referrals.push(userId);
        users[referrerId].points += 1;
        saveUsers();
        bot.sendMessage(
          referrerId,
          `🎉 Someone just joined using your referral link!\n\nYou now have ${users[referrerId].referrals.length} referral(s).\nRefer ${MIN_REFERRALS_TO_WITHDRAW} friends to unlock your reward!`
        );
      }
    }
    saveUsers();
  }
}

function hackPackGuide() {
  return (
    `🔥 *How to Get Your FREE Hack Pack* 🔥\n\n` +
    `It's simple:\n\n` +
    `1️⃣ Get your referral link using "🔄 Refer Friends" button\n` +
    `2️⃣ Share your link and invite 2 friends to join\n` +
    `3️⃣ Once you have 2 referrals, click "💰 Withdraw Reward"\n` +
    `That's it! You'll get access to 60+ hacking tools and tutorials for FREE!\n\n` +
    `🔐 *Hack Pack includes:* Netflix crackers, YouTube bots, PayPal methods, Carding tutorials, Gift card tricks and much more!`
  );
}

function hackPackReward() {
  return (
    `🎉 *Congratulations!*\n\nYou have unlocked the *Hack Pack*! Here are your rewards:\n\n` +
    `⭕️ Hack Pack is On Sale ⭕️\nOnly in : $Free @dailyb1ns\n` +
    `🔰 Netflix Cracker\n🔰 Free 1 Month Netflix Trick (You Can Create Unlimited Account) ♨️\n🔰 Free Netflix using PayPal (Video Tutorial)\n🔰 Free Amazon Prime Trick ♨️ + Video Tutorial\n🔰 Hotstar Cracking Trick (Video Tutorial)\n🔰 How To Bypass Link Shortner\n🔰 Instagram Liker\n🔰 Snow's YouTube Bot\n🔰 YouTube View Booster Bot ♨️\n🔰 YouTube Blazzer\n🔰 50 Android Hacks\n🔰 Amazon Gift Cards\n🔰 Paypal Method\n🔰 Ebay Method\n🔰 Free Amazon Gift Card Method\n🔰 Free Pizza Method\n🔰 Flipkart Carding Tutorial ♨️\n🔰 How To Get Fresh Valid Proxy List For Cracking\n🔰 How To Get A Free Master Card ♨️\n🔰 How To Get Referrals\n🔰 Bypass Gmail Mobile Verification Trick\n🔰 Bypass Android Pattern Lock Using ADB\n🔰 Get Refund Of GiftCard\n🔰 Facebook Hacking Ebook ♨️\n🔰 Get Things From Ebay For Free\n🔰 SEO Secrets ♨️\n🔰 Guide To Make Money Online\n🔰 Hack Hotmail\n🔰 Hack Gmail\n🔰 4 Hacking Methods ♨️\n🔰 CC Generator\n🔰 CC Checker\n🔰 Crack WEP in Linux\n🔰 Get Massive YouTube Traffic ♨️\n🔰 Get Passes To Pornsites\n🔰 Hack WEP WiFi Password\n🔰 Kick Someone Of A Wireless Network\n🔰 Make $1000's A Week With Torrents\n🔰 Make A Phisher For A Website (Facebook/Instagram/Etc)\n🔰 Make⭕️ Easy Money As An eBay Affiliate\n🔰 Make Multiple Gmail Accounts With Only 1 Account ♨️\n🔰 How To Make Mozilla 30 Times Faster\n🔰 USA Whatsapp Number Trick\n🔰 Collection Of Rare Hacking Ebooks ♨️\n🔰 Starbucks Method\n🔰 How To Call Someone From His Own Number (Caller Id Spoofing) ♨️\n🔰 Transfer PP Balance Method\n🔰 YouTube RED Trick\n🔰 Gana Mod App ♨️\n🔰 Netflix Mod App ♨️ (Look a Like)\n🔰 Saavn Mod App ♨️\n🔰 Express VPN Mod App ♨️\n🔰 7 Reasons a Credit Card Is Blocked\n🔰 Amazon Carding Method ♨️ + Video Tutorial\n🔰 What is Carding?? (Video)\n🔰 Basic Carding TutoBal\n🔰 Phishing Tutorial\n🔰 Easy Cardable Sites List ♨️\n🔰 Find Local BIN's\n🔰 Carding For Noobs\n🔰 Carding Online Tools And Website\n🔰 PayPal Carding\n🔰 Wallmart Carding\n🔰 Amazon Carding (Video Tutorial) ♨️\n🔰 eBay Carding (Video Tutorial)\n🔰 How To Find Credit Card For Carding ( Video )\n\n*Pass:* JK@4321\n*Link:* https://drive.google.com/file/d/1NMjBdt43Z5p9rMndMY1SeKhXXqtf6eBW/view\n\nThank you for using the bot!`
  );
}

// === BOT INITIALIZATION ===
const bot = new TelegramBot(TOKEN, { polling: true });

// === /start HANDLER ===
bot.onText(/\/start(?:\s(\d+))?/, async (msg, match) => {
  const userId = msg.from.id.toString();
  const referrerId = match[1];

  // Force join
  if (!(await isMember(bot, userId))) {
    return bot.sendMessage(
      userId,
      `🔒 To use this bot, you must join our channel first:\n${CHANNEL_LINK}\n\nAfter joining, press /start again.`,
      { disable_web_page_preview: true }
    );
  }

  // Register user and handle referral
  registerUser(userId, referrerId, bot);

  // Main menu
  const keyboard = {
    keyboard: [
      ['💰 My Points', '🔄 Refer Friends'],
      ['🎁 Withdraw Reward', '❓ How To Get Hack Pack'],
    ],
    resize_keyboard: true,
  };

  let info = `Welcome, *${msg.from.first_name}*!\n\n`;
  // info += `Earn rewards by referring friends. You must refer *${MIN_REFERRALS_TO_WITHDRAW}* friends to withdraw your reward.\n\n`;
  // info += `Press the buttons below to check your points, get your referral link, or withdraw your reward.`;

  bot.sendMessage(userId, info, { parse_mode: 'Markdown', reply_markup: keyboard });
  bot.sendMessage(userId, hackPackGuide(), { parse_mode: 'Markdown' });
});

// === MAIN MENU BUTTONS ===
bot.on('message', async (msg) => {
  const userId = msg.from.id.toString();
  const text = msg.text;

  if (!users[userId]) return;

  if (text === '💰 My Points') {
    const points = users[userId].points || 0;
    const referred = users[userId].referrals.length;
    bot.sendMessage(
      userId,
      `🏆 *Your Points:* ${points}\n👫 *Friends Referred:* ${referred}\n\nRefer ${MIN_REFERRALS_TO_WITHDRAW} friends to unlock your reward!`,
      { parse_mode: 'Markdown' }
    );
  }
  else if (text === '🔄 Refer Friends') {
    const link = getReferralLink(userId);
    bot.sendMessage(
      userId,
      `🔗 *Your Referral Link:*\n\`${link}\`\n\nShare this link with your friends. When they join and use the bot, you'll get a point!`,
      { parse_mode: 'Markdown' }
    );
  }
  else if (text === '🎁 Withdraw Reward') {
    if (users[userId].withdrawn) {
      bot.sendMessage(userId, '✅ You have already withdrawn your reward.');
    } else if (users[userId].referrals.length < MIN_REFERRALS_TO_WITHDRAW) {
      bot.sendMessage(
        userId,
        `❌ You need *${MIN_REFERRALS_TO_WITHDRAW} referrals* to withdraw your reward. You have *${users[userId].referrals.length}*.`,
        { parse_mode: 'Markdown' }
      );
    } else {
      users[userId].withdrawn = true;
      saveUsers();
      bot.sendMessage(userId, hackPackReward(), { parse_mode: 'Markdown', disable_web_page_preview: false });
    }
  }
  else if (text === '❓ How To Get Hack Pack') {
    bot.sendMessage(userId, hackPackGuide(), { parse_mode: 'Markdown' });
  }
});

// === ADMIN BROADCAST ===
// === ADMIN BROADCAST ===
bot.onText(/\/broadcast (.+)/, async (msg, match) => {
  if (msg.from.id.toString() !== OWNER_ID) return;
  const message = match[1];
  let sentCount = 0;
  const userIds = Object.keys(users);

  for (const userId of userIds) {
    try {
      await bot.sendMessage(userId, message, { parse_mode: 'Markdown' });
      sentCount++;
    } catch (e) {
      // Ignore errors (e.g., user blocked bot)
    }
  }
  bot.sendMessage(
    msg.chat.id,
    `✅ Broadcast sent to ${sentCount} user(s).`
  );
});


// === /help HANDLER ===
bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, hackPackGuide(), { parse_mode: 'Markdown' });
});

// === SAVE USERS ON EXIT ===
process.on('SIGINT', () => {
  saveUsers();
  process.exit();
});
