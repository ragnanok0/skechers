import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page; // 브라우저 페이지 객체
  readonly idInput: Locator; // 아이디 입력창 위치
  readonly pwInput: Locator; // 비밀번호 입력창 위치
  readonly loginBtn: Locator; // 로그인 버튼 위치

  constructor(page: Page) {
    this.page = page;

    this.idInput = page.getByRole('textbox', { name: '아이디를 입력해주세요' });
    this.pwInput = page.locator('input[type="password"]');
    this.pwInput = page.getByPlaceholder('비밀번호를 입력해주세요');
    this.loginBtn = page.getByRole('button', { name: '로그인' });
  }

  async login() {
    await this.idInput.waitFor({ state: 'visible' });
    await this.idInput.fill(process.env.USER_ID!);
    await this.pwInput.fill(process.env.USER_PW!);
    await this.pwInput.press('Enter');

    await this.page.waitForSelector('.header_layout_1', { state: 'visible', timeout: 15000 });
  }
}
