# BetWarrior - SauceDemo Automation — Playwright + JavaScript

---

## Qué cubre

**Pedidos en el challenge**

1. Login exitoso con `standard_user`
2. Login fallido con credenciales inválidas + mensaje de error
3. Compra happy path completa
4.  `locked_out_user` no puede entrar (mensaje de bloqueo)
5.  Checkout con campos vacíos → error "First Name is required"

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

- `.env`: `BASE_URL`, usuarios/passwords (standard, invalid, locked_out)
- `baseURL` en el config lee `process.env.BASE_URL` 
- timeouts razonables, `retries: 1`, reporter list + HTML + Allure
- solo **Chromium**
- screenshot on failure



---

