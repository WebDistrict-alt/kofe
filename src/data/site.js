export const navLinks = [
  { id: 'bestsellers', label: 'Хиты' },
  { id: 'menu', label: 'Меню' },
  { id: 'about', label: 'О нас' },
  { id: 'gallery', label: 'Галерея' },
  { id: 'contacts', label: 'Контакты' },
]

export const contacts = {
  address: 'Москва, ул. Малая Бронная, 24',
  metro: 'м. Пушкинская, 7 минут пешком',
  phone: '+7 (495) 120-24-24',
  phoneHref: 'tel:+74951202424',
  email: 'hello@aroma.coffee',
  lat: 55.7627,
  lon: 37.5927,
  // [day index from Date.getDay(), open hour, close hour]
  hours: [
    { label: 'Пн — Пт', time: '07:30 — 22:00', days: [1, 2, 3, 4, 5], open: 7.5, close: 22 },
    { label: 'Сб — Вс', time: '09:00 — 23:00', days: [0, 6], open: 9, close: 23 },
  ],
  socials: [
    { name: 'Instagram', handle: '@aroma.coffee', href: 'https://instagram.com/', icon: 'instagram' },
    { name: 'Telegram', handle: 't.me/aromacoffee', href: 'https://t.me/', icon: 'send' },
    { name: 'Почта', handle: 'hello@aroma.coffee', href: 'mailto:hello@aroma.coffee', icon: 'mail' },
  ],
}

export const gallery = [
  { id: '1501339847302-ac426a4a7cbb', category: 'interior', alt: 'Неоновая вывеска и подвесные лампы в зале кофейни' },
  { id: '1541167760496-1628856ab772', category: 'craft', alt: 'Бариста вливает молоко и рисует латте-арт' },
  { id: '1578985545062-69928b1d9587', category: 'desserts', alt: 'Шоколадный торт с кремовыми розетками' },
  { id: '1495474472287-4d71bcdd2085', category: 'mood', alt: 'Друзья чокаются чашками капучино' },
  { id: '1453614512568-c4024d13c247', category: 'interior', alt: 'Барная стойка с кофемолками и полками' },
  { id: '1442512595331-e89e73853f31', category: 'craft', alt: 'Заваривание кофе в воронке V60 и кемексе' },
  { id: '1495147466023-ac5c588e2e94', category: 'desserts', alt: 'Тарталетки со свежими ягодами' },
  { id: '1559925393-8be0ec4767c8', category: 'mood', alt: 'Летняя веранда кофейни на европейской улочке' },
  { id: '1554118811-1e0d58224f24', category: 'interior', alt: 'Светлый зал с растениями и мягкими креслами' },
  { id: '1511920170033-f8396924c348', category: 'craft', alt: 'Холдер со свежемолотым кофе и зёрна' },
  { id: '1586985289688-ca3cf47d3e6e', category: 'desserts', alt: 'Кондитер украшает торт кремом' },
  { id: '1509042239860-f550ce710b93', category: 'mood', alt: 'Три чашки капучино среди зелени' },
  { id: '1445116572660-236099ec97a0', category: 'interior', alt: 'Столики у панорамных окон' },
  { id: '1514066558159-fc8c737ef259', category: 'craft', alt: 'Бариста наливает молоко в стакан с эспрессо' },
  { id: '1587314168485-3236d6710814', category: 'desserts', alt: 'Блинчики с клубникой и взбитыми сливками' },
  { id: '1594631252845-29fc4cc8cde9', category: 'mood', alt: 'Чай, свечи и книга тёплым вечером' },
]

export const galleryCategories = [
  { id: 'all', label: 'Всё' },
  { id: 'interior', label: 'Интерьер' },
  { id: 'craft', label: 'Приготовление' },
  { id: 'desserts', label: 'Десерты' },
  { id: 'mood', label: 'Атмосфера' },
]
