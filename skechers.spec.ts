import { test } from './fixtures/baseFixtures'; // 커스텀 피스쳐 임포트
import testData from './data/test-data.json';   // 외부 데이터 임포트

test('스케쳐스 통합 시나리오 (완성형 POM)', async ({ page, loginPage, header, productPage, cartPage }) => {
  // 이 테스트만 제한 시간을 60초(60000ms)로 늘립니다.
  test.setTimeout(120000);

  // --- 메인 접속 및 로그인 ---
  // 1. 홈페이지 메인으로 접속합니다.
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  // 2. 상단의 '로그인' 버튼을 찾아 클릭합니다.
  await page.getByRole('link', { name: '로그인' }).click();
  // 3. 미리 정의된 아이디와 비밀번호로 로그인을 시도합니다.
  await loginPage.login();

  // 2. 카테고리 순회 담기 (데이터 파일의 리스트 활용)
  for (const item of testData.shoppingList) {
    await header.goToCategory(item.type);
    await header.selectFirstProduct(item.sort);
    await productPage.selectFirstOptions();
    await productPage.addToCartAndContinue();
  }

  // 3. 검색 및 장바구니 이동
  await header.searchProduct(testData.searchKeyword);
  await header.selectFirstProduct('SALE_PRICE_DESC');
  await productPage.selectFirstOptions();
  await productPage.addToCartAndGoToCart();

  // 4. 주문서 진입
  await cartPage.removeFirstItem();
  await cartPage.proceedToOrder();

  // --- 결과 확인 및 증거 남기 ---
  // 최종적으로 결제/주문 페이지까지 잘 도달했는지 스크린샷을 찍어 저장합니다.
  await page.screenshot({ path: 'final-order-result.png' });
});