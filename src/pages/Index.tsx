import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import func2url from '../../backend/func2url.json';

const HERO_IMG = 'https://cdn.poehali.dev/projects/669d20ef-baad-48f0-a733-86439ed2c669/files/255e3ff0-250a-460b-b8cc-f7f9108e2e2f.jpg';

const nav = [
  { label: 'Преимущества', href: '#advantages' },
  { label: 'Типы фольги', href: '#types' },
  { label: 'Цены', href: '#pricing' },
  { label: 'Сертификаты', href: '#certs' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#contacts' },
];

const advantages = [
  { icon: 'Factory', title: 'Собственное производство', text: 'Полный цикл от сырья до готового рулона. Контроль качества на каждом этапе.' },
  { icon: 'Truck', title: 'Доставка по всей России', text: 'Отгружаем со склада за 24 часа. Транспортная логистика под ключ.' },
  { icon: 'Layers', title: 'Любая толщина и ширина', text: 'От 6 до 200 микрон. Резка под ваши задачи и оборудование.' },
  { icon: 'BadgePercent', title: 'Оптовые цены', text: 'Прямые контракты без посредников. Гибкая система скидок от объёма.' },
  { icon: 'ShieldCheck', title: 'Гарантия качества', text: 'Соответствие ГОСТ и ISO. Замена брака и сопровождение сделки.' },
  { icon: 'Headset', title: 'Персональный менеджер', text: 'Подберём марку фольги под задачу и рассчитаем спецификацию бесплатно.' },
];

const types = [
  { icon: 'ChefHat', name: 'Пищевая фольга', spec: '9–20 мкм', desc: 'Для упаковки, запекания и хранения продуктов. Пищевой алюминий А5–А7.', tag: 'HoReCa' },
  { icon: 'Package', name: 'Упаковочная фольга', spec: '7–12 мкм', desc: 'Ламинированная и кашированная для гибкой упаковки и флекс-печати.', tag: 'Упаковка' },
  { icon: 'Wrench', name: 'Техническая фольга', spec: '30–200 мкм', desc: 'Для тепло- и звукоизоляции, экранов и промышленного применения.', tag: 'Промышленность' },
  { icon: 'Sparkles', name: 'Фольга для тиснения', spec: '12–25 мкм', desc: 'Металлизированная переводная фольга для полиграфии и декора.', tag: 'Полиграфия' },
];

const pricing = [
  {
    name: 'СТАРТ', price: '890', unit: '₽ / кг', highlight: false,
    features: ['Партия от 100 кг', 'Стандартная толщина', 'Отгрузка за 3 дня', 'Базовая консультация'],
  },
  {
    name: 'БИЗНЕС', price: '740', unit: '₽ / кг', highlight: true,
    features: ['Партия от 500 кг', 'Индивидуальная нарезка', 'Отгрузка за 24 часа', 'Персональный менеджер', 'Отсрочка платежа'],
  },
  {
    name: 'ОПТ', price: 'от 590', unit: '₽ / кг', highlight: false,
    features: ['Партия от 2 тонн', 'Любые спецификации', 'Приоритетная логистика', 'Индивидуальный договор', 'Складская программа'],
  },
];

const certs = [
  { icon: 'FileCheck2', title: 'Сертификат ГОСТ Р', text: 'Соответствие ГОСТ 745-2003 для алюминиевой фольги.' },
  { icon: 'Award', title: 'ISO 9001:2015', text: 'Международный стандарт системы менеджмента качества.' },
  { icon: 'FlaskConical', title: 'Декларация пищевой безопасности', text: 'Разрешение на контакт с пищевыми продуктами.' },
  { icon: 'Leaf', title: 'Экологический сертификат', text: 'Подтверждение соответствия нормам экобезопасности.' },
];

const reviews = [
  { name: 'Анна Ковалёва', role: 'Закупки, «ХлебГрад»', text: 'Работаем второй год. Всегда стабильное качество и отгрузка точно в срок. Менеджер на связи 24/7.', rating: 5 },
  { name: 'Дмитрий Орлов', role: 'Директор, «ТермоПласт»', text: 'Заказываем техническую фольгу тоннами. Цены реально ниже рынка, документы приходят вовремя.', rating: 5 },
  { name: 'Елена Мороз', role: 'Технолог, ресторан «Веранда»', text: 'Пищевая фольга отличная — плотная, не рвётся. Перешли полностью на FOILPRO.', rating: 5 },
];

const Index = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', contact: '', message: '' });
  const [loading, setLoading] = useState(false);

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim()) {
      toast({ title: 'Заполните имя и контакт', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(func2url['send-lead'], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast({ title: 'Заявка отправлена!', description: 'Мы свяжемся с вами в течение часа.' });
      setForm({ name: '', contact: '', message: '' });
    } catch {
      toast({ title: 'Не удалось отправить', description: 'Попробуйте позже или позвоните нам.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 glass">
        <div className="container flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2 font-display font-700 text-xl tracking-wide">
            <Icon name="Layers" className="text-primary" size={26} />
            FOIL<span className="text-gradient">PRO</span>
          </a>
          <nav className="hidden lg:flex items-center gap-7 text-sm text-muted-foreground">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-foreground transition-colors">{n.label}</a>
            ))}
          </nav>
          <Button className="bg-primary text-primary-foreground hover:opacity-90 font-600 rounded-full">
            Получить прайс
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-32 pb-24 grid-bg">
        <div className="absolute top-20 -left-40 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[130px]" />
        <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm text-muted-foreground mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Производство и оптовые поставки с 2009 года
            </div>
            <h1 className="font-display font-700 text-5xl md:text-7xl leading-[1.05] uppercase tracking-tight">
              Фольга<br /><span className="text-gradient">промышленного</span><br />класса
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Пищевая, упаковочная и техническая фольга напрямую с завода. Сертифицированное качество и цены без посредников.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:opacity-90 font-600 rounded-full h-13 px-8 text-base">
                <Icon name="Calculator" size={18} className="mr-2" /> Рассчитать стоимость
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-13 px-8 text-base border-white/20 hover:bg-white/5">
                <Icon name="Download" size={18} className="mr-2" /> Скачать каталог
              </Button>
            </div>
            <div className="mt-12 flex gap-8">
              {[['15+', 'лет на рынке'], ['3 500 т', 'отгружаем в год'], ['800+', 'клиентов B2B']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display font-700 text-3xl text-gradient">{n}</div>
                  <div className="text-sm text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-0 foil-surface rounded-3xl blur-2xl opacity-60 animate-gradient-move" />
            <img src={HERO_IMG} alt="Рулоны фольги FOILPRO" className="relative rounded-3xl w-full aspect-square object-cover border border-white/10 animate-float shadow-2xl" />
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="py-24 relative">
        <div className="container">
          <SectionTitle kicker="Почему мы" title="Преимущества работы с нами" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
            {advantages.map((a) => (
              <div key={a.title} className="glass glass-hover rounded-2xl p-7">
                <div className="w-12 h-12 rounded-xl foil-surface flex items-center justify-center mb-5">
                  <Icon name={a.icon} size={24} className="text-primary" />
                </div>
                <h3 className="font-display font-600 text-xl mb-2">{a.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TYPES */}
      <section id="types" className="py-24 relative grid-bg">
        <div className="container">
          <SectionTitle kicker="Ассортимент" title="Типы фольги и характеристики" />
          <div className="grid sm:grid-cols-2 gap-5 mt-14">
            {types.map((t) => (
              <div key={t.name} className="glass glass-hover rounded-2xl p-8 flex gap-6">
                <div className="w-14 h-14 shrink-0 rounded-xl foil-surface flex items-center justify-center">
                  <Icon name={t.icon} size={26} className="text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display font-600 text-xl">{t.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/15 text-secondary border border-secondary/20">{t.tag}</span>
                  </div>
                  <div className="text-sm text-accent font-600 mb-2">Толщина: {t.spec}</div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 relative">
        <div className="container">
          <SectionTitle kicker="Тарифы" title="Цены и пакеты поставки" />
          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {pricing.map((p) => (
              <div key={p.name} className={`relative rounded-3xl p-8 ${p.highlight ? 'foil-surface border-2 border-primary/40 animate-gradient-move' : 'glass glass-hover'}`}>
                {p.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-600 px-4 py-1 rounded-full bg-primary text-primary-foreground">
                    Популярный
                  </span>
                )}
                <div className="font-display font-700 text-2xl tracking-wide">{p.name}</div>
                <div className="mt-4 flex items-end gap-1">
                  <span className="font-display font-700 text-5xl text-gradient">{p.price}</span>
                  <span className="text-muted-foreground mb-1">{p.unit}</span>
                </div>
                <ul className="mt-7 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <Icon name="Check" size={18} className="text-primary shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Button className={`w-full mt-8 rounded-full h-12 font-600 ${p.highlight ? 'bg-background text-foreground hover:opacity-90' : 'bg-primary text-primary-foreground hover:opacity-90'}`}>
                  Оставить заявку
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTS */}
      <section id="certs" className="py-24 relative grid-bg">
        <div className="container">
          <SectionTitle kicker="Документация" title="Сертификаты качества" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
            {certs.map((c) => (
              <div key={c.title} className="glass glass-hover rounded-2xl p-7 text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl foil-surface flex items-center justify-center mb-5">
                  <Icon name={c.icon} size={26} className="text-accent" />
                </div>
                <h3 className="font-display font-600 text-lg mb-2">{c.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
          <div className="glass rounded-2xl p-6 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Icon name="FolderCheck" size={28} className="text-primary" />
              <div>
                <div className="font-600">Полный пакет документов на продукцию</div>
                <div className="text-sm text-muted-foreground">Паспорта качества, декларации соответствия и протоколы испытаний</div>
              </div>
            </div>
            <Button variant="outline" className="rounded-full border-white/20 hover:bg-white/5 shrink-0">
              <Icon name="Download" size={18} className="mr-2" /> Скачать документы
            </Button>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 relative">
        <div className="container">
          <SectionTitle kicker="Отзывы" title="Нам доверяют" />
          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {reviews.map((r) => (
              <div key={r.name} className="glass glass-hover rounded-2xl p-8">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Icon key={i} name="Star" size={18} className="text-accent fill-current" />
                  ))}
                </div>
                <p className="text-foreground/90 leading-relaxed mb-6">«{r.text}»</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full foil-surface flex items-center justify-center font-display font-600 text-primary">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-600">{r.name}</div>
                    <div className="text-sm text-muted-foreground">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 relative grid-bg">
        <div className="container">
          <div className="relative foil-surface animate-gradient-move rounded-3xl p-10 md:p-14 overflow-hidden border border-white/10">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />
            <div className="relative grid lg:grid-cols-2 gap-10">
              <div>
                <SectionTitle kicker="Контакты" title="Запросите коммерческое предложение" left />
                <p className="text-muted-foreground mt-4 max-w-md">Оставьте контакты — рассчитаем стоимость под ваш объём и пришлём прайс в течение часа.</p>
                <div className="mt-8 space-y-4">
                  {[
                    { icon: 'Phone', label: '+7 (800) 555-01-09' },
                    { icon: 'Mail', label: 'sales@foilpro.ru' },
                    { icon: 'MapPin', label: 'Москва, Промзона «Металлург», склад 12' },
                  ].map((c) => (
                    <div key={c.label} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
                        <Icon name={c.icon} size={18} className="text-primary" />
                      </div>
                      <span>{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <form className="glass rounded-2xl p-7 space-y-4" onSubmit={submitLead}>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" className="w-full h-12 rounded-xl bg-background/40 border border-white/10 px-4 outline-none focus:border-primary/50 transition-colors" />
                <input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder="Телефон или email" className="w-full h-12 rounded-xl bg-background/40 border border-white/10 px-4 outline-none focus:border-primary/50 transition-colors" />
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Какая фольга и объём вам нужны?" rows={3} className="w-full rounded-xl bg-background/40 border border-white/10 px-4 py-3 outline-none focus:border-primary/50 transition-colors resize-none" />
                <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground hover:opacity-90 rounded-full h-12 font-600">
                  {loading ? 'Отправляем...' : 'Получить прайс-лист'}
                </Button>
                <p className="text-xs text-muted-foreground text-center">Нажимая кнопку, вы соглашаетесь с политикой обработки данных</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-display font-700 text-lg text-foreground">
            <Icon name="Layers" className="text-primary" size={22} />
            FOIL<span className="text-gradient">PRO</span>
          </div>
          <p>© 2026 FOILPRO. Производство и поставка алюминиевой фольги.</p>
        </div>
      </footer>
    </div>
  );
};

const SectionTitle = ({ kicker, title, left }: { kicker: string; title: string; left?: boolean }) => (
  <div className={left ? '' : 'text-center max-w-2xl mx-auto'}>
    <div className="inline-flex items-center gap-2 text-primary text-sm font-600 uppercase tracking-widest">
      <span className="w-8 h-px bg-primary" /> {kicker}
    </div>
    <h2 className="font-display font-700 text-4xl md:text-5xl uppercase tracking-tight mt-3">{title}</h2>
  </div>
);

export default Index;