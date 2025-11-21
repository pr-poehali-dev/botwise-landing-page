import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import DemoChat from '@/components/DemoChat';
import ResultsSection from '@/components/ResultsSection';
import CTAForm from '@/components/CTAForm';

export default function Index() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={scrollToSection} />

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
            <div className="md:col-span-2 md:row-span-2">
              <DemoChat />
            </div>

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

      <ResultsSection />

      <CTAForm />

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
