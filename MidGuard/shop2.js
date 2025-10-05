document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');
    const sidebar = document.querySelector('.sidebar');
    const backdrop = document.getElementById('backdrop');

    // --- SIDEBAR LOGIC (FINAL, CORRECTED VERSION) ---
    if (sidebar) {
        const toggle = sidebar.querySelector(".toggle");
        const menuBtn = document.getElementById('menuBtn');

        const toggleSidebar = () => {
            const isMobile = window.innerWidth <= 768;

            if (isMobile) {
                sidebar.classList.remove('close'); 
                sidebar.classList.toggle('open');
                if (backdrop) backdrop.classList.toggle('active');
                body.classList.toggle('modal-open');
            } else {
                sidebar.classList.remove('open');
                sidebar.classList.toggle('close');
            }
        };

        toggle?.addEventListener('click', toggleSidebar);
        menuBtn?.addEventListener('click', toggleSidebar);
        backdrop?.addEventListener('click', () => {
            if (sidebar.classList.contains('open')) toggleSidebar();
        });
        document.addEventListener("keydown", e => {
            if (e.key === "Escape" && sidebar.classList.contains("open")) toggleSidebar();
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
            if(modeText) modeText.innerText = isDark ? "Light mode" : "Dark mode";
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

    // --- PRODUCT FILTER LOGIC (Shop Page) ---
    const filterContainer = document.querySelector('.filter-container');
    if (filterContainer) {
        const filterButtons = filterContainer.querySelectorAll('.filter-btn');
        const productCards = document.querySelectorAll('.product-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const filter = button.dataset.filter;
                productCards.forEach(card => {
                    card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'block' : 'none';
                });
            });
        });
    }
    
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
            setTimeout(() => addToCartBtn.classList.remove('is-added'), 2000);
        }
    });

// --- LOGIC FOR PRODUCT GALLERY ---
const mainImageDisplay = document.querySelector('.thumbnail');
const thumbnails = document.querySelectorAll('.thumbnail');
if (mainImageDisplay && thumbnails.length > 0) {
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            thumbnails.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            mainImageDisplay.textContent = this.textContent;
            mainImageDisplay.style.backgroundColor = this.dataset.color;
        });
    });
}

    // --- CART PAGE LOGIC ---
    const cartPage = document.querySelector('.cart-page');
    if (cartPage) {
        const cartItemsList = cartPage.querySelector('.cart-items-list');
        const subtotalEl = document.getElementById('cart-subtotal');
        const shippingEl = document.getElementById('cart-shipping');
        const totalEl = document.getElementById('cart-total');
        const emptyCartEl = cartPage.querySelector('.empty-state-container');

        const updateCartTotals = () => {
            const cartItems = cartItemsList.querySelectorAll('.cart-item');
            let subtotal = 0;
            
            if (cartItems.length === 0) {
                cartItemsList.querySelector('h2').style.display = 'none';
                if(emptyCartEl) emptyCartEl.classList.remove('hidden');
            } else {
                cartItemsList.querySelector('h2').style.display = 'block';
                if(emptyCartEl) emptyCartEl.classList.add('hidden');
            }

            cartItems.forEach(item => {
                const price = parseFloat(item.dataset.price);
                const quantity = parseInt(item.querySelector('.quantity-input').value);
                subtotal += price * quantity;
            });

            const shippingCost = parseFloat(shippingEl.textContent.replace('₹', ''));
            const total = subtotal + shippingCost;

            subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
            totalEl.textContent = `₹${total.toLocaleString('en-IN')}`;
        };

        cartItemsList.addEventListener('click', (e) => {
            const input = e.target.parentElement?.querySelector('.quantity-input');
            if (e.target.classList.contains('quantity-btn') && input) {
                let currentValue = parseInt(input.value);
                if (e.target.classList.contains('plus')) currentValue++;
                else if (e.target.classList.contains('minus')) currentValue = Math.max(1, currentValue - 1);
                input.value = currentValue;
                updateCartTotals();
            }
            if (e.target.classList.contains('remove-btn')) {
                e.target.closest('.cart-item')?.remove();
                updateCartTotals();
            }
        });
        updateCartTotals();
    }

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
                    reader.onload = function(e) {
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
    }
});
// --- LOGIC FOR WISHLIST PAGE ---
document.addEventListener('DOMContentLoaded', () => {
    const watchlistGrid = document.querySelector('.watchlist-grid');
    if (!watchlistGrid) return;

    watchlistGrid.addEventListener('click', function(event) {
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

    addressGrid.addEventListener('click', function(event) {
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
    
    addressGrid.addEventListener('change', function(event) {
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