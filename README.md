# TU Wien Auto Login – Tampermonkey Script

Automatically clicks the **Login** button on TISS, dismisses the cookie policy on TUWEL, and clicks the **Login** button.  
Saves you from one extra click every time.

## 🚀 Features

- ✅ Works on **TISS** (German/English) – clicks the top‑right "Login"
- ✅ Works on **TUWEL** – dismisses the orange "Continue/Fortsetzen" cookie banner, then clicks "TU WIEN Login"
- ✅ Optional success notification (shows time taken) – can be disabled in script
- ✅ Lightweight, no credentials are ever read or stored

## 📥 Installation

### 1. Install Tampermonkey
- [Chrome Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
- [Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

### 2. Install the script
Click this link: **[Install script from GitHub](https://github.com/Kismet-Minos/TU-Wien-Auto-Login-Until-MFA-/raw/main/tuwien-auto-login.user.js)**  
(Or directly open the `.user.js` file in this repo and click **Raw** – Tampermonkey will ask you to install.)

### 3. Verify it works
- Visit [TISS](https://tiss.tuwien.ac.at/) – the "Login" button should be clicked automatically.
- Visit [TUWEL](https://tuwel.tuwien.ac.at/) – after a second, you'll be redirected to the MFA page.

## ⚙️ Configuration

Open the script in Tampermonkey dashboard and look for this line near the top:

```javascript
const SHOW_SUCCESS_NOTIFICATION = true; // Change to false to disable
```
## ⚠️ Important Notes
- Your credentials are never touched – the script only clicks buttons. Browser autofill must be enabled and your password saved in the browser.
- Only works on desktop browsers (Chrome, Firefox, Edge). Android may work with Firefox + Tampermonkey, but iOS is not supported.
- If the login page URL ever changes, the script may stop working. Please open an issue.
