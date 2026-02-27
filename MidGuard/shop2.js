document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');
    const sidebar = document.querySelector('.sidebar');
    const backdrop = document.getElementById('backdrop');

    // --- SIDEBAR LOGIC (FINAL, CORRECTED VERSION) ---
    // --- UNIFIED SIDEBAR LOGIC (REPLACEMENT) ---
if (sidebar) {
    const toggle = sidebar.querySelector(".toggle"); // Purple Arrow
    const menuBtn = document.getElementById('menuBtn'); // 3-line Hamburger
    const body = document.body;

    // 1. Explicit Open Function
    const openSidebar = () => {
        sidebar.classList.remove('close');
        sidebar.classList.add('open');
        if (backdrop) backdrop.classList.add('active');
        body.classList.add('modal-open');
    };

    // 2. Explicit Close Function
    const closeSidebar = () => {
        sidebar.classList.remove('open');
        sidebar.classList.add('close');
        if (backdrop) backdrop.classList.remove('active');
        body.classList.remove('modal-open');
    };

    // 3. Assign Actions
    // Desktop & Mobile: Purple Arrow toggles/closes
    toggle?.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
            closeSidebar();
        } else {
            sidebar.classList.toggle('close');
        }
    });

    // Mobile Only: Hamburger opens
    menuBtn?.addEventListener('click', openSidebar);

    // Backdrop & Escape Key (Closes everything)
    backdrop?.addEventListener('click', closeSidebar);
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") closeSidebar();
    });
}

    // --- UNIFIED DARK MODE LOGIC ---
    if (sidebar) {
        const modeSwitch = sidebar.querySelector(".toggle-switch");
        const modeText = sidebar.querySelector(".mode-text");
        const themeRadios = document.querySelectorAll('input[name="theme-option"]');

        const setTheme = (theme) => {
            const isDark = theme === 'dark';
            body.classList.toggle("dark", isDark);
            if (modeText) modeText.innerText = isDark ? "Light mode" : "Dark mode";
            localStorage.setItem("theme", theme);
            const radioToSelect = document.getElementById(`theme-${theme}`);
            if (radioToSelect) radioToSelect.checked = true;
        };

        modeSwitch?.addEventListener("click", () => {
            const newTheme = body.classList.contains("dark") ? "light" : "dark";
            setTheme(newTheme);
        });

        themeRadios.forEach(radio => {
            radio.addEventListener('change', (event) => setTheme(event.target.value));
        });

        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
    }

    // --- NAVBAR SCROLL EFFECT ---
    const topNavbar = document.querySelector('.top-navbar');
    const homeContent = document.querySelector('.home');
    if (topNavbar && homeContent) {
        homeContent.addEventListener('scroll', () => {
            topNavbar.classList.toggle('scrolled', homeContent.scrollTop > 10);
        });
    }

    // --- FIXED PRODUCT FILTER LOGIC ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Remove active class from all buttons and add to clicked one
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            productCards.forEach(card => {
                // 2. Check if card matches filter
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    // Use 'flex' so your internal card alignment stays correct
                    card.style.display = 'flex';
                } else {
                    // 'none' removes it from the layout entirely, forcing others to move up
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- UNIFIED SEARCH & FILTER LOGIC ---
    const searchInput = document.querySelector('.header-search-box input');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const allCards = document.querySelectorAll('.product-card');
    const noResultsMsg = document.getElementById('no-products-message');

    function performFiltering() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        let visibleCount = 0;

        allCards.forEach(card => {
            const name = card.dataset.name.toLowerCase();
            const category = card.dataset.category;

            // Check against both Search and Filter
            const matchesSearch = name.includes(searchTerm);
            const matchesFilter = (activeFilter === 'all' || category === activeFilter);

            if (matchesSearch && matchesFilter) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Show or hide the "No Products Found" message
        if (visibleCount === 0) {
            noResultsMsg.style.display = 'block';
        } else {
            noResultsMsg.style.display = 'none';
        }
    }

    // Listener for search input
    if (searchInput) {
        searchInput.addEventListener('input', performFiltering);
    }

    // Listener for filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            performFiltering();
        });
    });

    // // --- QUICK VIEW MODAL LOGIC (Shop Page) ---
    // const modal = document.getElementById('quickViewModal');
    // if (modal) {
    //     const modalCloseBtn = document.getElementById('modalCloseBtn');
    //     const modalImage = modal.querySelector('.modal-image img');
    //     const modalProductName = document.getElementById('modalProductName');
    //     const modalProductPrice = document.getElementById('modalProductPrice');

    //     const openModal = (card) => {
    //         modalProductName.textContent = card.dataset.name;
    //         modalProductPrice.textContent = card.dataset.price;
    //         modalImage.src = card.dataset.img;
    //         modalImage.alt = card.dataset.name;
    //         modal.classList.add('active');
    //         if (backdrop) backdrop.classList.add('active');
    //         body.classList.add('modal-open');
    //     };

    //     const closeModal = () => {
    //         modal.classList.remove('active');
    //         if (backdrop && !sidebar?.classList.contains('open')) {
    //             backdrop.classList.remove('active');
    //             body.classList.remove('modal-open');
    //         }
    //     };

    //     document.addEventListener('click', (e) => {
    //         const quickViewBtn = e.target.closest('.quick-view-btn');
    //         if (quickViewBtn) {
    //             const productCard = quickViewBtn.closest('.product-card');
    //             openModal(productCard);
    //         }
    //     });

    //     modalCloseBtn?.addEventListener('click', closeModal);
    //     backdrop?.addEventListener('click', () => {
    //         if (modal.classList.contains('active')) closeModal();
    //     });
    // }

    // --- BUTTON INTERACTIVITY ---
    document.addEventListener('click', (e) => {
        const wishlistBtn = e.target.closest('.wishlist-btn');
        if (wishlistBtn) {
            wishlistBtn.classList.toggle('active');
            const heartIcon = wishlistBtn.querySelector('i.bx');
            heartIcon?.classList.toggle('bxs-heart');
            heartIcon?.classList.toggle('bx-heart');
        }
        const addToCartBtn = e.target.closest('.add-to-cart-btn');
        if (addToCartBtn && !addToCartBtn.classList.contains('is-added')) {
            addToCartBtn.classList.add('is-added');
            setTimeout(() => {
                addToCartBtn.classList.remove('is-added');
            }, 2000);
        }
    });
});

// --- LOGIC FOR PRODUCT GALLERY ---
const mainImageDisplay = document.querySelector('.thumbnail');
const thumbnails = document.querySelectorAll('.thumbnail');
if (mainImageDisplay && thumbnails.length > 0) {
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function () {
            thumbnails.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            mainImageDisplay.textContent = this.textContent;
            mainImageDisplay.style.backgroundColor = this.dataset.color;
        });
    });
}
// --- COMPLETE UNIFIED CART LOGIC ---

/**
 * 1. Update Totals, Shipping, and Progress Tracker
 */
const updateCartTotals = () => {
    const cartItemsList = document.querySelector('.cart-items-list');
    const subtotalEl = document.getElementById('cart-subtotal');
    const shippingEl = document.getElementById('cart-shipping');
    const totalEl = document.getElementById('cart-total');
    const emptyCartEl = document.querySelector('.empty-state-container');
    
    // Tracker elements (Now located at the top of the item list)
    const tracker = document.getElementById('shipping-tracker');
    const trackerText = document.getElementById('tracker-text');
    const progressBar = document.getElementById('progress-bar');

    if (!cartItemsList || !subtotalEl) return;

    const cartItems = cartItemsList.querySelectorAll('.cart-item');
    let subtotal = 0;

    cartItems.forEach(item => {
        const price = parseFloat(item.dataset.price);
        const quantity = parseInt(item.querySelector('.quantity-input').value);
        subtotal += price * quantity;
    });

    // --- SHIPPING & TRACKER LOGIC ---
    const threshold = 500;
    let shippingCost = 0;
    
    if (cartItems.length > 0) {
        if (subtotal < threshold) {
            shippingCost = 50;
            const remaining = threshold - subtotal;
            const percentage = (subtotal / threshold) * 100;
            
            if (tracker) {
                tracker.classList.remove('reached');
                trackerText.innerHTML = `Add <span>₹${remaining}</span> more for <b>FREE</b> shipping!`;
                progressBar.style.width = `${percentage}%`;
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
        shippingCost = 0;
        if (tracker) tracker.style.display = 'none'; 
    }

    const total = subtotal + shippingCost;

    // Update UI
    subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    if (shippingEl) shippingEl.textContent = `₹${shippingCost}`;
    totalEl.textContent = `₹${total.toLocaleString('en-IN')}`;

    // Handle Empty State Visibility
    if (cartItems.length === 0) {
        if (cartItemsList.querySelector('h2')) cartItemsList.querySelector('h2').style.display = 'none';
        if (emptyCartEl) emptyCartEl.classList.remove('hidden');
    } else {
        if (cartItemsList.querySelector('h2')) cartItemsList.querySelector('h2').style.display = 'block';
        if (emptyCartEl) emptyCartEl.classList.add('hidden');
    }
};

/**
 * 2. Render Cart Items from LocalStorage
 */
const renderCart = () => {
    const cartPage = document.querySelector('.cart-page');
    if (!cartPage) return;

    const cartItemsList = cartPage.querySelector('.cart-items-list');
    const cart = JSON.parse(localStorage.getItem('midguard_cart')) || [];
    
    // Save references to persistent elements
    const tracker = document.getElementById('shipping-tracker');
    const title = cartItemsList.querySelector('h2');
    const emptyState = cartItemsList.querySelector('.empty-state-container');

    // WIPE and RE-APPEND (Ensures layout doesn't break)
    cartItemsList.innerHTML = '';
    if (tracker) cartItemsList.appendChild(tracker);
    if (title) cartItemsList.appendChild(title);
    if (emptyState) cartItemsList.appendChild(emptyState);

    if (cart.length === 0) {
        updateCartTotals();
        return;
    }

    // Inject dynamic items
    cart.forEach(item => {
        const itemHTML = `
            <div class="cart-item" data-id="${item.id}" data-price="${item.price}">
                <img src="${item.img}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
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

/**
 * 3. Event Listeners for Cart Actions
 */
document.addEventListener('click', (e) => {
    // Logic for "Add to Cart" (on index.html)
    const addBtn = e.target.closest('.add-to-cart-btn');
    if (addBtn) {
        const card = addBtn.closest('.product-card');
        const cart = JSON.parse(localStorage.getItem('midguard_cart')) || [];
        const product = {
            id: Date.now(), 
            name: card.dataset.name,
            price: card.dataset.price.replace(/[₹,]/g, ''), 
            img: card.querySelector('img').src,
            quantity: 1
        };
        const existing = cart.find(i => i.name === product.name);
        if (existing) existing.quantity++;
        else cart.push(product);
        localStorage.setItem('midguard_cart', JSON.stringify(cart));
        addBtn.classList.add('is-added');
        setTimeout(() => addBtn.classList.remove('is-added'), 2000);
    }

    // Logic for "Quantity" and "Remove" (on cart.html)
    if (document.querySelector('.cart-page')) {
        let cart = JSON.parse(localStorage.getItem('midguard_cart')) || [];
        const btn = e.target;
        const itemId = btn.dataset.id;
        const index = cart.findIndex(i => i.id == itemId);

        if (btn.classList.contains('remove-btn') && index !== -1) {
            cart.splice(index, 1);
        } else if (btn.classList.contains('quantity-btn') && index !== -1) {
            if (btn.classList.contains('plus')) cart[index].quantity++;
            else if (btn.classList.contains('minus')) cart[index].quantity = Math.max(1, cart[index].quantity - 1);
        } else { return; }

        localStorage.setItem('midguard_cart', JSON.stringify(cart));
        renderCart();
    }
});

document.addEventListener('DOMContentLoaded', renderCart);

// --- CREATE ROOM PAGE LOGIC (Image Preview) ---
const createRoomForm = document.querySelector('.create-room-form');
if (createRoomForm) {
    const fileInputs = createRoomForm.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function handleFileChange() {
            const placeholder = this.parentElement;
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    placeholder.innerHTML = '';
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    placeholder.appendChild(img);
                    const removeBtn = document.createElement('div');
                    removeBtn.classList.add('remove-image-btn');
                    removeBtn.innerHTML = '<i class="bx bx-x"></i>';
                    placeholder.appendChild(removeBtn);
                    removeBtn.addEventListener('click', () => {
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

// --- POLICY PAGE LOGIC ---
const tabsContainer = document.querySelector('.tabs-container');
if (tabsContainer) {
    const tabs = tabsContainer.querySelectorAll(".tab-btn");
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

// --- SCROLL FADE-IN ANIMATIONS ---
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
};

// --- LOGIC FOR WISHLIST PAGE ---
document.addEventListener('DOMContentLoaded', () => {
    const watchlistGrid = document.querySelector('.watchlist-grid');
    if (!watchlistGrid) return;

    watchlistGrid.addEventListener('click', function (event) {
        const removeBtn = event.target.closest('.remove-btn');
        if (removeBtn) {
            const cardToRemove = removeBtn.closest('.product-card');
            cardToRemove.classList.add('removing');

            cardToRemove.addEventListener('transitionend', () => {
                cardToRemove.remove();
            });
        }
    });
});
// --- LOGIC FOR MY ACCOUNT PAGE ---
document.addEventListener('DOMContentLoaded', () => {
    const accountPage = document.querySelector('.account-page');
    if (!accountPage) return;
    const detailsSection = accountPage.querySelector('.details-section');
    detailsSection.addEventListener('click', (e) => {
        const editBtn = e.target.closest('.edit-btn');
        const saveBtn = e.target.closest('.save-btn');
        const cancelBtn = e.target.closest('.cancel-btn');
        if (editBtn) {
            const row = editBtn.closest('.info-row');
            toggleEditState(row, true);
        }
        if (saveBtn) {
            const row = saveBtn.closest('.info-row');
            saveChanges(row);
        }
        if (cancelBtn) {
            const row = cancelBtn.closest('.info-row');
            cancelChanges(row);
        }
    });

    const toggleEditState = (row, isEditing) => {
        row.classList.toggle('is-editing', isEditing);
        row.querySelector('.info-value').style.display = isEditing ? 'none' : 'block';
        row.querySelector('.info-input').style.display = isEditing ? 'block' : 'none';
        row.querySelector('.edit-btn').style.display = isEditing ? 'none' : 'block';
        row.querySelector('.save-btn').style.display = isEditing ? 'block' : 'none';
        row.querySelector('.cancel-btn').style.display = isEditing ? 'block' : 'none';
        if (isEditing) row.querySelector('.info-input').focus();
    };

    const saveChanges = (row) => {
        const valueDisplay = row.querySelector('.info-value');
        const inputEl = row.querySelector('.info-input');
        if (row.dataset.field === 'interests') {
            const tags = inputEl.value.split(',').map(tag => tag.trim()).filter(tag => tag);
            valueDisplay.innerHTML = tags.map(tag => `<span class="interest-tag">#${tag}</span>`).join('');
        } else {
            valueDisplay.textContent = inputEl.value;
        }
        if (row.dataset.field === 'dob') updateWorkplaceField();
        if (row.dataset.field === 'name') document.getElementById('profileNameDisplay').textContent = inputEl.value;
        toggleEditState(row, false);
        updateProfileCompletion();
    };

    const cancelChanges = (row) => {
        const valueDisplay = row.querySelector('.info-value');
        const inputEl = row.querySelector('.info-input');
        if (row.dataset.field === 'interests') {
            inputEl.value = Array.from(valueDisplay.querySelectorAll('.interest-tag')).map(tag => tag.textContent.substring(1)).join(', ');
        } else {
            inputEl.value = valueDisplay.textContent;
        }
        toggleEditState(row, false);
    };

    const profilePicInput = document.getElementById('profilePictureUpload');
    const profilePicPreview = document.getElementById('profilePicturePreview');
    profilePicInput.addEventListener('change', () => {
        if (profilePicInput.files && profilePicInput.files[0]) {
            profilePicPreview.src = URL.createObjectURL(profilePicInput.files[0]);
        }
    });

    const dobInput = detailsSection.querySelector('[data-field="dob"] .info-input');
    const workplaceRow = document.getElementById('workplaceRow');
    const updateWorkplaceField = () => {
        const dob = new Date(dobInput.value);
        const age = new Date().getFullYear() - dob.getFullYear();
        if (age <= 22) {
            workplaceRow.querySelector('i').className = 'bx bxs-school';
            workplaceRow.querySelector('.info-label').textContent = 'School Name';
        } else {
            workplaceRow.querySelector('i').className = 'bx bx-buildings';
            workplaceRow.querySelector('.info-label').textContent = 'Office Name';
        }
    };

    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const allEditableRows = detailsSection.querySelectorAll('.info-row[data-field]');
    const updateProfileCompletion = () => {
        let filledCount = 0;
        allEditableRows.forEach(row => {
            const value = row.querySelector('.info-value').textContent;
            if (value && value.trim() !== '') filledCount++;
        });
        const percentage = Math.round((filledCount / allEditableRows.length) * 100);
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}% Complete`;
    };

    updateWorkplaceField();
    updateProfileCompletion();
});
// --- LOGIC FOR ADD ADDRESS PAGE ---
document.addEventListener('DOMContentLoaded', () => {
    const pincodeInput = document.getElementById('pincode');
    const cityInput = document.getElementById('city');
    const stateInput = document.getElementById('state');

    if (!pincodeInput) return;

    pincodeInput.addEventListener('keyup', async () => {
        const pincode = pincodeInput.value;
        if (pincode.length === 6) {
            try {
                const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
                const data = await response.json();

                if (data && data[0].Status === "Success") {
                    const postOffice = data[0].PostOffice[0];
                    cityInput.value = postOffice.District;
                    stateInput.value = postOffice.State;
                } else {
                    cityInput.value = '';
                    stateInput.value = '';
                }
            } catch (error) {
                console.error("Error fetching pincode data:", error);
                cityInput.value = '';
                stateInput.value = '';
            }
        }
    });
});
// --- LOGIC FOR SAVED ADDRESSES PAGE ---
document.addEventListener('DOMContentLoaded', () => {
    const addressGrid = document.querySelector('.address-grid');
    if (!addressGrid) return;

    addressGrid.addEventListener('click', function (event) {
        const removeBtn = event.target.closest('.remove-btn');
        if (removeBtn) {
            if (confirm('Are you sure you want to remove this address?')) {
                const cardToRemove = removeBtn.closest('.address-card');
                cardToRemove.classList.add('removing');
                cardToRemove.addEventListener('transitionend', () => {
                    cardToRemove.remove();
                });
            }
        }
    });

    addressGrid.addEventListener('change', function (event) {
        const defaultRadio = event.target.closest('input[type="radio"]');
        if (defaultRadio) {
            const allCards = addressGrid.querySelectorAll('.address-card');
            allCards.forEach(card => card.classList.remove('default'));
            const selectedCard = defaultRadio.closest('.address-card');
            selectedCard.classList.add('default');
        }
    });
});

// --- LOGIC FOR MY ORDERS PAGE ---
document.addEventListener('DOMContentLoaded', () => {
    const ordersPage = document.querySelector('.orders-page');
    if (!ordersPage) return;

    const filterTabs = ordersPage.querySelectorAll('.filter-btn');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // In a real app, you would add logic here to filter and show orders
            // based on the tab.dataset.filter value.
        });
    });
});
// --- LOGIC FOR LISTED ORDERS PAGE ---
document.addEventListener('DOMContentLoaded', () => {
    const listedOrdersPage = document.querySelector('.listed-orders-page');
    if (!listedOrdersPage) return;

    const filterTabs = listedOrdersPage.querySelectorAll('.filter-btn');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
});

// --- LOGIC FOR JOIN ROOM MODAL ---
document.addEventListener('DOMContentLoaded', () => {
    const joinRoomBtn = document.querySelector('.join-room');
    const modal = document.getElementById('joinRoomModal');
    const modalCloseBtn = modal?.querySelector('.modal-close');
    const backdrop = document.getElementById('backdrop');
    const body = document.querySelector('body');

    const openModal = () => {
        if (!modal || !backdrop) return;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        backdrop.classList.add('active');
        body.classList.add('modal-open');
    };

    const closeModal = () => {
        if (!modal || !backdrop) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        if (!document.querySelector('.sidebar.open')) {
            backdrop.classList.remove('active');
            body.classList.remove('modal-open');
        }
    };

    joinRoomBtn?.addEventListener('click', openModal);
    modalCloseBtn?.addEventListener('click', closeModal);

    backdrop?.addEventListener('click', () => {
        if (modal.classList.contains('active')) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
