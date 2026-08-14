import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const testArgs = process.argv.slice(2);
const test = spawnSync('npx', ['playwright', 'test', ...testArgs], {
  cwd: root,
  stdio: 'inherit',
  shell: true,
});

const generate = spawnSync(
  'npx',
  [
    'allure',
    'generate',
    './allure-results',
    '--single-file',
    '--clean',
    '-o',
    './allure-report',
  ],
  {
    cwd: root,
    stdio: 'inherit',
    shell: true,
  },
);

if (generate.status !== 0) {
  console.error('\nNo se pudo generar Allure. Verifica que exista allure-results');
  process.exit(generate.status ?? 1);
}

console.log('\nReporte Allure: allure-report/index.html');
process.exit(test.status ?? 0);
