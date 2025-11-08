from mcpi.minecraft import Minecraft
from mcpi import block
import time
import random

class MCPIBot:
    def __init__(self):
        self.server_ip = "aiserver1245.aternos.me"
        self.server_port = 23447  # Твой порт!
        
    def connect(self):
        try:
            print(f"🔗 Подключаюсь к {self.server_ip}:{self.server_port}...")
            self.mc = Minecraft.create(self.server_ip, self.server_port)
            print("✅ Успешно подключился к серверу!")
            return True
        except Exception as e:
            print(f"❌ Ошибка подключения: {e}")
            return False
    
    def chat(self, message):
        try:
            self.mc.postToChat(message)
            print(f"💬 Отправил в чат: {message}")
        except Exception as e:
            print(f"❌ Ошибка отправки сообщения: {e}")
    
    def start(self):
        if self.connect():
            self.chat("Привет! Я AI бот! Напиши 'бот помощь'")
            
            # Главный цикл
            while True:
                time.sleep(10)
                # Здесь будет обработка чата
        else:
            print("💤 Сервер недоступен")

if __name__ == "__main__":
    print(f"🎮 MCPI Bot для {self.server_ip}:{self.server_port}")
    bot = MCPIBot()
    bot.start()
