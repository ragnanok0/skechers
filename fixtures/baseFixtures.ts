import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainHeader } from '../pages/MainHeader';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

// 1. 사용할 피스쳐들의 타입을 정의합니다.
type MyFixtures = {
  loginPage: LoginPage;
  header: MainHeader;
  productPage: ProductPage;
  cartPage: CartPage;
};

// 2. 기본 test를 확장하여 페이지 객체를 자동으로 생성하도록 설정합니다.
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  header: async ({ page }, use) => {
    await use(new MainHeader(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export { expect } from '@playwright/test';