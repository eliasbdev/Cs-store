// ============================================
// PRACTICE SITE - may sadyang mga butas dito
// ============================================

// TODO (Practice #2): Huwag itong gawin sa totoong project!
// Halimbawa lang ito kung paano "nagle-leak" ang mga tao ng secret keys
// sa commit history. Hanapin mo ito at tanggalin, tapos i-imagine kung
// paano mo ito mase-secret scan sa GitHub.
// const FAKE_API_KEY = "sk-demo-12345-hindi-totoo-pero-ganito-ang itsura";

// --- Comment box (Practice #1: XSS via innerHTML) ---
const commentInput = document.getElementById('commentInput');
const commentBtn = document.getElementById('commentBtn');
const commentList = document.getElementById('commentList');

commentBtn.addEventListener('click', () => {
  const text = commentInput.value;

  // VULNERABLE: direkta itong nilalagay sa innerHTML.
  // Kung mag-type ang user ng <script> o <img onerror=...>, tatakbo ito.
  // FIX na pwede mong subukan: gamitin ang textContent sa halip,
  // o gumawa ng text node gamit ang document.createElement.
  const entry = document.createElement('div');
  entry.className = 'comment';
  entry.innerHTML = text; // <-- ito yung butas

  commentList.appendChild(entry);
  commentInput.value = '';
});

// --- Cart demo (Practice #3: localStorage, hindi secure storage) ---
const addToCartBtn = document.getElementById('addToCartBtn');
const cartList = document.getElementById('cartList');
const productName = document.getElementById('productName');

function loadCart() {
  const saved = JSON.parse(localStorage.getItem('cart') || '[]');
  cartList.innerHTML = '';
  saved.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item; // ito ang tamang paraan - textContent, hindi innerHTML
    cartList.appendChild(li);
  });
}

addToCartBtn.addEventListener('click', () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.push(productName.value);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
});

loadCart();

// --- Subscribe CTA form (Practice #5: parehong butas, ibang lugar) ---
const subBtn = document.getElementById('subBtn');
const subName = document.getElementById('subName');
const subGreeting = document.getElementById('subGreeting');

subBtn.addEventListener('click', () => {
  const name = subName.value;

  // VULNERABLE ulit: subukan mong ayusin ito mag-isa gamit ang
  // aralin natin kanina sa comment box.
  subGreeting.innerHTML = 'Salamat sa pag-subscribe, ' + name + '!';
});
