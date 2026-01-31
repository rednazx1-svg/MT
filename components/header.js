class CustomHeader extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        // Get CONFIG from window
        const CONFIG = window.CONFIG || {
            BUSINESS_NAME: "TradeMaster Pro",
            PHONE_DISPLAY: "(204) 555-0198",
            PHONE_E164: "+12045550198"
        };
this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: sticky;
                    top: 0;
                    z-index: 50;
                    width: 100%;
                }
                
                .header {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid #e5e7eb;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                }
                
                .header-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }
                .header-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 70px;
                }
                
                .logo {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #1f2937;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    z-index: 60;
                }
                
                .logo-icon {
                    color: #2563eb;
                }
                .nav-buttons {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    z-index: 60;
                }
                
                .nav-button {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1.25rem;
                    border-radius: 0.5rem;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.2s ease;
                    font-size: 0.95rem;
                    cursor: pointer;
                }
                
                .call-button {
                    background-color: #2563eb;
                    color: white;
                }
                
                .call-button:hover {
                    background-color: #1d4ed8;
                    transform: translateY(-1px);
                }
                
                .quote-button {
                    background-color: white;
                    color: #2563eb;
                    border: 2px solid #2563eb;
                }
                
                .quote-button:hover {
                    background-color: #f8fafc;
                    transform: translateY(-1px);
                }
.mobile-menu-button {
                    display: none;
                    background: none;
                    border: none;
                    color: #4b5563;
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: 0.375rem;
                }
                
                .mobile-menu-button:hover {
                    background-color: #f3f4f6;
                }
                
                .mobile-menu {
                    display: none;
                    padding: 1rem;
                    background: white;
                    border-top: 1px solid #e5e7eb;
                }
                
                .mobile-nav-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                
                @media (max-width: 768px) {
                    .nav-buttons {
                        display: none;
                    }
                    
                    .mobile-menu-button {
                        display: block;
                    }
                    
                    .mobile-menu.active {
                        display: block;
                    }
                }
                
                @media (max-width: 640px) {
                    .header-content {
                        height: 60px;
                    }
                    
                    .logo {
                        font-size: 1.25rem;
                    }
                }
            </style>
            
            <header class="header">
                <div class="header-container">
                    <div class="header-content">
                        <a href="/" class="logo">
                            <i data-feather="tool" class="logo-icon w-6 h-6"></i>
                            <span data-bind="BUSINESS_NAME"></span>
                        </a>
<div class="nav-buttons">
                            <a href="tel:+12045550198" data-bind-href="phone" class="nav-button call-button">
                                <i data-feather="phone" class="w-4 h-4"></i>
                                <span data-bind="PHONE_DISPLAY">Call Now</span>
                            </a>
<a href="#contact-form" class="nav-button quote-button">
                                <i data-feather="message-square" class="w-4 h-4"></i>
                                Request a Quote
                            </a>
                        </div>
<button class="mobile-menu-button" id="mobile-menu-toggle">
                            <i data-feather="menu" class="w-6 h-6"></i>
                        </button>
                    </div>
                    
                    <div class="mobile-menu" id="mobile-menu">
                        <div class="mobile-nav-buttons">
                        <a href="tel:+12045550198" data-bind-href="phone" class="nav-button call-button" style="justify-content: center;">
                                <i data-feather="phone" class="w-4 h-4"></i>
                                <span data-bind="PHONE_DISPLAY">Call Now</span>
                            </a>
<a href="#contact-form" class="nav-button quote-button" style="justify-content: center;">
                                <i data-feather="message-square" class="w-4 h-4"></i>
                                Request a Quote
                            </a>
</div>
                    </div>
                </div>
            </header>
        `;

        // Initialize mobile menu toggle
        const mobileMenuToggle = this.shadowRoot.getElementById('mobile-menu-toggle');
        const mobileMenu = this.shadowRoot.getElementById('mobile-menu');
        
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.setAttribute('data-feather', 'x');
            } else {
                icon.setAttribute('data-feather', 'menu');
            }
            feather.replace();
        });

        // Close mobile menu when clicking links
        const mobileLinks = this.shadowRoot.querySelectorAll('.mobile-menu a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.setAttribute('data-feather', 'menu');
                feather.replace();
            });
        });
        // Initialize feather icons in shadow DOM
        setTimeout(() => {
            feather.replace();
            // Bind config in shadow DOM
            if (window.bindConfig) {
                window.bindConfig(this.shadowRoot);
            }
        }, 100);
}
}

customElements.define('custom-header', CustomHeader);