import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page; // 브라우저 페이지 객체
  readonly orderBtn: Locator; // '주문하기' 버튼을 가리키는 정보(위치)
  readonly deleteBtn: Locator;        // 삭제 버튼
  readonly emptyCartMsg: Locator;     // 장바구니 비었을 때 문구

  constructor(page: Page) {
    this.page = page;

    this.orderBtn = page.locator('a, button').filter({ hasText: '주문하기' }).last();

    this.deleteBtn = page.locator('button, a').filter({has: page.locator('use[*|href="#icon-close-thin"]')});
    this.emptyCartMsg = page.locator('.empty-cart-msg, .no-data');
  }

  async removeFirstItem() {
    await this.deleteBtn.first().waitFor({ state: 'visible' });
    await this.deleteBtn.first().click();

    const confirmBtn = this.page.getByRole('button', { name: /확인|삭제/ });
    if (await confirmBtn.isVisible()) {
      await confirmBtn.click();
    }

    await this.page.waitForTimeout(1000); 
  }

  async isCartEmpty() {
    return await this.emptyCartMsg.isVisible();
  }

  async proceedToOrder() {
    await this.orderBtn.waitFor({ state: 'visible' });
    await this.orderBtn.scrollIntoViewIfNeeded();
    await this.orderBtn.click({ force: true });
  }
}
