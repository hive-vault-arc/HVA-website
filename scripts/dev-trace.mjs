import { spawn } from 'node:child_process';

const nextCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const child = spawn(nextCmd, ['next', 'dev'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NEXT_TURBOPACK_TRACING: '1',
  },
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});

child.on('error', (error) => {
  console.error('Failed to start traced Turbopack dev server:', error);
  process.exit(1);
});
