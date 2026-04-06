// ==UserScript==
// @name         TU Wien Auto Login (TISS & TUWEL)
// @namespace    https://github.com/Kismet-Minos/TU-Wien-Auto-Login-Until-MFA-
// @version      1.0
// @description  Auto-click login buttons and policy confirms for TISS and TUWEL
// @author       Kismet-Minos
// @match        https://tiss.tuwien.ac.at/*
// @match        https://tuwel.tuwien.ac.at/login/index.php
// @icon           https://www.tuwien.at/favicon.ico
// @grant         none
// ==/UserScript==

(function() {
    'use strict';

    // --------------------------
    // Configuration: Set to true to enable login success notification
    // --------------------------
    const SHOW_SUCCESS_NOTIFICATION = true; // Change to false to disable

    // --------------------------
    // Helper function: Wait for an element to appear and then click it
    // --------------------------
    function waitAndClick(selector, callback) {
        const checkInterval = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(checkInterval);
                element.click();
                if (callback) callback();
            }
        }, 100); // Check every 100ms
    }

    // --------------------------
    // Helper function: Show success notification with time taken
    // --------------------------
    function showNotification(timeTaken) {
        // Create notification element
        const notification = document.createElement('div');
        notification.textContent = `Login successful! Time taken: ${timeTaken.toFixed(2)}s`;
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.padding = '12px 20px';
        notification.style.backgroundColor = '#28a745';
        notification.style.color = 'white';
        notification.style.borderRadius = '4px';
        notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        notification.style.zIndex = '9999';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';

        // Add to body
        document.body.appendChild(notification);

        // Fade in
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 100);

        // Fade out and remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // --------------------------
    // Record start time when script loads
    // --------------------------
    const startTime = performance.now();

    // --------------------------
    // Logic for TISS initial page (click Login button)
    // --------------------------
    if (window.location.hostname === 'tiss.tuwien.ac.at' && !window.location.pathname.startsWith('/admin/authentifizierung')) {
        waitAndClick('a.toolLogin');
    }

    // --------------------------
    // Logic for TUWEL initial page (handle cookie banner, then click TU Wien Login)
    // --------------------------
    if (window.location.href === 'https://tuwel.tuwien.ac.at/login/index.php') {
        // First, check and click cookie banner (Continue/Fortsetzen)
        const cookieButtonSelector = 'a.eupopup-button';
        let cookieChecked = false;
        const checkCookie = setInterval(() => {
            const cookieButton = document.querySelector(cookieButtonSelector);
            if (cookieButton) {
                clearInterval(checkCookie);
                cookieButton.click();
                // After clicking cookie, wait a bit then click TU Wien Login
                setTimeout(() => {
                    waitAndClick('a.login-identityprovider-btn');
                }, 500);
                cookieChecked = true;
            } else if (!cookieChecked) {
                // No cookie banner, directly click TU Wien Login
                const loginButton = document.querySelector('a.login-identityprovider-btn');
                if (loginButton) {
                    clearInterval(checkCookie);
                    waitAndClick('a.login-identityprovider-btn');
                    cookieChecked = true;
                }
            }
        }, 100);
    }
})();