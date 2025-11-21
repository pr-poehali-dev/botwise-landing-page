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
    <div className="min-h-screen bg-white">
      <header id="header" className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 z-50">
        <div className="container mx-auto px-4 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-accent to-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-xl">⚡</span>
            </div>
            <span className="text-xl font-bold text-brand-dark">BotWise</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('hero')} className="text-gray-700 hover:text-brand-dark transition font-medium">Главная</button>
            <button onClick={() => scrollToSection('bento-grid')} className="text-gray-700 hover:text-brand-dark transition font-medium">Демо</button>
            <button onClick={() => scrollToSection('cases')} className="text-gray-700 hover:text-brand-dark transition font-medium">Кейсы</button>
            <button onClick={() => scrollToSection('results')} className="text-gray-700 hover:text-brand-dark transition font-medium">Результаты</button>
            <Button onClick={() => scrollToSection('cta')} className="bg-brand-dark text-white hover:bg-brand-dark/90 font-semibold rounded-xl px-6">
              Связаться
            </Button>
          </nav>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-brand-dark">
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <button onClick={() => scrollToSection('hero')} className="text-gray-700 hover:text-brand-dark transition text-left font-medium">Главная</button>
              <button onClick={() => scrollToSection('bento-grid')} className="text-gray-700 hover:text-brand-dark transition text-left font-medium">Демо</button>
              <button onClick={() => scrollToSection('cases')} className="text-gray-700 hover:text-brand-dark transition text-left font-medium">Кейсы</button>
              <button onClick={() => scrollToSection('results')} className="text-gray-700 hover:text-brand-dark transition text-left font-medium">Результаты</button>
              <Button onClick={() => scrollToSection('cta')} className="bg-brand-dark text-white hover:bg-brand-dark/90 font-semibold rounded-xl">
                Связаться
              </Button>
            </nav>
          </div>
        )}
      </header>

      <section id="hero" className="min-h-screen flex items-center bg-gradient-to-b from-gray-50 to-white pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="animate-fade-in text-center">
            <div className="inline-flex items-center gap-2 bg-brand-accent/10 text-brand-accent px-4 py-2 rounded-full text-sm font-semibold mb-8">
              <Icon name="Sparkles" size={16} />
              <span>Окупается за 72 часа</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-brand-dark via-gray-800 to-brand-dark bg-clip-text text-transparent">
              Перестаньте терять <br/>
              <span className="bg-gradient-to-r from-brand-accent to-blue-500 bg-clip-text text-transparent">450 000 ₽ в год</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
              Telegram-бот для роста продаж на <span className="text-brand-dark font-bold">30%</span> за 3 дня. 
              Готовое решение без программистов.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                onClick={() => scrollToSection('cta')}
                className="bg-brand-dark text-white hover:bg-brand-dark/90 text-lg px-10 py-7 h-auto font-bold rounded-2xl hover-scale shadow-2xl shadow-brand-dark/20"
              >
                <Icon name="Rocket" size={20} className="mr-2" />
                Начать зарабатывать
              </Button>
              <Button 
                onClick={() => scrollToSection('bento-grid')}
                variant="outline"
                className="text-lg px-10 py-7 h-auto font-semibold rounded-2xl border-2 hover-scale"
              >
                Посмотреть демо
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-brand-dark mb-1">72ч</div>
                <div className="text-sm text-gray-600">До окупаемости</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-brand-dark mb-1">+30%</div>
                <div className="text-sm text-gray-600">Рост продаж</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-brand-dark mb-1">24/7</div>
                <div className="text-sm text-gray-600">Работа без сна</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="bento-grid" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-dark">
              Как работает BotWise
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Живая демонстрация возможностей умного бота
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 md:row-span-2 p-8 bg-gradient-to-br from-brand-dark to-gray-900 text-white hover-scale border-0 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">💬 Интерактивное Демо</h3>
                <Button 
                  onClick={startDemo} 
                  size="sm" 
                  className="bg-brand-accent text-brand-dark hover:bg-brand-accent/90 font-bold rounded-xl"
                >
                  Запустить
                </Button>
              </div>

              <div className="bg-white text-black rounded-2xl p-6 h-[450px] overflow-y-auto shadow-inner">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-accent to-blue-500 rounded-full flex items-center justify-center text-2xl">
                    🤖
                  </div>
                  <div>
                    <div className="font-bold text-lg">BotWise Assistant</div>
                    <div className="text-sm text-green-600 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      онлайн
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}>
                      <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                        msg.isBot 
                          ? 'bg-gray-100 text-gray-900 rounded-tl-none' 
                          : 'bg-gradient-to-r from-brand-accent to-blue-500 text-white rounded-tr-none'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none">
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

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 hover-scale border-0 shadow-lg">
              <div className="w-12 h-12 bg-brand-accent rounded-2xl flex items-center justify-center mb-4">
                <Icon name="Zap" className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-brand-dark">Моментальный ответ</h3>
              <p className="text-gray-700 leading-relaxed">Клиент получает ответ за 10 секунд вместо 2 часов</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 hover-scale border-0 shadow-lg">
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center mb-4">
                <Icon name="TrendingUp" className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-brand-dark">Рост конверсии +30%</h3>
              <p className="text-gray-700 leading-relaxed">Лиды не остывают в ожидании менеджера</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 hover-scale border-0 shadow-lg">
              <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center mb-4">
                <Icon name="Clock" className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-brand-dark">24/7 без выходных</h3>
              <p className="text-gray-700 leading-relaxed">Бот работает круглосуточно, даже ночью</p>
            </Card>

            <Card className="md:col-span-2 p-6 bg-gradient-to-br from-orange-50 to-yellow-50 hover-scale border-0 shadow-lg">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mb-4">
                <Icon name="Target" className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-brand-dark">Умная квалификация лидов</h3>
              <p className="text-gray-700 leading-relaxed">Бот задает правильные вопросы и передает менеджеру только готовых к покупке клиентов</p>
            </Card>
          </div>
        </div>
      </section>

      <section id="cases" className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-dark">
              Реальные кейсы клиентов
            </h2>
            <p className="text-xl text-gray-600">
              Компании, которые уже перестали терять деньги
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 hover-scale border-0 shadow-xl bg-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-2xl">
                  🏢
                </div>
                <div>
                  <div className="font-bold text-lg">IT-аутсорсинг</div>
                  <div className="text-sm text-gray-500">50+ сотрудников</div>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-baseline gap-2">
                  <Icon name="TrendingUp" className="text-green-500" size={20} />
                  <span className="text-3xl font-bold text-brand-accent">+42%</span>
                  <span className="text-gray-600">лидов</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <Icon name="DollarSign" className="text-green-500" size={20} />
                  <span className="text-3xl font-bold text-brand-dark">620K ₽</span>
                  <span className="text-gray-600">экономия/год</span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                "Раньше менеджеры тратили 4 часа в день на однотипные вопросы. Теперь они занимаются только закрытием сделок."
              </p>
              <div className="mt-6 pt-4 border-t">
                <div className="font-semibold text-brand-dark">Александр К.</div>
                <div className="text-sm text-gray-500">Коммерческий директор</div>
              </div>
            </Card>

            <Card className="p-8 hover-scale border-0 shadow-xl bg-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl">
                  💼
                </div>
                <div>
                  <div className="font-bold text-lg">Онлайн-школа</div>
                  <div className="text-sm text-gray-500">15 сотрудников</div>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-baseline gap-2">
                  <Icon name="Users" className="text-purple-500" size={20} />
                  <span className="text-3xl font-bold text-brand-accent">+890</span>
                  <span className="text-gray-600">заявок/мес</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <Icon name="Clock" className="text-purple-500" size={20} />
                  <span className="text-3xl font-bold text-brand-dark">15 сек</span>
                  <span className="text-gray-600">ср. ответ</span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                "Бот обрабатывает пики нагрузки после рекламных кампаний. Мы больше не теряем горячих клиентов из-за медленных ответов."
              </p>
              <div className="mt-6 pt-4 border-t">
                <div className="font-semibold text-brand-dark">Мария С.</div>
                <div className="text-sm text-gray-500">Основатель школы</div>
              </div>
            </Card>

            <Card className="p-8 hover-scale border-0 shadow-xl bg-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-2xl">
                  🛒
                </div>
                <div>
                  <div className="font-bold text-lg">E-commerce</div>
                  <div className="text-sm text-gray-500">25 сотрудников</div>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-baseline gap-2">
                  <Icon name="ShoppingCart" className="text-orange-500" size={20} />
                  <span className="text-3xl font-bold text-brand-accent">+35%</span>
                  <span className="text-gray-600">конверсия</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <Icon name="DollarSign" className="text-orange-500" size={20} />
                  <span className="text-3xl font-bold text-brand-dark">1.2M ₽</span>
                  <span className="text-gray-600">доп. выручка</span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                "Внедрили бота за 2 дня. Через неделю увидели рост продаж. Окупился в первый же месяц."
              </p>
              <div className="mt-6 pt-4 border-t">
                <div className="font-semibold text-brand-dark">Дмитрий В.</div>
                <div className="text-sm text-gray-500">Владелец магазина</div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-brand-dark text-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Почему отказ сегодня — это <span className="text-brand-danger">добровольный слив прибыли?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-brand-danger/30 hover-scale">
              <div className="flex gap-4">
                <div className="text-4xl flex-shrink-0">❌</div>
                <div>
                  <h3 className="text-xl font-bold text-brand-danger mb-3">Финансовое самоубийство</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Вы оплачиваете бессмысленную рутину сотрудников. 
                    <span className="text-brand-accent font-bold"> 450 000 ₽ в год</span> — это средства, 
                    которые вы сжигаете без автоматизации.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/5 backdrop-blur-sm border-brand-danger/30 hover-scale">
              <div className="flex gap-4">
                <div className="text-4xl flex-shrink-0">❌</div>
                <div>
                  <h3 className="text-xl font-bold text-brand-danger mb-3">Отказ от 50 000 ₽/мес</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Вы добровольно говорите "нет" гарантированному приросту от 
                    <span className="text-brand-accent font-bold"> 50 000 ₽</span> чистой выручки ежемесячно.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/5 backdrop-blur-sm border-brand-danger/30 hover-scale">
              <div className="flex gap-4">
                <div className="text-4xl flex-shrink-0">❌</div>
                <div>
                  <h3 className="text-xl font-bold text-brand-danger mb-3">Медленная потеря денег</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Менеджеры отвечают часами, а бот закрывает сделку за 
                    <span className="text-brand-accent font-bold"> 10 секунд</span>. 
                    Клиенты уходят к быстрым конкурентам.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/5 backdrop-blur-sm border-brand-danger/30 hover-scale">
              <div className="flex gap-4">
                <div className="text-4xl flex-shrink-0">❌</div>
                <div>
                  <h3 className="text-xl font-bold text-brand-danger mb-3">Добровольное отставание</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Конкуренты растут на <span className="text-brand-accent font-bold">30%</span>, 
                    пока вы платите за ручной труд. Вы дарите им свою долю рынка.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="results" ref={resultsRef} className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-dark">
              Результаты в цифрах
            </h2>
            <p className="text-xl text-gray-600">Средние показатели наших клиентов</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-10 animate-fade-in hover-scale border-0 shadow-xl bg-gradient-to-br from-brand-accent/10 to-blue-50">
              <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-brand-accent to-blue-500 bg-clip-text text-transparent mb-4">
                {savedMoney.toLocaleString('ru-RU')} ₽
              </div>
              <div className="text-xl font-semibold text-brand-dark">Сэкономлено в год</div>
              <p className="text-gray-600 mt-2">На зарплатах и рутинных задачах</p>
            </Card>

            <Card className="text-center p-10 animate-fade-in hover-scale border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50" style={{ animationDelay: '0.1s' }}>
              <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">
                {timeSaved.toLocaleString('ru-RU')} ч
              </div>
              <div className="text-xl font-semibold text-brand-dark">Времени освобождено</div>
              <p className="text-gray-600 mt-2">Для стратегических задач</p>
            </Card>

            <Card className="text-center p-10 animate-fade-in hover-scale border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50" style={{ animationDelay: '0.2s' }}>
              <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent mb-4">
                +{leadsGenerated}
              </div>
              <div className="text-xl font-semibold text-brand-dark">Новых лидов в месяц</div>
              <p className="text-gray-600 mt-2">Квалифицированных и готовых</p>
            </Card>
          </div>
        </div>
      </section>

      <section id="cta" className="py-24 px-4 bg-gradient-to-br from-brand-dark via-gray-900 to-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMEZGRkYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="container mx-auto max-w-3xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Перестаньте терять <span className="text-brand-accent">450 000 ₽</span> прямо сейчас
            </h2>
            <p className="text-xl text-gray-300">
              Оставьте заявку, и мы рассчитаем вашу персональную экономию за 15 минут
            </p>
          </div>

          {!formSubmitted ? (
            <Card className="p-10 bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-3 text-lg">Ваше имя</label>
                  <Input
                    type="text"
                    placeholder="Иван Иванов"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full h-14 text-lg rounded-xl border-2"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-3 text-lg">Телефон</label>
                  <Input
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full h-14 text-lg rounded-xl border-2"
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-brand-dark text-white hover:bg-brand-dark/90 text-lg py-7 font-bold rounded-xl shadow-xl hover-scale"
                >
                  <Icon name="Calculator" size={20} className="mr-2" />
                  Получить расчет экономии
                </Button>

                <p className="text-center text-sm text-gray-500 leading-relaxed">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности. 
                  Мы не передаем данные третьим лицам.
                </p>
              </form>
            </Card>
          ) : (
            <Card className="p-10 bg-white text-center animate-scale-in border-0 shadow-2xl rounded-3xl">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="CheckCircle2" className="text-green-600" size={48} />
              </div>
              <h3 className="text-3xl font-bold text-brand-dark mb-4">Заявка принята!</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Мы остановим ваши потери денег в ближайшее время. 
                Наш менеджер свяжется с вами в течение <span className="font-bold text-brand-dark">15 минут</span> 
                и рассчитает персональную экономию для вашего бизнеса.
              </p>
            </Card>
          )}
        </div>
      </section>

      <footer className="bg-brand-dark text-white py-12 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-accent to-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-xl">⚡</span>
              </div>
              <span className="text-xl font-bold">BotWise Prod</span>
            </div>
            <p className="text-gray-400 text-center md:text-left">
              © 2024 BotWise Prod. Перестаньте терять деньги — начните зарабатывать.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
