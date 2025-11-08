const mineflayer = require('mineflayer');

// Ты админ по умолчанию
const ADMINS = ['rarefood28'];
const ADMIN_PASSWORD = 'op123';

const bot = mineflayer.createBot({
  host: 'aiserver1245.aternos.me',
  port: 23447,
  username: 'AI_Protector',
  version: '1.12.2'
});

const users = {};

// Автоматически делаем тебя админом
ADMINS.forEach(admin => {
  users[admin] = { isAdmin: true };
});

bot.on('login', () => {
  console.log('✅ Бот подключился к серверу!');
  bot.chat('🛡️ Защищенный AI помощник активирован!');
});

bot.on('chat', (username, message) => {
  if (username === bot.username) return;
  
  console.log(`💬 ${username}: ${message}`);
  const msg = message.toLowerCase();
  
  // Защита от оскорблений (полный список)
  const badWords = [
    'бот иди нах', 'бот иди нахуй', 'бот дурак', 'бот урод', 
    'бот завались', 'бот отстань', 'бот пидор', 'бот ты пидор',
    'бот ты сын', 'бот сынша', 'бот лава', 'бот ты сынша лавы',
    'бот хуй', 'бот гандон', 'бот мудила', 'бот дебил'
  ];
  
  if (badWords.some(word => msg.includes(word)) && !users[username]?.isAdmin) {
    bot.chat(`/kick ${username} Не оскорбляй бота! 🔨`);
    console.log(`🚫 Кикнул ${username} за оскорбления`);
    return;
  }
  
  // Выдача прав админа
  if (msg.includes('бот пароль') && msg.includes(ADMIN_PASSWORD)) {
    users[username] = { isAdmin: true };
    bot.chat(`🔑 ${username}, ты теперь администратор бота!`);
    console.log(`🔑 ${username} получил права админа`);
    return;
  }
  
  // Команды для всех
  if (msg.includes('бот помощь')) {
    if (users[username]?.isAdmin) {
      bot.chat(`${username}, Админ-команды: "бот кик [ник]", "бот бан [ник]", "бот список"`);
    } else {
      bot.chat(`${username}, Команды: "бот привет", "бот иди", "бот прыгай", "бот найди дерево"`);
    }
  }
  else if (msg.includes('бот привет')) {
    bot.chat(`Привет, ${username}! 👋`);
  }
  else if (msg.includes('бот иди')) {
    bot.chat(`${username}, Иду вперед! 🚶`);
    bot.setControlState('forward', true);
    setTimeout(() => {
      bot.setControlState('forward', false);
    }, 3000);
  }
  else if (msg.includes('бот стой')) {
    bot.chat(`${username}, Стою! ⛔`);
    bot.clearControlStates();
  }
  else if (msg.includes('бот прыгай')) {
    bot.chat(`${username}, Прыгаю! 🐰`);
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
      }, i * 600);
    }
  }
  else if (msg.includes('бот найди дерево')) {
    bot.chat(`${username}, Ищу дерево... 🌳`);
    const block = bot.findBlock({
      point: bot.entity.position,
      matching: ['oak_log', 'birch_log', 'spruce_log'],
      maxDistance: 16
    });
    if (block) {
      bot.chat('Нашел дерево! Иду к нему!');
      bot.lookAt(block.position);
    } else {
      bot.chat('Деревьев рядом нет 😔');
    }
  }
  
  // Админ команды
  else if (msg.includes('бот кик') && users[username]?.isAdmin) {
    const target = message.split(' ')[2];
    if (target) {
      bot.chat(`/kick ${target} Кикнут администратором`);
      bot.chat(`${username}, Игрок ${target} кикнут!`);
    }
  }
  else if (msg.includes('бот список') && users[username]?.isAdmin) {
    const admins = Object.keys(users).filter(user => users[user].isAdmin);
    bot.chat(`📋 Админы: ${admins.join(', ')}`);
  }
});

bot.on('error', (err) => {
  console.log('❌ Ошибка:', err);
});

bot.on('end', () => {
  console.log('🔌 Отключился от сервера');
  setTimeout(() => {
    console.log('🔄 Переподключаюсь...');
    process.exit(1);
  }, 10000);
});

console.log('🚀 Запускаю защищенного бота...');
