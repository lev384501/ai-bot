const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'aiserver1245.aternos.me',
  port: 23447,
  username: 'AI_Assistant',
  version: '1.12.2'
});

bot.on('login', () => {
  console.log('✅ Бот подключился к серверу!');
  bot.chat('Привет! Я AI помощник. Напиши "бот помощь" для команд');
});

bot.on('chat', (username, message) => {
  if (username === bot.username) return;
  
  console.log(`💬 ${username}: ${message}`);
  const msg = message.toLowerCase();
  
  // Ответы на команды
  if (msg.includes('бот помощь')) {
    bot.chat(`${username}, Команды: "бот иди", "бот стой", "бот прыгай", "бот найди дерево"`);
  }
  else if (msg.includes('бот привет')) {
    bot.chat(`Привет, ${username}! Я готов помочь!`);
  }
  else if (msg.includes('бот иди')) {
    bot.chat(`${username}, Иду вперед!`);
    bot.setControlState('forward', true);
    setTimeout(() => {
      bot.setControlState('forward', false);
      bot.chat('Остановился!');
    }, 3000);
  }
  else if (msg.includes('бот стой')) {
    bot.chat(`${username}, Стою!`);
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
    bot.chat(`${username}, Ищу дерево...`);
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
});

bot.on('error', (err) => {
  console.log('❌ Ошибка:', err);
});

bot.on('end', () => {
  console.log('🔌 Отключился от сервера');
  setTimeout(() => {
    console.log('🔄 Переподключаюсь...');
    // Автопереподключение
  }, 5000);
});

console.log('🚀 Запускаю бота...');
