/* ========================================
   Week 15 - Thai Food Randomizer
   JavaScript
   ======================================== */

const foodMenu = [
  {
    id: 1,
    name: 'ผัดไทยกุ้งสด',
    nameEn: 'Pad Thai Goong',
    description:
      'เส้นจีนผัดกับไข่ กุ้งสด ถั่วงอก กุยช่าย และถั่วลิสงคั่ว รสชาติเปรี้ยวหวานเค็มกลมกล่อม แบบต้นตำรับไทยแท้',
    price: '120',
    image: 'images/pad-thai.jpg',
    tag: 'ยอดนิยม'
  },
  {
    id: 2,
    name: 'ต้มยำกุ้ง',
    nameEn: 'Tom Yum Goong',
    description:
      'ต้มยำน้ำข้นรสจัดจ้านกับกุ้งตัวโต เห็ดฟาง ตะไคร้ ใบมะกรูด และข่า ร้อนแรงถึงใจ เหมาะกับคนชอบรสเผ็ดเปรี้ยว',
    price: '150',
    image: 'images/tom-yum.jpg',
    tag: 'รสจัดจ้าน'
  },
  {
    id: 3,
    name: 'ส้มตำไทย',
    nameEn: 'Som Tum Thai',
    description:
      'มะละกอสับคลุกกับมะเขือเทศ ถั่วฝักยาว ถั่วลิสงคั่ว มะนาว และพริกสด รสเปรี้ยวเผ็ดหวาน เผ็ดร้อนถูกปากคนไทย',
    price: '60',
    image: 'images/som-tum.webp',
    tag: 'สไตล์อีสาน'
  },
  {
    id: 4,
    name: 'แกงเขียวหวานไก่',
    nameEn: 'Green Curry Chicken',
    description:
      'แกงเขียวหวานหอมกะทิกับเนื้อไก่นุ่ม มะเขือพวง ใบมะกรูด และพริกชี้ฟ้า หวานมันกลมกล่อม รับประทานกับข้าวสวยร้อนๆ',
    price: '110',
    image: 'images/green-curry.jpeg',
    tag: 'แกงหอมมัน'
  },
  {
    id: 5,
    name: 'ผัดกะเพราไก่ไข่ดาว',
    nameEn: 'Basil Chicken with Fried Egg',
    description:
      'ผัดกะเพราไก่สับหอมๆ กับพริกสดและกระเพราแท้ ราดข้าวสวยร้อนๆ พร้อมไข่ดาวกรอบนอกนุ่มใน เมนูขวัญใจคนไทย',
    price: '95',
    image: 'images/basil-chicken.jpg',
    tag: 'ขวัญใจมหาชน'
  }
];

const foodImageEl = document.getElementById('foodImage');
const imagePlaceholderEl = document.getElementById('imagePlaceholder');
const foodNameEl = document.getElementById('foodName');
const foodDescEl = document.getElementById('foodDesc');
const foodPriceEl = document.getElementById('foodPrice');
const foodTagEl = document.getElementById('foodTag');
const randomizeBtn = document.getElementById('randomizeBtn');
const foodCardEl = document.getElementById('foodCard');
const menuGridEl = document.getElementById('menuGrid');

let lastSelectedIndex = -1;
let imageLoadTimer = null;
let imageSettled = false;

function getRandomFood() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * foodMenu.length);
  } while (foodMenu.length > 1 && randomIndex === lastSelectedIndex);

  lastSelectedIndex = randomIndex;
  return foodMenu[randomIndex];
}

function settleImage() {
  if (imageSettled) return;
  imageSettled = true;
  if (imageLoadTimer) {
    clearTimeout(imageLoadTimer);
    imageLoadTimer = null;
  }
}

function showImageFallback() {
  imagePlaceholderEl.innerHTML = `
    <div style="font-size: 4rem;">🍜</div>
    <div style="margin-top: 10px; font-size: 0.95rem; font-weight: 600;">โหลดรูปภาพไม่สำเร็จ</div>
    <div style="margin-top: 4px; font-size: 0.8rem; color: var(--gray-text);">ลองกดสุ่มอีกครั้ง</div>
  `;
  imagePlaceholderEl.style.display = 'flex';
  foodImageEl.style.display = 'none';
  foodImageEl.classList.remove('loaded');
}

function showImageSuccess() {
  if (imageSettled) return;
  imageSettled = true;
  if (imageLoadTimer) {
    clearTimeout(imageLoadTimer);
    imageLoadTimer = null;
  }
  console.log('[Week15] รูปแสดงผลแล้ว:', foodImageEl.src);
  imagePlaceholderEl.style.display = 'none';
  foodImageEl.classList.add('loaded');
  foodImageEl.style.opacity = '1';
}

function updateFoodDisplay(food) {
  foodCardEl.classList.remove('shake');
  void foodCardEl.offsetWidth;
  foodCardEl.classList.add('shake');

  foodImageEl.classList.remove('loaded');
  foodImageEl.style.display = 'block';
  foodImageEl.style.opacity = '0';
  imagePlaceholderEl.style.display = 'flex';

  if (imageLoadTimer) {
    clearTimeout(imageLoadTimer);
    imageLoadTimer = null;
  }
  imageSettled = false;

  foodImageEl.onload = null;
  foodImageEl.onerror = null;

  foodImageEl.onload = () => {
    showImageSuccess();
  };

  foodImageEl.onerror = () => {
    console.error('[Week15] โหลดรูปไม่สำเร็จ:', food.image);
    settleImage();
    showImageFallback();
  };

  foodImageEl.src = food.image;
  foodImageEl.alt = `รูปภาพ ${food.name}`;

  // กรณีรูปอยู่ใน cache แล้ว complete จะเป็น true ทันที หลังกำหนด src
  if (foodImageEl.complete && foodImageEl.naturalWidth !== 0) {
    showImageSuccess();
  } else {
    imageLoadTimer = setTimeout(() => {
      if (!imageSettled) {
        console.warn('[Week15] หมดเวลารอรูป:', food.image);
        showImageFallback();
      }
    }, 8000);
  }

  foodNameEl.textContent = food.name;
  foodDescEl.textContent = food.description;
  foodPriceEl.textContent = `${food.price} บาท`;
  foodTagEl.textContent = food.tag;
}

function handleRandomize() {
  randomizeBtn.disabled = true;
  randomizeBtn.querySelector('.btn-text').textContent = 'กำลังสุ่ม...';

  setTimeout(() => {
    const food = getRandomFood();
    updateFoodDisplay(food);

    randomizeBtn.disabled = false;
    randomizeBtn.querySelector('.btn-text').textContent = 'สุ่มเมนูอาหาร';
  }, 600);
}

function renderAllMenu() {
  menuGridEl.innerHTML = foodMenu.map((food) => `
    <div class="menu-item">
      <img src="${food.image}" alt="${food.name}" loading="lazy" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22200%22><text x=%2250%22 y=%2250%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2218%22 fill=%22%23999%22>ไม่พบรูป</text></svg>'">
      <div class="menu-item-content">
        <h3>${food.name}</h3>
        <p>${food.description}</p>
        <div class="menu-item-price">${food.price} บาท</div>
      </div>
    </div>
  `).join('');
}

randomizeBtn.addEventListener('click', handleRandomize);

randomizeBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleRandomize();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  console.log('[Week15] หน้าเว็บโหลดแล้ว กำลังแสดงเมนูแรก...');
  updateFoodDisplay(foodMenu[0]);
  renderAllMenu();

  const navToggle = document.getElementById('navToggle');
  const navMenu = document.querySelector('.nav-menu');

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const spans = navToggle.querySelectorAll('span');
    spans.forEach((span) => span.classList.toggle('active'));
  });

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      document.querySelectorAll('.nav-toggle span').forEach((span) => {
        span.classList.remove('active');
      });
    });
  });
});
