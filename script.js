
// MASTER TEMPLATE BINDING SYSTEM
window.bindConfig = function(rootElement = document) {
    const CONFIG = window.CONFIG || {};
    
    // Add computed properties
    CONFIG.CURRENT_YEAR = new Date().getFullYear();
    CONFIG.SERVICE_AREA_DESC = `Fast, professional service you can count on. Serving ${CONFIG.SERVICE_AREA} with excellence.`;
    
    // Bind text content
    rootElement.querySelectorAll('[data-bind]').forEach(element => {
        const key = element.getAttribute('data-bind');
        if (CONFIG[key] !== undefined) {
            element.textContent = CONFIG[key];
        }
    });
    
    // Bind href attributes
    rootElement.querySelectorAll('[data-bind-href]').forEach(element => {
        const type = element.getAttribute('data-bind-href');
        if (type === 'phone' && CONFIG.PHONE_E164) {
            element.href = `tel:${CONFIG.PHONE_E164}`;
        } else if (type === 'email' && CONFIG.EMAIL) {
            element.href = `mailto:${CONFIG.EMAIL}`;
        }
    });
    
    // Bind value attributes
    rootElement.querySelectorAll('[data-bind-value]').forEach(element => {
        const key = element.getAttribute('data-bind-value');
        if (CONFIG[key] !== undefined) {
            element.value = CONFIG[key];
        }
    });
    
    // Update any meta tags or other elements as needed
    const title = rootElement.querySelector('title');
    if (title && CONFIG.BUSINESS_NAME && CONFIG.TRADE_TYPE) {
        title.textContent = `${CONFIG.BUSINESS_NAME} | Reliable ${CONFIG.TRADE_TYPE} Services`;
    }
};

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    // First, bind config to main document
    if (window.bindConfig) {
        window.bindConfig();
    }
    
    const form = document.getElementById('lead-form');
    const submitBtn = document.getElementById('submit-btn');
    const formMessage = document.getElementById('form-message');
    const CONFIG = window.CONFIG || {};

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }

        // Disable submit button and show loading
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="spinner"></span> Sending...';

        // Clear previous messages
        formMessage.className = 'hidden';
        formMessage.textContent = '';

        try {
            // Build payload
            const payload = {
                client_id: CONFIG.CLIENT_ID || "demo_client",
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                service: document.getElementById('service').value,
                message: document.getElementById('message').value.trim(),
                source: "website_form",
                page_url: window.location.href,
                timestamp: new Date().toISOString()
            };

            // Send to configured webhook URL
            const success = await sendRequest(payload, CONFIG.WEBHOOK_URL);

            if (success) {
                // Show success message
                showMessage('Thanks — we received your request and will follow up soon.', 'success');
                
                // Reset form
                form.reset();
                
                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                throw new Error('Submission failed');
            }

        } catch (error) {
            console.error('Form submission error:', error);
            showMessage('Sorry, there was an error submitting your request. Please try again or call us directly.', 'error');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            feather.replace(); // Refresh icons
        }
    });

    // Validate form function
    function validateForm() {
        const fields = ['name', 'email', 'phone', 'service', 'message'];
        let isValid = true;

        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                field.classList.add('border-red-500');
                isValid = false;
            } else {
                field.classList.remove('border-red-500');
            }
        });

        // Email validation
        const emailField = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.value && !emailRegex.test(emailField.value)) {
            emailField.classList.add('border-red-500');
            showMessage('Please enter a valid email address.', 'error');
            isValid = false;
        }

        return isValid;
    }

    // Send request function
    async function sendRequest(payload, webhookUrl) {
        if (!webhookUrl) {
            console.error('No WEBHOOK_URL configured in CONFIG');
            return false;
        }

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return true;
        } catch (error) {
            console.error('Request failed:', error);
            return false;
        }
    }

    // Show message function
    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = type === 'success' ? 
            'message-success p-4 rounded-lg' : 
            'message-error p-4 rounded-lg';
        formMessage.classList.remove('hidden');
    }

    // Real-time validation
    if (form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('border-red-500');
                
                // Clear message when user starts typing
                if (formMessage && formMessage.textContent.includes('Please enter')) {
                    formMessage.classList.add('hidden');
                }
            });
        });
    }

    // Initialize form with default values for testing (remove in production)
    if (window.location.href.includes('localhost') || window.location.href.includes('127.0.0.1')) {
        console.log('Development mode detected - form pre-filled for testing');
        if (document.getElementById('name')) document.getElementById('name').value = 'Test User';
        if (document.getElementById('email')) document.getElementById('email').value = 'test@example.com';
        if (document.getElementById('phone')) document.getElementById('phone').value = '555-123-4567';
        if (document.getElementById('service')) document.getElementById('service').value = 'Repairs';
        if (document.getElementById('message')) document.getElementById('message').value = 'This is a test submission from development mode.';
    }
});
