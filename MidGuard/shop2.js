// ==========================================
// 1. MOCK DATABASE
// ==========================================
const mockProducts = [
    {
        id: 1, roomId: "102938", name: "Samsung Galaxy Watch 8 Classic",
        price: 34999, mrp: 45999, duration: "3 Months", warranty: "9 Months Remaining",
        box: "Available", invoice: "Available", descTitle: "Premium Classic Smartwatch",
        descText: "Barely used Samsung Galaxy Watch 8 Classic. Comes with the original rotating bezel and leather strap. Pristine condition with no scratches on the AMOLED display.",
        images: ["https://m.media-amazon.com/images/I/81JhHZ4XSpL._SX679_.jpg", "https://placehold.co/600x600/E2E8F0/1E293B?text=Watch+Side+View", "https://placehold.co/600x600/E2E8F0/1E293B?text=Watch+Back", "https://placehold.co/600x600/E2E8F0/1E293B?text=Original+Box"]
    },
    {
        id: 2, roomId: "482719", name: "Nike Shoes",
        price: 2499, mrp: 4999, duration: "1 Month", warranty: "No Warranty",
        box: "Available", invoice: "Not Available", descTitle: "Lightweight Running Shoes",
        descText: "Worn only a few times indoors. Soles are practically brand new. Great for casual running or gym workouts. Size 10 US.",
        images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop", "https://placehold.co/600x600/E2E8F0/1E293B?text=Shoe+Top+View", "https://placehold.co/600x600/E2E8F0/1E293B?text=Shoe+Soles", "https://placehold.co/600x600/E2E8F0/1E293B?text=Shoe+Box"]
    },
    {
        id: 3, roomId: "748392", name: "Ray-Ban Sunglasses",
        price: 3999, mrp: 6999, duration: "6 Months", warranty: "Expired",
        box: "Original Case Available", invoice: "Available", descTitle: "Classic Aviator Style",
        descText: "Original Ray-Ban sunglasses. Lenses are polarized and scratch-free. The metal frame has very minor wear on the earpiece.",
        images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", "https://placehold.co/600x600/E2E8F0/1E293B?text=Side+Angle", "https://placehold.co/600x600/E2E8F0/1E293B?text=Lens+Close-up", "https://placehold.co/600x600/E2E8F0/1E293B?text=Leather+Case"]
    },
    {
        id: 4, roomId: "993847", name: "Apple 2025 MacBook Pro Laptop (M5)",
        price: 124900, mrp: 149900, duration: "2 Months", warranty: "10 Months Remaining",
        box: "Available", invoice: "Available", descTitle: "Absolute Powerhouse",
        descText: "Apple 2025 MacBook Pro with the latest M5 chip. 16GB Unified Memory, 512GB SSD. Space Black. Battery cycle count is under 30. Like-new condition.",
        images: ["https://m.media-amazon.com/images/I/615tKndaduL._SX679_.jpg", "https://placehold.co/600x600/E2E8F0/1E293B?text=Keyboard+View", "https://placehold.co/600x600/E2E8F0/1E293B?text=Ports+Side", "https://placehold.co/600x600/E2E8F0/1E293B?text=MacBook+Closed"]
    },
    {
        id: 5, roomId: "228374", name: "Samsung 125 cm (50 inches) Crystal 4K TV",
        price: 36999, mrp: 54999, duration: "1 Year", warranty: "Expired",
        box: "Not Available", invoice: "Available", descTitle: "Stunning 4K Visuals",
        descText: "Upgrading to a larger screen, so selling this 50-inch 4K TV. No dead pixels. Includes the original remote. Must be picked up locally.",
        images: ["https://m.media-amazon.com/images/I/81UGU8btwmL._SX679_.jpg", "https://placehold.co/600x600/E2E8F0/1E293B?text=TV+Side+Profile", "https://placehold.co/600x600/E2E8F0/1E293B?text=Ports+Back", "https://placehold.co/600x600/E2E8F0/1E293B?text=Remote+Control"]
    },
    {
        id: 6, roomId: "556473", name: "Samsung 215 L Direct-Cool Refrigerator",
        price: 19499, mrp: 24999, duration: "8 Months", warranty: "4 Months Remaining",
        box: "Not Available", invoice: "Available", descTitle: "Energy Efficient 5-Star Fridge",
        descText: "Single door refrigerator in Paradise Bloom Blue. Excellent cooling. Base stand drawer included. Moving out of the city, need to sell ASAP.",
        images: ["https://m.media-amazon.com/images/I/71nQw1hLlZL._AC_UY436_FMwebp_QL65_.jpg", "https://placehold.co/600x600/E2E8F0/1E293B?text=Fridge+Open", "https://placehold.co/600x600/E2E8F0/1E293B?text=Freezer+Section", "https://placehold.co/600x600/E2E8F0/1E293B?text=Base+Drawer"]
    }
];

// ==========================================
// 2. GLOBAL EVENT LISTENER (Handles all Buttons & Modals)
// ==========================================
document.addEventListener('click', (e) => {

    // --- ADD TO CART LOGIC ---
    const addBtn = e.target.closest('.add-to-cart-btn');
    if (addBtn) {
        let cart = JSON.parse(localStorage.getItem('midguard_cart')) || [];
        let prodId, name, price, img;

        const card = addBtn.closest('.product-card');
        if (card) {
            const link = card.querySelector('a');
            prodId = link ? parseInt(new URLSearchParams(link.search).get('id')) : Date.now();
            name = card.dataset.name;
            price = parseFloat(card.dataset.price.toString().replace(/[₹,]/g, ''));
            img = card.querySelector('img').src;
        } else if (window.location.pathname.includes('product.html')) {
            prodId = parseInt(new URLSearchParams(window.location.search).get('id')) || 1;
            const dbProduct = mockProducts.find(p => p.id === prodId);
            if (dbProduct) {
                name = dbProduct.name;
                price = dbProduct.price;
                img = dbProduct.images[0];
            }
        }

        const existing = cart.find(i => i.id === prodId || i.name === name);
        if (!existing && name && price) {
            cart.push({ id: prodId, name: name, price: price, img: img, quantity: 1 });
            localStorage.setItem('midguard_cart', JSON.stringify(cart));
        }

        addBtn.innerHTML = "Added <i class='bx bx-check'></i>";
        addBtn.classList.add('is-added');
    }

    // --- BUY NOW LOGIC (ISOLATED PURCHASE) ---
    const buyNowBtn = e.target.closest('.buy-now-btn');
    if (buyNowBtn) {
        let prodId;
        const card = buyNowBtn.closest('.product-card');

        if (card) {
            const link = card.querySelector('a');
            prodId = link ? parseInt(new URLSearchParams(link.search).get('id')) : null;
        } else if (window.location.pathname.includes('product.html')) {
            prodId = parseInt(new URLSearchParams(window.location.search).get('id')) || 1;
        }

        if (prodId) {
            window.location.href = `checkout.html?buy_now=${prodId}`;
        }
    }

    // --- WISHLIST HEART LOGIC ---
    const wishBtn = e.target.closest('.wishlist-btn');
    if (wishBtn) {
        let wishlist = JSON.parse(localStorage.getItem('midguard_wishlist')) || [];
        let prodId, name, price, img;

        const card = wishBtn.closest('.product-card');
        if (card) {
            const link = card.querySelector('a');
            prodId = link ? parseInt(new URLSearchParams(link.search).get('id')) : Date.now();
            name = card.dataset.name || card.querySelector('h3').textContent;
            price = card.dataset.price ? parseFloat(card.dataset.price.toString().replace(/[₹,]/g, '')) : 0;
            img = card.querySelector('img').src;
        } else if (window.location.pathname.includes('product.html')) {
            prodId = parseInt(new URLSearchParams(window.location.search).get('id')) || 1;
            const dbProduct = mockProducts.find(p => p.id === prodId);
            if (dbProduct) {
                name = dbProduct.name;
                price = dbProduct.price;
                img = dbProduct.images[0];
            }
        }

        const index = wishlist.findIndex(item => item.id === prodId);
        const icon = wishBtn.querySelector('i');

        if (index === -1) {
            wishlist.push({ id: prodId, name: name, price: price, img: img });
            wishBtn.classList.add('active');
            if (icon) icon.classList.replace('bx-heart', 'bxs-heart');
        } else {
            wishlist.splice(index, 1);
            wishBtn.classList.remove('active');
            if (icon) icon.classList.replace('bxs-heart', 'bx-heart');
        }
        localStorage.setItem('midguard_wishlist', JSON.stringify(wishlist));
    }

    // --- CART PAGE LOGIC (Quantity & Remove) ---
    if (document.querySelector('.cart-page')) {
        let cart = JSON.parse(localStorage.getItem('midguard_cart')) || [];
        const btn = e.target;

        if (btn.classList.contains('remove-btn') || btn.classList.contains('quantity-btn')) {
            const itemId = btn.dataset.id;
            const index = cart.findIndex(i => i.id == itemId);

            if (btn.classList.contains('remove-btn') && index !== -1) {
                cart.splice(index, 1);
            } else if (btn.classList.contains('quantity-btn') && index !== -1) {
                if (btn.classList.contains('plus')) cart[index].quantity++;
                else if (btn.classList.contains('minus')) cart[index].quantity = Math.max(1, cart[index].quantity - 1);
            }

            localStorage.setItem('midguard_cart', JSON.stringify(cart));
            if (typeof renderCart === 'function') renderCart();
        }
    }

    // --- QUICK VIEW MODAL LOGIC ---
    const modal = document.getElementById('quickViewModal');
    const backdrop = document.getElementById('backdrop');
    const quickViewBtn = e.target.closest('.quick-view-btn');

    if (quickViewBtn) {
        e.preventDefault();
        const productId = parseInt(quickViewBtn.dataset.id);
        const product = mockProducts.find(p => p.id === productId);

        if (product) {
            document.getElementById('modalImage').src = product.images[0];
            document.getElementById('modalProductName').textContent = product.name;
            document.getElementById('modalProductPrice').textContent = `₹${product.price.toLocaleString('en-IN')}`;
            document.getElementById('modalProductMRP').textContent = `₹${product.mrp.toLocaleString('en-IN')}`;
            document.getElementById('modalProductDesc').textContent = product.descText;
            document.getElementById('modalWarranty').textContent = product.warranty;
            document.getElementById('modalBox').textContent = product.box;
            document.getElementById('modalViewFull').href = `product.html?id=${product.id}`;

            const cart = JSON.parse(localStorage.getItem('midguard_cart')) || [];
            const wishlist = JSON.parse(localStorage.getItem('midguard_wishlist')) || [];
            const inCart = cart.some(i => i.id === product.id);
            const inWishlist = wishlist.some(i => i.id === product.id);

            const actionsWrapper = document.getElementById('modalActionsWrapper');
            if (actionsWrapper) {
                actionsWrapper.innerHTML = `
                    <div class="product-card" data-name="${product.name}" data-price="${product.price}">
                        <a href="product.html?id=${product.id}" style="display:none;"></a>
                        <img src="${product.images[0]}" style="display:none;"> 
                        
                        <button class="btn-primary buy-now-btn" style="flex: 1;">Buy Now</button>
                        
                        <button class="btn-primary add-to-cart-btn ${inCart ? 'is-added' : ''}" style="flex: 1;">
                            <span class="btn-text default-text">Add to Cart</span>
                            <span class="btn-text added-text">Added <i class='bx bx-check'></i></span>
                        </button>
                        
                        <button class="btn-icon wishlist-btn ${inWishlist ? 'active' : ''}">
                            <i class='bx ${inWishlist ? 'bxs-heart' : 'bx-heart'}'></i>
                        </button>
                    </div>
                `;
            }

            modal.classList.add('active');
            if (backdrop) backdrop.classList.add('active');
            document.body.classList.add('modal-open');
        }
    }

    if (e.target.closest('#modalCloseBtn') || (e.target === modal && modal.classList.contains('active'))) {
        modal.classList.remove('active');
        if (backdrop) backdrop.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
});

document.addEventListener("keydown", (e) => {
    const modal = document.getElementById('quickViewModal');
    const backdrop = document.getElementById('backdrop');
    if (e.key === "Escape" && modal && modal.classList.contains('active')) {
        modal.classList.remove('active');
        if (backdrop) backdrop.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
});

// ==========================================
// 3. UI SYNC ON PAGE LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('midguard_cart')) || [];
    const wishlist = JSON.parse(localStorage.getItem('midguard_wishlist')) || [];

    document.querySelectorAll('.product-card').forEach(card => {
        const link = card.querySelector('a');
        if (!link) return;
        const pid = parseInt(new URLSearchParams(link.search).get('id'));

        if (cart.find(i => i.id === pid || i.name === card.dataset.name)) {
            const addBtn = card.querySelector('.add-to-cart-btn');
            if (addBtn) {
                addBtn.innerHTML = "Added <i class='bx bx-check'></i>";
                addBtn.classList.add('is-added');
            }
        }

        if (wishlist.find(i => i.id === pid)) {
            const heartBtn = card.querySelector('.wishlist-btn');
            if (heartBtn) {
                heartBtn.classList.add('active');
                const icon = heartBtn.querySelector('i');
                if (icon) icon.classList.replace('bx-heart', 'bxs-heart');
            }
        }
    });
});

// ==========================================
// 4. UI INITIALIZATIONS (Sidebar, Dark Mode)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');
    const sidebar = document.querySelector('.sidebar');
    const backdrop = document.getElementById('backdrop');

    if (sidebar) {
        const toggle = sidebar.querySelector(".toggle");
        const menuBtn = document.getElementById('menuBtn');

        const openSidebar = () => {
            sidebar.classList.remove('close');
            sidebar.classList.add('open');
            if (backdrop) backdrop.classList.add('active');
            body.classList.add('modal-open');
        };

        const closeSidebar = () => {
            sidebar.classList.remove('open');
            sidebar.classList.add('close');
            if (backdrop) backdrop.classList.remove('active');
            body.classList.remove('modal-open');
        };

        toggle?.addEventListener('click', () => {
            if (window.innerWidth <= 992) closeSidebar();
            else sidebar.classList.toggle('close');
        });

        menuBtn?.addEventListener('click', openSidebar);
        backdrop?.addEventListener('click', closeSidebar);
        document.addEventListener("keydown", e => { if (e.key === "Escape") closeSidebar(); });

        // Dark Mode
        const modeSwitch = sidebar.querySelector(".toggle-switch");
        const modeText = sidebar.querySelector(".mode-text");
        const themeRadios = document.querySelectorAll('input[name="theme-option"]');

        const setTheme = (theme) => {
            const isDark = theme === 'dark';
            body.classList.toggle("dark", isDark);
            if (modeText) modeText.innerText = isDark ? "Light mode" : "Dark mode";
            localStorage.setItem("mode", theme); // Updated to "mode" to match settings
            const radioToSelect = document.getElementById(`theme-${theme}`);
            if (radioToSelect) radioToSelect.checked = true;
        };

        modeSwitch?.addEventListener("click", () => setTheme(body.classList.contains("dark") ? "light" : "dark"));
        themeRadios.forEach(radio => radio.addEventListener('change', (e) => setTheme(e.target.value)));
        setTheme(localStorage.getItem("mode") || "light");
    }

    // Scroll Effect
    const topNavbar = document.querySelector('.top-navbar');
    const homeContent = document.querySelector('.home');
    if (topNavbar && homeContent) {
        homeContent.addEventListener('scroll', () => topNavbar.classList.toggle('scrolled', homeContent.scrollTop > 10));
    }
});

// ==========================================
// 5. PRODUCT FILTER & SEARCH LOGIC
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.header-search-box input');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const allCards = document.querySelectorAll('.product-card');
    const noResultsMsg = document.getElementById('no-products-message');

    const performFiltering = () => {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const activeFilterBtn = document.querySelector('.filter-btn.active');
        const activeFilter = activeFilterBtn ? activeFilterBtn.dataset.filter : 'all';
        let visibleCount = 0;

        allCards.forEach(card => {
            const name = card.dataset.name ? card.dataset.name.toLowerCase() : '';
            const category = card.dataset.category;
            const matchesSearch = name.includes(searchTerm);
            const matchesFilter = (activeFilter === 'all' || category === activeFilter);

            if (matchesSearch && matchesFilter) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (noResultsMsg) noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    };

    if (searchInput) searchInput.addEventListener('input', performFiltering);
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            performFiltering();
        });
    });
});

// ==========================================
// 6. DYNAMIC PRODUCT PAGE LOGIC
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes('product.html') || document.getElementById('dyn-title')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id')) || 1;
        const product = mockProducts.find(p => p.id === productId);

        if (product) {
            document.getElementById('dyn-title').textContent = product.name;
            document.getElementById('dyn-badge').textContent = `Room ID: ${product.roomId}`;
            document.getElementById('dyn-price').textContent = `₹${product.price.toLocaleString('en-IN')}`;
            document.getElementById('dyn-mrp').innerHTML = `M.R.P.: <del>₹${product.mrp.toLocaleString('en-IN')}</del>`;
            document.getElementById('dyn-spec-duration').textContent = product.duration;
            document.getElementById('dyn-spec-warranty').textContent = product.warranty;
            document.getElementById('dyn-spec-box').textContent = product.box;
            document.getElementById('dyn-spec-invoice').textContent = product.invoice;
            document.getElementById('dyn-desc-title').textContent = product.descTitle;
            document.getElementById('dyn-desc-text').textContent = product.descText;

            const mainImgElement = document.getElementById('dyn-main-img');
            const thumbnails = document.querySelectorAll('.thumbnail');
            mainImgElement.src = product.images[0];

            thumbnails.forEach((thumb, index) => {
                const imgTag = thumb.querySelector('img');
                if (product.images[index]) {
                    imgTag.src = product.images[index];
                    thumb.style.display = "block";
                    thumb.addEventListener('click', function () {
                        thumbnails.forEach(t => t.classList.remove('active'));
                        this.classList.add('active');
                        mainImgElement.style.opacity = 0;
                        setTimeout(() => {
                            mainImgElement.src = product.images[index];
                            mainImgElement.style.opacity = 1;
                        }, 150);
                    });
                } else {
                    thumb.style.display = "none";
                }
            });

            // Sync Buttons on Load
            const cart = JSON.parse(localStorage.getItem('midguard_cart')) || [];
            const wishlist = JSON.parse(localStorage.getItem('midguard_wishlist')) || [];

            const addBtn = document.querySelector('.add-to-cart-btn');
            if (addBtn && cart.find(i => i.id === product.id)) {
                addBtn.innerHTML = "Added <i class='bx bx-check'></i>";
                addBtn.classList.add('is-added');
            }

            const wishBtn = document.querySelector('.wishlist-btn');
            if (wishBtn && wishlist.find(i => i.id === product.id)) {
                wishBtn.classList.add('active');
                const icon = wishBtn.querySelector('i');
                if (icon) icon.classList.replace('bx-heart', 'bxs-heart');
            }
        } else {
            const titleEl = document.getElementById('dyn-title');
            if (titleEl) titleEl.textContent = "Product Not Found";
        }
    }
});

// ==========================================
// 7. CART PAGE RENDERING
// ==========================================
const updateCartTotals = () => {
    const cartItemsList = document.querySelector('.cart-items-list');
    const subtotalEl = document.getElementById('cart-subtotal');
    if (!cartItemsList || !subtotalEl) return;

    const shippingEl = document.getElementById('cart-shipping');
    const totalEl = document.getElementById('cart-total');
    const emptyCartEl = document.querySelector('.empty-state-container');
    const tracker = document.getElementById('shipping-tracker');
    const trackerText = document.getElementById('tracker-text');
    const progressBar = document.getElementById('progress-bar');

    const cartItems = cartItemsList.querySelectorAll('.cart-item');
    let subtotal = 0;

    cartItems.forEach(item => {
        const price = parseFloat(item.dataset.price);
        const quantity = parseInt(item.querySelector('.quantity-input').value);
        subtotal += price * quantity;
    });

    const threshold = 500;
    let shippingCost = 0;

    if (cartItems.length > 0) {
        if (subtotal < threshold) {
            shippingCost = 50;
            if (tracker) {
                tracker.classList.remove('reached');
                trackerText.innerHTML = `Add <span>₹${threshold - subtotal}</span> more for <b>FREE</b> shipping!`;
                progressBar.style.width = `${(subtotal / threshold) * 100}%`;
                tracker.style.display = 'block';
            }
        } else {
            shippingCost = 0;
            if (tracker) {
                tracker.classList.add('reached');
                trackerText.innerHTML = `🎉 You've unlocked <b>FREE</b> shipping!`;
                progressBar.style.width = `100%`;
                tracker.style.display = 'block';
            }
        }
    } else {
        if (tracker) tracker.style.display = 'none';
    }

    subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    if (shippingEl) shippingEl.textContent = `₹${shippingCost}`;
    totalEl.textContent = `₹${(subtotal + shippingCost).toLocaleString('en-IN')}`;

    if (cartItems.length === 0) {
        if (cartItemsList.querySelector('h2')) cartItemsList.querySelector('h2').style.display = 'none';
        if (emptyCartEl) emptyCartEl.classList.remove('hidden');
    } else {
        if (cartItemsList.querySelector('h2')) cartItemsList.querySelector('h2').style.display = 'block';
        if (emptyCartEl) emptyCartEl.classList.add('hidden');
    }
};

const renderCart = () => {
    const cartPage = document.querySelector('.cart-page');
    if (!cartPage) return;

    const cartItemsList = cartPage.querySelector('.cart-items-list');
    const cart = JSON.parse(localStorage.getItem('midguard_cart')) || [];

    const tracker = document.getElementById('shipping-tracker');
    const title = cartItemsList.querySelector('h2');
    const emptyState = cartItemsList.querySelector('.empty-state-container');

    cartItemsList.innerHTML = '';
    if (tracker) cartItemsList.appendChild(tracker);
    if (title) cartItemsList.appendChild(title);
    if (emptyState) cartItemsList.appendChild(emptyState);

    if (cart.length === 0) {
        updateCartTotals();
        return;
    }

    cart.forEach(item => {
        const itemHTML = `
        <div class="cart-item" data-id="${item.id}" data-price="${item.price}">
            <a href="product.html?id=${item.id}" class="item-link">
                <img src="${item.img}" alt="${item.name}">
            </a>
            <div class="item-details">
                <a href="product.html?id=${item.id}" class="item-link">
                    <h3>${item.name}</h3>
                </a>
                <p class="item-seller">Sold by: MidGuard</p>
                <span class="item-price">₹${parseInt(item.price).toLocaleString('en-IN')}</span>
            </div>
            <div class="item-actions">
                <div class="quantity-selector">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" readonly>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
                <button class="remove-btn" data-id="${item.id}">Remove</button>
            </div>
        </div>`;
        cartItemsList.insertAdjacentHTML('beforeend', itemHTML);
    });
    updateCartTotals();
};
document.addEventListener('DOMContentLoaded', renderCart);

// ==========================================
// 8. WISHLIST PAGE RENDERING & LOGIC
// ==========================================
const updateWishlistUI = () => {
    const grid = document.querySelector('.watchlist-grid');
    const emptyMsg = document.getElementById('empty-wishlist');

    if (!grid && !emptyMsg) return;

    let wishlist = (JSON.parse(localStorage.getItem('midguard_wishlist')) || [])
        .filter(i => i && i.name && i.name !== "undefined" && i.id);

    const isEmpty = wishlist.length === 0;
    if (grid) grid.innerHTML = isEmpty ? '' : wishlist.map(item => `
        <div class="product-card card" data-id="${item.id}">
            <div class="card-image-container">
                <a href="product.html?id=${item.id}">
                    <img src="${item.img}" alt="${item.name}"> 
                </a>
                <button class="remove-btn" onclick="removeFromWishlist(${item.id})">
                    <i class='bx bx-x'></i>
                </button>
            </div>
            <div class="card-body">
                <h3>${item.name}</h3>
                <span class="price">₹${(Number(item.price) || 0).toLocaleString('en-IN')}</span>
                <button class="btn-primary full-width" onclick="moveToCartFromWishlist(${item.id})">Move to Cart</button>
            </div>
        </div>
    `).join('');

    if (emptyMsg) emptyMsg.style.display = isEmpty ? 'flex' : 'none';
};

window.removeFromWishlist = (id) => {
    let wishlist = JSON.parse(localStorage.getItem('midguard_wishlist')) || [];
    localStorage.setItem('midguard_wishlist', JSON.stringify(wishlist.filter(i => i.id !== id)));
    updateWishlistUI();
};

window.moveToCartFromWishlist = (id) => {
    const item = (JSON.parse(localStorage.getItem('midguard_wishlist')) || []).find(i => i.id === id);
    if (!item) return;

    let cart = JSON.parse(localStorage.getItem('midguard_cart')) || [];

    if (!cart.some(c => c.id === id)) {
        cart.push({ ...item, price: parseFloat(String(item.price).replace(/[₹,]/g, '')), quantity: 1 });
        localStorage.setItem('midguard_cart', JSON.stringify(cart));
    }

    const moveBtn = document.querySelector(`.product-card[data-id="${id}"] .btn-primary`);
    if (moveBtn) {
        moveBtn.innerHTML = "In Cart <i class='bx bx-cart-add'></i>";
        moveBtn.classList.add('is-added');
        moveBtn.style.pointerEvents = "none";
    }
};

document.addEventListener('DOMContentLoaded', updateWishlistUI);

// ==========================================
// 9. DYNAMIC CHECKOUT PAGE LOGIC 
// ==========================================
const initCheckoutPage = () => {
    if (!window.location.pathname.includes('checkout.html')) return;

    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            document.querySelectorAll('.pay-option').forEach(opt => opt.classList.remove('active-pay'));
            e.target.closest('.pay-option').classList.add('active-pay');
        });
    });

    const checkedRadio = document.querySelector('input[name="payment"]:checked');
    if (checkedRadio) checkedRadio.closest('.pay-option').classList.add('active-pay');

    setTimeout(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const buyNowId = urlParams.get('buy_now');

        let checkoutItems = [];

        if (buyNowId) {
            const dbProduct = mockProducts.find(p => p.id === parseInt(buyNowId));
            if (dbProduct) {
                checkoutItems = [{
                    id: dbProduct.id,
                    name: dbProduct.name,
                    price: dbProduct.price,
                    img: dbProduct.images[0],
                    quantity: 1
                }];
            }
        } else {
            checkoutItems = JSON.parse(localStorage.getItem('midguard_cart')) || [];
        }

        if (checkoutItems.length === 0) {
            window.location.href = "index.html";
            return;
        }

        // --- RENDER ADDRESS ---
        const addresses = JSON.parse(localStorage.getItem('midguard_addresses')) || [];
        const defaultAddress = addresses.find(addr => addr.isDefault) || addresses[0];
        const addressBox = document.getElementById('dynamic-address-box') || document.getElementById('checkoutAddressContainer');

        if (addressBox) {
            if (defaultAddress) {
                addressBox.innerHTML = `
                    <div class="selected-address-card" style="padding: 20px; border: 2px solid var(--primary-color); border-radius: 12px; background: var(--primary-color-light); position: relative;">
                        <span style="position: absolute; top: 15px; right: 15px; background: var(--primary-color); color: white; padding: 3px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600;">Default</span>
                        <h4 style="margin-bottom: 5px; font-size: 1.1rem; color: var(--text-color);">${defaultAddress.name}</h4>
                        <p style="margin-bottom: 3px; font-size: 0.9rem; color: var(--text-color); opacity: 0.8;">${defaultAddress.house}, ${defaultAddress.area}</p>
                        <p style="margin-bottom: 10px; font-size: 0.9rem; color: var(--text-color); opacity: 0.8;">${defaultAddress.city}, ${defaultAddress.state} - ${defaultAddress.pincode}</p>
                        <p style="margin-bottom: 15px; font-size: 0.9rem; font-weight: 600; color: var(--text-color);"><i class='bx bx-phone'></i> +91 ${defaultAddress.phone}</p>
                        <a href="newAddress.html" class="btn-outline" style="padding: 8px 15px; border-radius: 8px; font-size: 0.85rem; border: 1px solid var(--primary-color); color: var(--primary-color);">Change Address</a>
                    </div>
                `;
                addressBox.classList.add('active');
            } else {
                addressBox.innerHTML = `
                    <div class="no-address" style="padding: 30px; text-align: center; border: 2px dashed var(--toggle-color); border-radius: 12px;">
                        <i class='bx bx-map-pin' style="font-size: 2.5rem; color: var(--toggle-color); margin-bottom: 10px;"></i>
                        <p style="margin-bottom: 15px; color: var(--text-color);">No delivery address selected.</p>
                        <a href="newAddress.html" class="btn-primary" style="padding: 10px 20px; border-radius: 10px;">Add New Address</a>
                    </div>`;
                addressBox.classList.remove('active');
            }
        }

        const itemsList = document.getElementById('checkout-items-list');
        let subtotal = 0;

        if (itemsList) {
            itemsList.innerHTML = checkoutItems.map(item => {
                const safePrice = parseFloat(item.price) || 0;
                const safeQty = parseInt(item.quantity) || 1;
                const lineTotal = safePrice * safeQty;
                subtotal += lineTotal;

                return `
                    <div class="checkout-item-row">
                        <div class="item-img-wrapper">
                            <img src="${item.img}" alt="${item.name}">
                            <span class="item-qty-badge">${safeQty}</span>
                        </div>
                        <div class="item-info">
                            <h4>${item.name}</h4>
                            <span class="item-price">₹${lineTotal.toLocaleString('en-IN')}</span>
                        </div>
                    </div>`;
            }).join('');
        }

        const shipping = subtotal < 500 ? 50 : 0;
        const totalPayable = subtotal + shipping;

        const subtotalEl = document.getElementById('summary-subtotal');
        const shippingEl = document.getElementById('summary-shipping');
        const totalEl = document.getElementById('summary-total');

        if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
        if (shippingEl) shippingEl.textContent = shipping === 0 ? "FREE" : `₹${shipping}`;
        if (totalEl) totalEl.textContent = `₹${totalPayable.toLocaleString('en-IN')}`;

        const placeOrderBtn = document.getElementById('place-order-btn') || document.getElementById('placeOrderBtn');
        if (placeOrderBtn) {
            placeOrderBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (!defaultAddress) {
                    alert("Please add a delivery address before placing your order!");
                    return;
                }

                // Place Order Logic added to Checkout
                let orders = JSON.parse(localStorage.getItem('midguard_orders')) || [];
                checkoutItems.forEach(item => {
                    orders.unshift({
                        id: "MG-" + Math.floor(10000000 + Math.random() * 90000000), 
                        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
                        total: item.price * item.quantity,
                        status: "processing", 
                        name: item.name,
                        img: item.img,
                        address: defaultAddress 
                    });
                });
                localStorage.setItem('midguard_orders', JSON.stringify(orders));

                if (!buyNowId) {
                    localStorage.removeItem('midguard_cart');
                }

                placeOrderBtn.innerHTML = "Processing... <i class='bx bx-loader-alt bx-spin'></i>";
                placeOrderBtn.style.pointerEvents = "none";
                setTimeout(() => { 
                    placeOrderBtn.innerHTML = "Success! <i class='bx bx-check'></i>"; 
                    placeOrderBtn.style.background = "var(--success-color)"; 
                    setTimeout(() => window.location.href = "order.html", 800); 
                }, 1500);
            });
        }
    }, 150);
};
document.addEventListener('DOMContentLoaded', initCheckoutPage);

window.selectAddressForCheckout = (id) => {
    let addresses = JSON.parse(localStorage.getItem('midguard_addresses')) || [];
    addresses = addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === id 
    }));
    localStorage.setItem('midguard_addresses', JSON.stringify(addresses));
    window.location.href = "checkout.html";
};

// ==========================================
// 10. OTHER PAGES (Address Forms, Animations, Modals)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animations
    const animatedElements = document.querySelectorAll('.hero-section, .filter-container, .product-card, .site-footer, .product-layout, .description-card, .product-suggestions');
    if (animatedElements.length > 0) {
        animatedElements.forEach(el => el.classList.add('fade-in'));
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedElements.forEach(el => observer.observe(el));
    }

    // Pincode API Logic
    const pincodeInput = document.getElementById('pincode');
    if (pincodeInput) {
        const cityInput = document.getElementById('city');
        const stateInput = document.getElementById('state');
        pincodeInput.addEventListener('keyup', async () => {
            if (pincodeInput.value.length === 6) {
                try {
                    const res = await fetch(`https://api.postalpincode.in/pincode/${pincodeInput.value}`);
                    const data = await res.json();
                    if (data && data[0].Status === "Success") {
                        cityInput.value = data[0].PostOffice[0].District;
                        stateInput.value = data[0].PostOffice[0].State;
                    } else { cityInput.value = ''; stateInput.value = ''; }
                } catch (e) { cityInput.value = ''; stateInput.value = ''; }
            }
        });
    }

    // NEW ADDRESS SAVING LOGIC
    const addressForm = document.getElementById('addressForm');
    if (addressForm) {
        addressForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const newAddress = {
                id: Date.now(),
                name: document.getElementById('fullName').value,
                phone: document.getElementById('mobileNumber').value,
                pincode: document.getElementById('pincode').value,
                house: document.getElementById('addressLine1').value,
                area: document.getElementById('addressLine2').value,
                landmark: document.getElementById('landmark').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                isDefault: document.getElementById('defaultAddress')?.checked || false
            };

            let addresses = JSON.parse(localStorage.getItem('midguard_addresses')) || [];

            if (newAddress.isDefault) {
                addresses = addresses.map(addr => ({ ...addr, isDefault: false }));
            }

            addresses.push(newAddress);
            localStorage.setItem('midguard_addresses', JSON.stringify(addresses));

            const btn = addressForm.querySelector('.submit-btn');
            if (btn) {
                btn.innerHTML = "Saved! <i class='bx bx-check'></i>";
                btn.classList.add('save-success');
            }

            setTimeout(() => {
                if (document.referrer.includes('checkout.html')) {
                    window.location.href = "checkout.html";
                } else {
                    window.location.href = "saved_addresses.html";
                }
            }, 1000);
        });
    }

    // Saved Addresses Logic (Remove / Set Default)
    const addressGrid = document.querySelector('.address-grid');
    if (addressGrid) {
        addressGrid.addEventListener('click', function (event) {
            const removeBtn = event.target.closest('.remove-btn');
            if (removeBtn && confirm('Are you sure you want to remove this address?')) {
                const cardToRemove = removeBtn.closest('.address-card');
                cardToRemove.classList.add('removing');
                cardToRemove.addEventListener('transitionend', () => cardToRemove.remove());
            }
        });

        addressGrid.addEventListener('change', function (event) {
            const defaultRadio = event.target.closest('input[type="radio"]');
            if (defaultRadio) {
                addressGrid.querySelectorAll('.address-card').forEach(card => card.classList.remove('default'));
                defaultRadio.closest('.address-card').classList.add('default');
            }
        });
    }

    // Create Room Image Upload Preview
    const createRoomForm = document.querySelector('.create-room-form');
    if (createRoomForm) {
        createRoomForm.querySelectorAll('input[type="file"]').forEach(input => {
            input.addEventListener('change', function handleFileChange() {
                const placeholder = this.parentElement;
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        placeholder.innerHTML = `<img src="${e.target.result}"><div class="remove-image-btn"><i class="bx bx-x"></i></div>`;
                        placeholder.querySelector('.remove-image-btn').addEventListener('click', () => {
                            placeholder.innerHTML = '<span><i class="bx bx-image-add"></i></span>';
                            const newInput = document.createElement('input');
                            newInput.type = 'file';
                            newInput.accept = 'image/*';
                            placeholder.prepend(newInput);
                            newInput.addEventListener('change', handleFileChange);
                        });
                    };
                    reader.readAsDataURL(file);
                }
            });
        });
    }

    // Join Room Modal Logic
    const joinRoomBtn = document.querySelector('.join-room');
    const modal = document.getElementById('joinRoomModal');
    if (joinRoomBtn && modal) {
        const closeMod = () => { modal.classList.remove('active'); document.getElementById('backdrop')?.classList.remove('active'); };
        joinRoomBtn.addEventListener('click', () => { modal.classList.add('active'); document.getElementById('backdrop')?.classList.add('active'); });
        document.querySelectorAll('.modal-close, #backdrop').forEach(el => el.addEventListener('click', closeMod));
        document.addEventListener('keydown', (e) => { if (e.key === "Escape" && modal.classList.contains('active')) closeMod(); });
    }

    // Policy Page Tabs
    const policyTabsContainer = document.querySelector('.tabs-container');
    if (policyTabsContainer && document.querySelector(".policy-card")) {
        const tabs = policyTabsContainer.querySelectorAll(".tab-btn");
        const contents = document.querySelectorAll(".policy-card");

        const activateTab = (tabId) => {
            if (!tabId) return;
            contents.forEach(content => content.classList.toggle("active", content.id === tabId));
            tabs.forEach(tab => tab.classList.toggle("active", tab.dataset.target === tabId));
        };
        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                history.pushState(null, null, `#${tab.dataset.target}`);
                activateTab(tab.dataset.target);
            });
        });
        const initialTabId = window.location.hash.substring(1);
        if (initialTabId) activateTab(initialTabId);
        else if (tabs.length > 0) activateTab(tabs[0].dataset.target);
    }
});

// ==========================================
// 11. DYNAMIC ACCOUNT & SETTINGS PAGE LOGIC 
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // --- ACCOUNT PAGE LOGIC ---
    const accountPage = document.querySelector('.account-page');
    if (accountPage) {
        const detailsSection = accountPage.querySelector('.details-section');
        
        const getLocalUser = () => {
            let user = JSON.parse(localStorage.getItem('midguard_user'));
            if (!user) {
                user = {
                    name: "Baibhab Ghosh",
                    email: "bai***3@email.com",
                    phone: "+91 9876543210",
                    dob: "2004-01-15",
                    gender: "Male",
                    location: "Kolkata, India",
                    profession: "Student",
                    workplace: "ABC University",
                    interests: "Gaming, Coding, Music, Cricket",
                    avatar: "https://placehold.co/100x100/695CFE/FFFFFF?text=BG"
                };
                localStorage.setItem('midguard_user', JSON.stringify(user));
            }
            return user;
        };

        const loadProfileToUI = () => {
            const user = getLocalUser();
            
            // Text Content Updates
            if(document.getElementById('val-name')) document.getElementById('val-name').textContent = user.name;
            if(document.getElementById('input-name')) document.getElementById('input-name').value = user.name;
            
            const profileNameDisplay = document.getElementById('profileNameDisplay');
            if(profileNameDisplay) profileNameDisplay.textContent = user.name;
            
            const headerFirstName = document.getElementById('headerFirstName');
            if(headerFirstName) headerFirstName.textContent = user.name.split(' ')[0] + '!';

            // Iterate over generic fields in your HTML
            ['email', 'phone', 'dob', 'gender', 'location', 'profession', 'workplace'].forEach(field => {
                const row = document.querySelector(`[data-field="${field}"]`);
                if(row) {
                    const val = row.querySelector('.info-value');
                    const inp = row.querySelector('.info-input');
                    if(val) val.textContent = user[field] || '';
                    if(inp) inp.value = user[field] || '';
                }
            });

            // Special Interests Logic
            const interestsRow = document.querySelector('[data-field="interests"]');
            if(interestsRow) {
                const val = interestsRow.querySelector('.info-value');
                const inp = interestsRow.querySelector('.info-input');
                if(inp) inp.value = user.interests || '';
                if(val && user.interests) {
                    val.innerHTML = user.interests.split(',').filter(x=>x.trim()).map(t=>`<span class="interest-tag">#${t.trim()}</span>`).join('');
                }
            }

            const avatarPreview = document.getElementById('profilePicturePreview');
            if(avatarPreview) avatarPreview.src = user.avatar;

            updateWorkplaceField();
            updateProfileCompletion();
        };

        if (detailsSection) {
            detailsSection.addEventListener('click', (e) => {
                const editBtn = e.target.closest('.edit-btn');
                const saveBtn = e.target.closest('.save-btn');
                const cancelBtn = e.target.closest('.cancel-btn');
                if (editBtn) toggleEditState(editBtn.closest('.info-row'), true);
                if (saveBtn) saveChanges(saveBtn.closest('.info-row'));
                if (cancelBtn) cancelChanges(cancelBtn.closest('.info-row'));
            });

            const toggleEditState = (row, isEditing) => {
                row.classList.toggle('is-editing', isEditing);
                const infoVal = row.querySelector('.info-value');
                const infoInp = row.querySelector('.info-input');
                if(infoVal) infoVal.style.display = isEditing ? 'none' : 'flex';
                if(infoInp) {
                    infoInp.style.display = isEditing ? 'block' : 'none';
                    if (isEditing) infoInp.focus();
                }
            };

            const saveChanges = (row) => {
                const field = row.dataset.field;
                const inputEl = row.querySelector('.info-input');
                
                let user = getLocalUser();
                user[field] = inputEl.value;
                localStorage.setItem('midguard_user', JSON.stringify(user));
                
                toggleEditState(row, false);
                loadProfileToUI();
                
                // Sync sidebar globally
                const sidebarName = document.getElementById('sidebarName');
                if(sidebarName) sidebarName.textContent = user.name;
            };

            const cancelChanges = (row) => {
                toggleEditState(row, false);
                loadProfileToUI();
            };

            const updateWorkplaceField = () => {
                const dobRow = document.querySelector('[data-field="dob"]');
                const workplaceRow = document.getElementById('workplaceRow');
                if (!dobRow || !workplaceRow) return;
                
                const dobValue = dobRow.querySelector('.info-value').textContent;
                if(!dobValue) return;

                const dob = new Date(dobValue);
                const age = new Date().getFullYear() - dob.getFullYear();
                
                if (age <= 22) {
                    workplaceRow.querySelector('i').className = 'bx bxs-school';
                    workplaceRow.querySelector('.info-label').textContent = 'School Name';
                } else {
                    workplaceRow.querySelector('i').className = 'bx bx-buildings';
                    workplaceRow.querySelector('.info-label').textContent = 'Office Name';
                }
            };

            const updateProfileCompletion = () => {
                const progressBar = document.getElementById('progressBar');
                const progressText = document.getElementById('progressText');
                if (!progressBar || !progressText) return;
                
                const allEditableRows = detailsSection.querySelectorAll('.info-row[data-field]');
                let filledCount = 0;
                allEditableRows.forEach(row => {
                    const value = row.querySelector('.info-value').textContent;
                    if (value && value.trim() !== '' && value.trim() !== 'Not set') filledCount++;
                });
                const percentage = Math.round((filledCount / allEditableRows.length) * 100);
                progressBar.style.width = `${percentage}%`;
                progressText.textContent = `${percentage}% Complete`;
            };
        }

        const profilePicInput = document.getElementById('profilePictureUpload');
        if (profilePicInput) {
            profilePicInput.addEventListener('change', function() {
                if (this.files && this.files[0]) {
                    const reader = new FileReader();
                    reader.onload = e => { 
                        let user = getLocalUser();
                        user.avatar = e.target.result; 
                        localStorage.setItem('midguard_user', JSON.stringify(user)); 
                        loadProfileToUI(); 
                        const sidebarAvatar = document.getElementById('sidebarAvatar');
                        if(sidebarAvatar) sidebarAvatar.src = user.avatar;
                    };
                    reader.readAsDataURL(this.files[0]);
                }
            });
        }
        
        loadProfileToUI();
    }

    // --- SETTINGS PAGE LOGIC ---
    if (window.location.href.includes('settings.html')) {
        // Theme Radio Buttons
        const themeRadios = document.querySelectorAll('input[name="theme-option"]');
        const currentTheme = localStorage.getItem('mode') || 'light';
        themeRadios.forEach(radio => {
            if (radio.value === currentTheme) radio.checked = true;
            radio.addEventListener('change', (e) => {
                const isDark = e.target.value === 'dark';
                document.body.classList.toggle('dark', isDark);
                localStorage.setItem('mode', e.target.value);
            });
        });

        // Notification Toggles
        document.querySelectorAll('.form-toggle-switch input').forEach(toggle => {
            const pref = localStorage.getItem(`pref_${toggle.id}`);
            if (pref !== null) toggle.checked = pref === 'true';
            
            toggle.addEventListener('change', (e) => {
                localStorage.setItem(`pref_${e.target.id}`, e.target.checked);
            });
        });

        // Clear Data
        window.clearAppData = () => {
            if(confirm("Clear local cache? This empties Cart, Wishlist, and Orders.")) {
                localStorage.removeItem('midguard_cart');
                localStorage.removeItem('midguard_wishlist');
                localStorage.removeItem('midguard_orders');
                window.location.reload();
            }
        };

        window.handleLogout = () => { if(confirm("Logout?")) window.location.href = "shopsignup.html"; };
    }
});

// ==========================================
// 12. MY ORDERS PAGE LOGIC
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const ordersContainer = document.getElementById('ordersContainer');
    const emptyState = document.getElementById('empty-orders');
    const filterTabs = document.querySelectorAll('#orderFilterTabs .filter-btn');
    const searchInput = document.getElementById('orderSearchInput');

    if (!ordersContainer && !emptyState) return; 

    const getOrders = () => JSON.parse(localStorage.getItem('midguard_orders')) || [];

    const renderOrders = (filterStatus = 'all', searchQuery = '') => {
        const orders = getOrders();
        
        let filteredOrders = orders.filter(order => {
            const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
            const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesStatus && matchesSearch;
        });

        if (filteredOrders.length === 0) {
            if(ordersContainer) ordersContainer.innerHTML = '';
            if (emptyState) emptyState.classList.remove('hidden');
            return;
        }

        if (emptyState) emptyState.classList.add('hidden');

        if(ordersContainer) {
            ordersContainer.innerHTML = filteredOrders.map(order => {
                let badgeClass = '';
                let badgeIcon = '';
                let statusText = '';
                
                if (order.status === 'delivered') { badgeClass = 'status-delivered'; badgeIcon = 'bx-check-circle'; statusText = 'Delivered'; }
                else if (order.status === 'shipped') { badgeClass = 'status-shipped'; badgeIcon = 'bx-package'; statusText = 'Shipped'; }
                else { badgeClass = 'status-processing'; badgeIcon = 'bx-time-five'; statusText = 'Processing'; }

                const cancelBtnHTML = order.status !== 'delivered' 
                    ? `<button class="btn-outline" onclick="cancelOrder('${order.id}')" style="color: var(--accent-color); border-color: var(--accent-color);">Cancel Order</button>` 
                    : '';

                const safePrice = Number(order.total) || 0;

                return `
                    <div class="order-card">
                        <div class="order-card-header">
                            <div class="header-group">
                                <div class="info-group"><span>Order Placed</span><p>${order.date}</p></div>
                                <div class="info-group"><span>Total</span><p>₹${safePrice.toLocaleString('en-IN')}</p></div>
                            </div>
                            <div class="info-group id-group">
                                <span>Transaction ID</span>
                                <p>#${order.id}</p>
                            </div>
                        </div>
                        
                        <div class="order-card-body">
                            <div class="item-details">
                                <div class="product-image"><img src="${order.img}" alt="${order.name}"></div>
                                <div class="product-details">
                                    <h3 class="product-name">${order.name}</h3>
                                    <div class="status-badge ${badgeClass}"><i class='bx ${badgeIcon}'></i> ${statusText}</div>
                                </div>
                            </div>
                            
                            <div class="action-buttons">
                                <button class="btn-primary">Track Package</button>
                                ${order.status === 'delivered' ? '<button class="btn-outline">Write Review</button>' : ''}
                                ${cancelBtnHTML}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }
    };

    window.cancelOrder = (orderId) => {
        if(confirm("Are you sure you want to cancel this order?")) {
            let orders = getOrders();
            orders = orders.filter(o => o.id !== orderId);
            localStorage.setItem('midguard_orders', JSON.stringify(orders));
            
            const activeTab = document.querySelector('#orderFilterTabs .filter-btn.active');
            const status = activeTab ? activeTab.getAttribute('data-filter') : 'all';
            renderOrders(status, searchInput ? searchInput.value : '');
        }
    };

    if (filterTabs.length > 0) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                filterTabs.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                const status = e.target.getAttribute('data-filter');
                renderOrders(status, searchInput ? searchInput.value : '');
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const activeTab = document.querySelector('#orderFilterTabs .filter-btn.active');
            const status = activeTab ? activeTab.getAttribute('data-filter') : 'all';
            renderOrders(status, e.target.value);
        });
    }

    renderOrders();
});