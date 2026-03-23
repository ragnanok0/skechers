import { Locator, Page } from '@playwright/test';

export class MainHeader {
  readonly page: Page; // 브라우저 페이지 객체
  readonly menMenu: Locator; // 'MEN' 메뉴 버튼 위치
  readonly womenMenu: Locator; // 'WOMEN' 메뉴 버튼 위치
  readonly kidsMenu: Locator; // 'KIDS' 메뉴 버튼 위치
  readonly searchInput: Locator; // 검색창 위치

  constructor(page: Page) {
    this.page = page;

    this.menMenu = page.getByRole('link', { name: 'MEN', exact: true }).first();
    this.womenMenu = page.getByRole('link', { name: 'WOMEN', exact: true }).first();
    this.kidsMenu = page.getByRole('link', { name: 'KIDS', exact: true }).first();
    this.searchInput = page.getByRole('textbox', { name: '검색어를 입력해 주세요' });
  }

  async goToCategory(type: string) {
    if (type === 'outer') {
      await this.menMenu.hover();
      await this.page.waitForTimeout(500); // 0.5초 대기
      await this.page.getByRole('link', { name: '의류' }).first().click();
      await this.page.getByRole('link', { name: '아우터' }).first().click({ force: true });
    } else if (type === 'bag') {
      await this.womenMenu.hover();
      await this.page.waitForTimeout(500); // 0.5초 대기
      await this.page.getByRole('link', { name: '용품' }).first().click();
      await this.page.getByRole('link', { name: '가방' }).first().click({ force: true });
    } else if (type === 'kids') {
      await this.kidsMenu.hover();
      await this.page.waitForTimeout(500); // 0.5초 대기
      await this.page.getByRole('link', { name: '테크놀로지' }).first().click();
      await this.page.getByRole('link', { name: '메모리폼' }).first().click({ force: true });
    }
    await this.page.waitForLoadState('load');
  }

  // 검색 기능
  async searchProduct(keyword: string) {
    await this.searchInput.waitFor({ state: 'visible' });
    await this.searchInput.click();
    await this.searchInput.fill(''); 
    await this.searchInput.fill(keyword);
    await this.page.keyboard.press('Enter');
    await this.page.locator('.product-tile').first().waitFor({ state: 'visible' });
  }

  async selectFirstProduct(sortOption: string = 'SALE_PRICE_ASC') {
    const sortSelect = this.page.locator('select[name="sort"]');
    await sortSelect.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(500);
    await sortSelect.selectOption(sortOption);

    const firstProduct = this.page.locator('.product-tile .name a.text-link').first();
    await firstProduct.waitFor({ state: 'visible' });
    await firstProduct.click();
    await this.page.waitForTimeout(500);
    
    await this.page.waitForLoadState('load');
  }
}
