import { test } from './fixtures/baseFixtures'; // 커스텀 피스쳐 임포트
import testData from './data/test-data.json';   // 외부 데이터 임포트

test('스케쳐스 (POM) 공부', async ({ page, loginPage, header, productPage, cartPage }) => {
  test.setTimeout(120000);

  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.getByRole('link', { name: '로그인' }).click();
  await loginPage.login();

  for (const item of testData.shoppingList) {
    await header.goToCategory(item.type);
    await header.selectFirstProduct(item.sort);
    await productPage.selectFirstOptions();
    await productPage.addToCartAndContinue();
  }

  await header.searchProduct(testData.searchKeyword);
  await header.selectFirstProduct('SALE_PRICE_DESC');
  await productPage.selectFirstOptions();
  await productPage.addToCartAndGoToCart();

  await cartPage.removeFirstItem();
  await cartPage.proceedToOrder();

  await page.screenshot({ path: 'final-order-result.png' });
});
