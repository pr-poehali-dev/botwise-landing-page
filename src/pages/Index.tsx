import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [savedMoney, setSavedMoney] = useState(0);
  const [timeSaved, setTimeSaved] = useState(0);
  const [leadsGenerated, setLeadsGenerated] = useState(0);
  const [chatMessages, setChatMessages] = useState<Array<{ text: string; isBot: boolean; isTyping?: boolean }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [resultsInView, setResultsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !resultsInView) {
          setResultsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (resultsRef.current) {
      observer.observe(resultsRef.current);
    }

    return () => observer.disconnect();
  }, [resultsInView]);

  useEffect(() => {
    if (resultsInView) {
      const duration = 2000;
      const steps = 60;
      const increment = duration / steps;

      const targets = { money: 450000, time: 1200, leads: 350 };
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setSavedMoney(Math.floor(targets.money * progress));
        setTimeSaved(Math.floor(targets.time * progress));
        setLeadsGenerated(Math.floor(targets.leads * progress));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, increment);

      return () => clearInterval(timer);
    }
  }, [resultsInView]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const startDemo = () => {
    setChatMessages([{ text: 'Привет! Хочу узнать цену', isBot: false }]);
    
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setChatMessages(prev => [
          ...prev,
          { text: 'Базовый бот окупается за 3 дня и приносит от 50 000 ₽/мес. Хотите персональный расчет для вашего бизнеса?', isBot: true }
        ]);
      }, 1500);
    }, 500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && /\d/.test(formData.phone)) {
      setFormSubmitted(true);
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header id="header" className="fixed top-0 w-full bg-brand-dark shadow-lg z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-brand-accent">BotWise Prod</div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('hero')} className="text-white hover:text-brand-accent transition">Главная</button>
            <button onClick={() => scrollToSection('bento-grid')} className="text-white hover:text-brand-accent transition">Демо</button>
            <button onClick={() => scrollToSection('results')} className="text-white hover:text-brand-accent transition">Результаты</button>
            <Button onClick={() => scrollToSection('cta')} className="bg-brand-accent text-brand-dark hover:bg-brand-accent/90 font-bold">
              Связаться
            </Button>
          </nav>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1A1F2C] animate-fade-in">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <button onClick={() => scrollToSection('hero')} className="text-white hover:text-brand-accent transition text-left">Главная</button>
              <button onClick={() => scrollToSection('bento-grid')} className="text-white hover:text-brand-accent transition text-left">Демо</button>
              <button onClick={() => scrollToSection('results')} className="text-white hover:text-brand-accent transition text-left">Результаты</button>
              <Button onClick={() => scrollToSection('cta')} className="bg-brand-accent text-brand-dark hover:bg-brand-accent/90 font-bold">
                Связаться
              </Button>
            </nav>
          </div>
        )}
      </header>

      <section id="hero" className="min-h-screen bg-brand-dark text-white pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Хватит терять <span className="text-brand-accent">450 000 ₽ в год</span>. 
              Внедрите Telegram-бот для роста продаж на <span className="text-brand-accent">30%</span> за 72 часа.
            </h1>
            
            <h2 className="text-xl md:text-2xl mb-8 text-gray-300 font-light">
              Готовый чат-бот, который через 3 дня гарантирует чистую прибыль и отбирает горячих клиентов 
              у ваших конкурентов (без программистов).
            </h2>

            <Card className="bg-[#1A1F2C] border-brand-danger border-2 p-6 mb-8">
              <h3 className="text-2xl font-bold mb-6 text-brand-danger">
                Почему отказ сегодня — это добровольный слив прибыли?
              </h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="text-2xl flex-shrink-0">❌</span>
                  <p className="text-gray-200">
                    <span className="font-bold text-brand-danger">Финансовое самоубийство:</span> Вы оплачиваете бессмысленную рутину сотрудников. 
                    <span className="text-brand-accent font-bold"> 450 000 ₽ в год</span> — это средства, которые вы сжигаете без автоматизации.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="text-2xl flex-shrink-0">❌</span>
                  <p className="text-gray-200">
                    <span className="font-bold text-brand-danger">Вы отказываетесь от 50 000 ₽/мес:</span> Вы добровольно говорите "нет" 
                    гарантированному приросту от <span className="text-brand-accent font-bold">50 000 ₽</span> чистой выручки.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="text-2xl flex-shrink-0">❌</span>
                  <p className="text-gray-200">
                    <span className="font-bold text-brand-danger">Вы медленно теряете деньги:</span> Менеджеры отвечают часами, 
                    а бот закрывает сделку за <span className="text-brand-accent font-bold">10 секунд</span>. Клиенты уходят к быстрым.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="text-2xl flex-shrink-0">❌</span>
                  <p className="text-gray-200">
                    <span className="font-bold text-brand-danger">Вы выбираете отставание:</span> Конкуренты растут на 
                    <span className="text-brand-accent font-bold"> 30%</span>, пока вы платите за ручной труд. 
                    Вы дарите им свою долю рынка.
                  </p>
                </div>
              </div>
            </Card>

            <Button 
              onClick={() => scrollToSection('cta')}
              className="bg-brand-accent text-brand-dark hover:bg-brand-accent/90 text-lg px-8 py-6 h-auto font-bold hover-scale"
            >
              Узнать, как перестать сжигать 450 000 ₽ и начать расти
            </Button>
          </div>
        </div>
      </section>

      <section id="bento-grid" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-brand-dark">
            Как работает BotWise Prod
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2 md:row-span-2 p-6 bg-gradient-to-br from-brand-dark to-[#1A1F2C] text-white hover-scale">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">💬 Интерактивное Демо</h3>
                <Button 
                  onClick={startDemo} 
                  size="sm" 
                  className="bg-brand-accent text-brand-dark hover:bg-brand-accent/90 font-bold"
                >
                  Запустить
                </Button>
              </div>

              <div className="bg-white text-black rounded-lg p-4 h-[400px] overflow-y-auto">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b">
                  <div className="w-8 h-8 bg-brand-accent rounded-full flex items-center justify-center">
                    🤖
                  </div>
                  <div>
                    <div className="font-bold">BotWise Assistant</div>
                    <div className="text-xs text-gray-500">онлайн</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        msg.isBot ? 'bg-gray-100' : 'bg-brand-accent text-brand-dark'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 hover-scale">
              <Icon name="Zap" className="text-brand-accent mb-3" size={32} />
              <h3 className="text-xl font-bold mb-2">Моментальный ответ</h3>
              <p className="text-gray-600">Клиент получает ответ за 10 секунд, а не через 2 часа</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 hover-scale">
              <Icon name="TrendingUp" className="text-green-600 mb-3" size={32} />
              <h3 className="text-xl font-bold mb-2">Рост конверсии +30%</h3>
              <p className="text-gray-600">Горячие лиды не остывают в ожидании менеджера</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 hover-scale">
              <Icon name="Clock" className="text-orange-600 mb-3" size={32} />
              <h3 className="text-xl font-bold mb-2">24/7 без выходных</h3>
              <p className="text-gray-600">Бот работает круглосуточно, даже когда вы спите</p>
            </Card>

            <Card className="md:col-span-2 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 hover-scale">
              <Icon name="Target" className="text-blue-600 mb-3" size={32} />
              <h3 className="text-xl font-bold mb-2">Квалификация лидов</h3>
              <p className="text-gray-600">Бот задает правильные вопросы и передает менеджеру только готовых к покупке клиентов</p>
            </Card>
          </div>
        </div>
      </section>

      <section id="results" ref={resultsRef} className="py-20 px-4 bg-brand-dark text-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">Результаты наших клиентов</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in">
              <div className="text-5xl md:text-6xl font-bold text-brand-accent mb-3">
                {savedMoney.toLocaleString('ru-RU')} ₽
              </div>
              <div className="text-xl text-gray-300">Сэкономлено в год</div>
            </div>

            <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-5xl md:text-6xl font-bold text-brand-accent mb-3">
                {timeSaved.toLocaleString('ru-RU')} ч
              </div>
              <div className="text-xl text-gray-300">Времени освобождено</div>
            </div>

            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-5xl md:text-6xl font-bold text-brand-accent mb-3">
                +{leadsGenerated}
              </div>
              <div className="text-xl text-gray-300">Новых лидов в месяц</div>
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="py-20 px-4 bg-gradient-to-br from-brand-dark to-[#1A1F2C] text-white">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4">
              Перестаньте терять <span className="text-brand-accent">450 000 ₽</span> прямо сейчас
            </h2>
            <p className="text-xl text-gray-300">
              Оставьте заявку, и мы рассчитаем вашу экономию за 15 минут
            </p>
          </div>

          {!formSubmitted ? (
            <Card className="p-8 bg-white">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Ваше имя</label>
                  <Input
                    type="text"
                    placeholder="Иван Иванов"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Телефон</label>
                  <Input
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full"
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-brand-accent text-brand-dark hover:bg-brand-accent/90 text-lg py-6 font-bold"
                >
                  Получить расчет экономии
                </Button>

                <p className="text-center text-sm text-gray-500">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            </Card>
          ) : (
            <Card className="p-8 bg-white text-center animate-scale-in">
              <Icon name="CheckCircle2" className="text-green-600 mx-auto mb-4" size={64} />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Заявка принята!</h3>
              <p className="text-gray-600">
                Мы остановим ваши потери денег в ближайшее время. Наш менеджер свяжется с вами в течение 15 минут.
              </p>
            </Card>
          )}
        </div>
      </section>

      <footer className="bg-brand-dark text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="text-2xl font-bold text-brand-accent mb-4">BotWise Prod</div>
          <p className="text-gray-400">
            © 2024 BotWise Prod. Перестаньте терять деньги — начните зарабатывать.
          </p>
        </div>
      </footer>
    </div>
  );
}
