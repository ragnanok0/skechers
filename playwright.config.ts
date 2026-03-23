import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  testMatch: '**/*.spec.ts',
  /* CI 서버 속도를 고려해 전체 제한 시간 2분 설정 */
  timeout: 120 * 1000,
  /* 한 번에 하나씩 차분하게 실행 (안정성) */
  fullyParallel: false,
  workers: 1,
  /* 실패 시에만 리포트 생성 */
  reporter: 'html',

  /* 테스트 공통 설정 */
  use: {
    baseURL: 'https://www.skecherskorea.co.kr',
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 20 * 1000,
    navigationTimeout: 30 * 1000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  /* 브라우저 설정 (크롬 하나만 사용하여 속도 향상) */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
