# BetWarrior - SauceDemo Automation — Playwright + JavaScript

---

## Requisitos

- Node.js 18 
- npm

---

## Instalación

```bash
npm install
npx playwright install chromium
```

Copiar variables de entorno - Windows (PowerShell):

```powershell
Copy-Item .env.example .env
```

El `.env` tiene la URL base y las credenciales de login.

---

## Cómo correr los tests

Comando principal:

```bash
npm test
```

Otros útiles:

```bash
npm run test:ui        # Playwright UI Mode
npm run test:allure    # corre tests + genera reporte Allure (HTML)
```

---

## Cómo ver el reporte

### Allure (el que uso como reporte principal)

```bash
npm run test:allure
```

Eso corre la suite y deja un **solo archivo HTML**:

```
allure-report/index.html
```

Para abrirlo:

```bash
npm run report:allure
```

O abrir `allure-report/index.html` a mano (es single-file).

### HTML nativo de Playwright

También queda disponible después de cualquier corrida:

```bash
npm test
npm run report
```

Carpeta: `playwright-report/`. En fallos se guarda screenshot.

---

## Estructura del proyecto

```
├── pages/                 
│   ├── CommonPage.js      
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   ├── CheckoutInfoPage.js
│   ├── CheckoutOverviewPage.js
│   └── CheckoutCompletePage.js
├── fixtures/
│   └── test.fixture.js  
├── tests/
│   ├── login.spec.js
│   └── checkout.spec.js
├── scripts/
│   └── generate-allure-report.mjs
├── .env.example
├── .gitignore
├── playwright.config.js
├── package.json
└── README.md
```

---

### Fixtures

`fixtures/test.fixture.js` solo hace `base.extend` para inyectar `loginPage`, `cartPage`, etc. Evita escribir `new LoginPage(page)` en cada test.

### Selectores

Sauce Demo expone `data-test` en casi todos los controles. En el config puse:

```js
testIdAttribute: 'data-test'
```

### Configuración (`.env` + `playwright.config.js`)

- `.env`: `BASE_URL`, usuario/password válidos e inválidos
- `baseURL` en el config lee `process.env.BASE_URL` 
- timeouts razonables, `retries: 1`, reporter list + HTML + Allure
- solo **Chromium**: alcance del challenge; preferí un flujo sólido a cross-browser superficial
- screenshot on failure

---

