from mineflayer import Bot
import time
import random

class AternosAIBot:
    def __init__(self):
        self.server_ip = "aiserver1245.aternos.me"
        self.server_port = 25565
        self.bot_name = "AI_Assistant"
        self.connected = False
        
    def connect(self):
        print(f"🔗 Подключаюсь к {self.server_ip}:{self.server_port}...")
        
        try:
            self.bot = Bot({
                'host': self.server_ip,
                'port': self.server_port,
                'username': self.bot_name,
                'version': '1.12.2',
                'auth': 'offline'
            })
            
            self.setup_events()
            self.connected = True
            return True
            
        except Exception as e:
            print(f"❌ Ошибка подключения: {e}")
            return False
    
    def setup_events(self):
        @self.bot.on('spawn')
        def on_spawn():
            print("✅ Успешно вошел на сервер!")
            self.bot.chat("Привет! Я AI помощник! Команды: 'бот помощь'")
        
        @self.bot.on('chat')
        def on_chat(sender, message, *args):
            if sender != self.bot.username:
                print(f"💬 {sender}: {message}")
                self.handle_chat(sender, message)
        
        @self.bot.on('error')
        def on_error(err):
            print(f"⚠️ Ошибка: {err}")
            self.connected = False
        
        @self.bot.on('kicked')
        def on_kicked(reason):
            print(f"🔴 Кикнули: {reason}")
            self.connected = False
        
        @self.bot.on('end')
        def on_end():
            print("🔌 Отключился от сервера")
            self.connected = False
    
    def handle_chat(self, player, message):
        msg_lower = message.lower()
        
        # Команды для игрока
        if 'бот помощь' in msg_lower:
            help_text = [
                f"{player}, мои команды:",
                "'бот иди' - иду вперед",
                "'бот стой' - останавливаюсь", 
                "'бот прыгай' - начинаю прыгать",
                "'бот найди дерево' - ищу деревья",
                "'бот говори [текст]' - повторяю текст"
            ]
            for line in help_text:
                self.bot.chat(line)
                time.sleep(1)
                
        elif 'бот иди' in msg_lower:
            self.bot.chat(f"{player}, Иду вперед!")
            self.bot.setControlState('forward', True)
            time.sleep(3)
            self.bot.setControlState('forward', False)
            
        elif 'бот стой' in msg_lower:
            self.bot.chat(f"{player}, Стою!")
            self.bot.clearControlStates()
            
        elif 'бот прыгай' in msg_lower:
            self.bot.chat(f"{player}, Прыгаю! 🐰")
            for i in range(5):
                self.bot.setControlState('jump', True)
                time.sleep(0.5)
                self.bot.setControlState('jump', False)
                time.sleep(0.5)
                
        elif 'бот найди дерево' in msg_lower:
            self.bot.chat(f"{player}, Ищу деревья...")
            # Простой поиск деревьев
            block = self.bot.findBlock({
                'matching': ['oak_log', 'birch_log', 'spruce_log'],
                'maxDistance': 16
            })
            if block:
                self.bot.chat(f"Нашел дерево! Иду к нему!")
                self.bot.lookAt(block.position)
            else:
                self.bot.chat("Деревьев рядом нет 😔")
                
        elif 'бот говори' in msg_lower:
            text = message.replace('бот говори', '').strip()
            if text:
                self.bot.chat(text)
            else:
                self.bot.chat("Что сказать?")
                
        elif any(word in msg_lower for word in ['привет бот', 'бот привет']):
            greetings = [
                f"Привет, {player}! 😊",
                f"Здаров, {player}!",
                f"Хай, {player}! Как дела?"
            ]
            self.bot.chat(random.choice(greetings))
            
        elif 'пока бот' in msg_lower:
            self.bot.chat(f"Пока, {player}! Возвращайся! 👋")

def main():
    bot = AternosAIBot()
    
    while True:
        if bot.connect():
            print("🤖 Бот подключен к серверу!")
            # Держим соединение активным
            while bot.connected:
                time.sleep(5)
        else:
            print("💤 Сервер выключен. Жду 30 секунд...")
            time.sleep(30)

if __name__ == "__main__":
    print("🎮 Minecraft AI Bot для Aternos")
    print("📍 Сервер: aiserver1245.aternos.me")
    print("⚙️ Версия: 1.12.2")
    print("⏳ Ожидаю запуска сервера...")
    main()
