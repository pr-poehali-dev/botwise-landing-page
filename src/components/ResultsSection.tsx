import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

export default function ResultsSection() {
  const [savedMoney, setSavedMoney] = useState(0);
  const [timeSaved, setTimeSaved] = useState(0);
  const [leadsGenerated, setLeadsGenerated] = useState(0);
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

  return (
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
  );
}
