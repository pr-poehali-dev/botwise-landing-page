import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function CTAForm() {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && /\d/.test(formData.phone)) {
      setFormSubmitted(true);
    }
  };

  return (
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
  );
}
