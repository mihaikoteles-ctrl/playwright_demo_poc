# Playwright POM Demo - WORKING TESTS

A minimal, **actually working** Playwright test framework using Page Object Model pattern.

## 🎯 What This Is

- **Real, runnable tests** against https://www.saucedemo.com
- **Clean POM structure** with minimal boilerplate
- **8 working tests** that you can run right now
- **Simple to understand** and extend

## 📁 Project Structure

```
playwright-demo-working/
├── pages/
│   ├── BasePage.ts           # Base page class
│   ├── LoginPage.ts           # Login page object
│   ├── InventoryPage.ts       # Products page object
│   └── PageManager.ts         # Centralized page access
├── tests/
│   ├── login.spec.ts          # 5 login tests (all pass!)
│   └── shopping.spec.ts       # 3 shopping cart tests (all pass!)
├── fixtures/
│   └── pageFixture.ts         # Custom fixture for pageManager
├── data/
│   └── testData.ts            # Test users and products
└── playwright.config.ts       # Config pointing to saucedemo.com
```

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Install browsers
```bash
npx playwright install
```

### 3. Run tests
```bash
npm test
```

### 4. View report
```bash
npm run report
```

## ✅ Working Tests

### Login Tests (5 tests)
- ✅ Login with valid credentials
- ✅ Error with locked out user
- ✅ Error with invalid credentials
- ✅ Error when username is empty
- ✅ Error when password is empty

### Shopping Tests (3 tests)
- ✅ Add single item to cart
- ✅ Add multiple items to cart
- ✅ Navigate to cart page

## 🎓 How It Works

### Page Object Example

```typescript
// pages/LoginPage.ts
export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  
  async login(username: string, password: string) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }
}
```

### Test Example

```typescript
// tests/login.spec.ts
test('should login successfully', async ({ pageManager }) => {
  await pageManager.loginPage.navigate();
  await pageManager.loginPage.login('standard_user', 'secret_sauce');
  await pageManager.inventoryPage.verifyPageLoaded();
});
```

## 🔧 Commands

```bash
# Run all tests
npm test

# Run in headed mode (see browser)
npm run test:headed

# Run in UI mode (interactive)
npm run test:ui

# View last report
npm run report

# Run specific test file
npx playwright test tests/login.spec.ts

# Run single test
npx playwright test -g "should login successfully"
```

## 📝 Adding New Tests

### 1. Create a new page object (if needed)

```typescript
// pages/CheckoutPage.ts
export class CheckoutPage extends BasePage {
  readonly firstNameInput: Locator;
  
  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('#first-name');
  }
  
  async fillCheckoutInfo(firstName: string) {
    await this.fill(this.firstNameInput, firstName);
  }
}
```

### 2. Add to PageManager

```typescript
// pages/PageManager.ts
get checkoutPage(): CheckoutPage {
  if (!this._checkoutPage) {
    this._checkoutPage = new CheckoutPage(this.page);
  }
  return this._checkoutPage;
}
```

### 3. Write your test

```typescript
// tests/checkout.spec.ts
test('should complete checkout', async ({ pageManager }) => {
  // Login
  await pageManager.loginPage.navigate();
  await pageManager.loginPage.login('standard_user', 'secret_sauce');
  
  // Add item and checkout
  await pageManager.inventoryPage.addToCart('Sauce Labs Backpack');
  await pageManager.checkoutPage.fillCheckoutInfo('John');
});
```

## 🌐 Test Site

This project uses **SauceDemo** (https://www.saucedemo.com)
- Free public demo site
- Designed for testing
- Provides test credentials
- Stable and reliable

### Available Test Users

```typescript
standard_user      // Normal user
locked_out_user    // Locked account
problem_user       // User with bugs
```

Password for all: `secret_sauce`

## 💡 Key Benefits

✅ **Actually works** - Run it right now  
✅ **Clean structure** - Easy to understand  
✅ **Minimal code** - No unnecessary complexity  
✅ **Real examples** - Working tests you can learn from  
✅ **Easy to extend** - Add your own pages and tests  

## 🎯 Next Steps

1. ✅ Run the tests and see them pass
2. ✅ Read through the page objects
3. ✅ Understand the test structure
4. ✅ Add a new test yourself
5. ✅ Adapt this for your own application

## 📚 Resources

- [Playwright Docs](https://playwright.dev)
- [SauceDemo Site](https://www.saucedemo.com)
- [Page Object Model](https://playwright.dev/docs/pom)

---

**This is a working, minimal example you can actually run! 🎉**
