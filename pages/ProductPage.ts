import { Locator, Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page; 
  readonly colorOptions: Locator;  // 색상 옵션 선택 버튼
  readonly sizeOptions: Locator;  // 사이즈 옵션 선택 버튼
  readonly cartBtn: Locator; // 장바구니 담기 버튼
  readonly continueShoppingBtn: Locator; // 쇼핑 계속하기 버튼 (팝업 내)
  readonly confirmCartBtn: Locator; // 장바구니 이동 확인 버튼 (팝업 내)

  constructor(page: Page) {
    this.page = page;
    this.colorOptions = page.locator('.variation-anchor'); 
    this.sizeOptions = page.locator('span.variation-anchor');

    this.cartBtn = page.getByRole('link', { name: '장바구니' });
    this.continueShoppingBtn = page.locator('button.js-modal-confirm-cancel');
    this.confirmCartBtn = page.locator('.js-modal-confirm, .btn-confirm').filter({ hasText: '확인' });
  }

  async selectFirstOptions() {
    const colors = await this.page.locator('.variation-anchor').all();
    for (const color of colors) {
      const isDisabled = await color.evaluate(el => el.classList.contains('disabled'));
      if (!isDisabled) {
        await color.click({ force: true });
        break;
      }
    }
    await this.page.waitForTimeout(500);

    const sizes = await this.page.locator('span.variation-anchor').all();
    for (const size of sizes) {
      const isVisible = await size.isVisible();
      const isEnabled = await size.isEnabled();
      if (isVisible && isEnabled) {
        await size.click({ force: true });
        break; 
      }
    }
    await this.page.waitForTimeout(500);
  }

  async addToCartAndContinue() {
    await this.cartBtn.click({ force: true });
    try {
    await this.continueShoppingBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.continueShoppingBtn.click({ force: true });
  } catch (e) {
    console.log("팝업이 나타나지 않았습니다. 이미 담긴 상품인지 확인이 필요합니다.");
    throw e;
  }
  }

  async addToCartAndGoToCart() {
  await this.cartBtn.waitFor({ state: 'visible' });
  await this.cartBtn.click();

  try {
    await this.confirmCartBtn.waitFor({ 
      state: 'visible', 
      timeout: 10000 // 10초 대기
    });

    await this.confirmCartBtn.click({ force: true });
  } catch (e) {

    console.log("확인 버튼을 찾지 못했습니다. 팝업이 뜨지 않았을 수 있습니다.");
    throw e;
  }

  await this.page.waitForURL(/\/cart/, { timeout: 15000 });
}
}
