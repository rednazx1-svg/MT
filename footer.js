class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        // Get CONFIG from window
        const CONFIG = window.CONFIG || {
            BUSINESS_NAME: "TradeMaster Pro",
            PHONE_DISPLAY: "(204) 555-0198",
            PHONE_E164: "+12045550198",
            EMAIL: "info@trademasterpro.com",
            SERVICE_AREA: "Springfield and surrounding areas"
        };
this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                }
                
                .footer {
                    background-color: #111827;
                    color: #d1d5db;
                    padding: 3rem 1rem;
                }
                
                .footer-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                
                .footer-content {
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                    gap: 3rem;
                }
                
                @media (min-width: 768px) {
                    .footer-content {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
                
                .footer-section {
                    display: flex;
                    flex-direction: column;
                }
                
                .footer-title {
                    color: white;
                    font-size: 1.25rem;
                    font-weight: bold;
                    margin-bottom: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .footer-links {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                
                .footer-link {
                    color: #9ca3af;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: color 0.2s ease;
                }
                
                .footer-link:hover {
                    color: white;
                }
                
                .contact-info {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                
                .contact-item {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    color: #9ca3af;
                }
                
                .contact-icon {
                    color: #2563eb;
                    flex-shrink: 0;
                }
                
                .copyright {
                    margin-top: 3rem;
                    padding-top: 2rem;
                    border-top: 1px solid #374151;
                    text-align: center;
                    color: #9ca3af;
                    font-size: 0.875rem;
                }
                
                .business-hours {
                    color: #9ca3af;
                    line-height: 1.6;
                }
                
                .hours-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    margin-top: 0.5rem;
                }
                
                .hour-item {
                    display: flex;
                    justify-content: space-between;
                }
                
                .emergency {
                    color: #ef4444;
                    font-weight: 600;
                }
            </style>
            
            <footer class="footer">
                <div class="footer-container">
                    <div class="footer-content">
                        <div class="footer-section">
                            <h3 class="footer-title">
                                <i data-feather="tool" class="w-5 h-5"></i>
                                <span data-bind="BUSINESS_NAME"></span>
                            </h3>
                            <p class="business-hours" data-bind="SERVICE_AREA_DESC">
                                Professional local service for <span data-bind="SERVICE_AREA"></span>. 
                                Quality workmanship and reliable service guaranteed.
                            </p>
</div>
                        
                        <div class="footer-section">
                            <h3 class="footer-title">
                                <i data-feather="clock" class="w-5 h-5"></i>
                                Service Hours
                            </h3>
                            <div class="hours-list">
                                <div class="hour-item">
                                    <span>Monday - Friday</span>
                                    <span>7:00 AM - 7:00 PM</span>
                                </div>
                                <div class="hour-item">
                                    <span>Saturday</span>
                                    <span>8:00 AM - 5:00 PM</span>
                                </div>
                                <div class="hour-item">
                                    <span>Sunday</span>
                                    <span>Emergency Only</span>
                                </div>
                                <div class="hour-item emergency">
                                    <span>24/7 Emergency</span>
                                    <span>Available</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="footer-section">
                            <h3 class="footer-title">
                                <i data-feather="phone" class="w-5 h-5"></i>
                                Contact Us
                            </h3>
                            <div class="contact-info">
                                <a href="#" data-bind-href="phone" class="contact-item">
                                    <i data-feather="phone" class="contact-icon w-4 h-4"></i>
                                    <span data-bind="PHONE_DISPLAY"></span>
                                </a>
                                <a href="#" data-bind-href="email" class="contact-item">
                                    <i data-feather="mail" class="contact-icon w-4 h-4"></i>
                                    <span data-bind="EMAIL"></span>
                                </a>
                                <div class="contact-item">
                                    <i data-feather="map-pin" class="contact-icon w-4 h-4"></i>
                                    <span data-bind="SERVICE_AREA"></span>
                                </div>
</div>
                            <div class="footer-links" style="margin-top: 1.5rem;">
                                <a href="#contact-form" class="footer-link">
                                    <i data-feather="message-square" class="w-4 h-4"></i>
                                    Request a Quote
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="copyright">
                        <p>&copy; <span data-bind="CURRENT_YEAR"></span> <span data-bind="BUSINESS_NAME"></span>. All rights reserved.</p>
<p style="margin-top: 0.5rem;">Licensed, Bonded & Insured | Master Template v1.0</p>
                    </div>
                </div>
            </footer>
        `;
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

customElements.define('custom-footer', CustomFooter);