// @ts-check
import { test, expect } from '@playwright/test';

test('Купить стиральную машину Samsung WW70AG6S23ANLP через магазин STOX', async ({ page }) => {
  // Увеличиваем таймаут для этого теста
  page.setDefaultTimeout(60000);
  
  // Массив для хранения отчета о прохождении теста
  const testReport = {
    testName: 'Купить стиральную машину Samsung WW70AG6S23ANLP через магазин STOX',
    startTime: new Date().toISOString(),
    steps: [],
    status: 'running',
    endTime: null,
    totalDuration: null
  };
  
  // Функция для логирования шагов и добавления в отчет
  const logStep = (stepNumber, description, status = 'running') => {
    const step = {
      step: stepNumber,
      description,
      status,
      timestamp: new Date().toISOString(),
      duration: null
    };
    
    if (status === 'completed') {
      step.duration = Date.now() - stepStartTime;
    }
    
    testReport.steps.push(step);
    
    const emoji = status === 'completed' ? '✅' : status === 'failed' ? '❌' : '🔄';
    const statusText = status === 'completed' ? 'ЗАВЕРШЕН' : status === 'failed' ? 'ПРОВАЛЕН' : 'ВЫПОЛНЯЕТСЯ';
    
    console.log(`${emoji} Шаг ${stepNumber}: ${description} - ${statusText}`);
    
    return step;
  };
  
  // Функция для завершения шага
  const completeStep = (stepNumber, status = 'completed') => {
    const step = testReport.steps.find(s => s.step === stepNumber);
    if (step) {
      step.status = status;
      step.duration = Date.now() - stepStartTime;
    }
  };
  
  let stepStartTime = Date.now();
  
  console.log('🚀 Начинаем тест: Купить стиральную машину Samsung WW70AG6S23ANLP через магазин STOX');
  console.log('📅 Время начала: ' + new Date().toLocaleString('ru-RU'));
  console.log('='.repeat(80));
  
  try {
    // 1. Открыть сайт onliner.by
    stepStartTime = Date.now();
    logStep(1, 'Открыть сайт onliner.by');
    
    await page.goto('https://onliner.by/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page).toHaveTitle(/Onlíner/);
    completeStep(1);
    
    // Обрабатываем форму с cookie, если она появилась
    try {
      const cookieButton = page.locator('text="Принять все cookie"');
      if (await cookieButton.isVisible({ timeout: 5000 })) {
        console.log('🍪 Принимаем cookie...');
        await cookieButton.click();
        await page.waitForTimeout(2000);
        console.log('✅ Cookie приняты');
      }
    } catch (error) {
      console.log('ℹ️ Форма с cookie не найдена или уже принята');
    }
    
    // 2. Перейти в каталог
    stepStartTime = Date.now();
    logStep(2, 'Перейти в каталог');
    
    const catalogLink = page.locator('text="Каталог"').first();
    await catalogLink.click();
    await page.waitForLoadState('networkidle', { timeout: 20000 });
    completeStep(2);
    
    // 3. Перейти в раздел "Стиральные машины"
    stepStartTime = Date.now();
    logStep(3, 'Перейти в раздел "Стиральные машины"');
    
    const washingMachineLink = page.locator('text="Стиральные машины"').first();
    await washingMachineLink.click();
    await page.waitForLoadState('networkidle', { timeout: 20000 });
    completeStep(3);
    
    // 4. Найти и открыть товар "Стиральная машина Samsung WW70AG6S23ANLP"
    stepStartTime = Date.now();
    logStep(4, 'Найти и открыть товар Samsung WW70AG6S23ANLP');
    
    // Ищем товар по ссылке с точным названием
    const productLink = page.locator('a[href*="samsung/ww70ag6s23anlp"]').first();
    await expect(productLink).toBeVisible({ timeout: 10000 });
    console.log('✅ Товар Samsung WW70AG6S23ANLP найден!');
    
    // Кликаем на товар
    await productLink.click();
    await page.waitForLoadState('networkidle', { timeout: 20000 });
    
    // Проверяем, что мы на странице товара
    await expect(page).toHaveURL(/samsung\/ww70ag6s23anlp/);
    await expect(page.locator('h1:has-text("Samsung WW70AG6S23ANLP")')).toBeVisible();
    completeStep(4);
    
    // 5. Перейти к предложениям продавцов
    stepStartTime = Date.now();
    logStep(5, 'Перейти к предложениям продавцов');
    
    const offersLink = page.locator('text="Предложения продавцов"').first();
    await offersLink.click();
    await page.waitForLoadState('networkidle', { timeout: 20000 });
    completeStep(5);
    
    // 6. Найти магазин STOX и добавить товар в корзину
    stepStartTime = Date.now();
    logStep(6, 'Найти магазин STOX и добавить товар в корзину');
    
    // Ищем блок с магазином STOX
    const stoxShopBlock = page.locator('div:has(img[alt*="STOX"]), div:has(text="STOX")').first();
    await expect(stoxShopBlock).toBeVisible({ timeout: 10000 });
    console.log('✅ Магазин STOX найден!');
    
    // Ищем кнопку "Купить" в блоке STOX
    const buyButton = stoxShopBlock.locator('text="Купить"').first();
    await expect(buyButton).toBeVisible();
    console.log('✅ Кнопка "Купить" для магазина STOX найдена');
    
    // Кликаем на кнопку "Купить"
    await buyButton.click();
    await page.waitForTimeout(3000);
    completeStep(6);
    
    // 7. Проверить, что товар добавлен в корзину
    stepStartTime = Date.now();
    logStep(7, 'Проверить, что товар добавлен в корзину');
    
    // Проверяем появление уведомления о добавлении в корзину
    const cartNotification = page.locator('text="Товар добавлен в корзину", text="В корзине"').first();
    await expect(cartNotification).toBeVisible({ timeout: 10000 });
    console.log('✅ Товар успешно добавлен в корзину!');
    
    // Дополнительная проверка - кнопка должна измениться на "В корзине"
    const cartButton = stoxShopBlock.locator('text="В корзине"').first();
    await expect(cartButton).toBeVisible({ timeout: 5000 });
    console.log('✅ Кнопка изменилась на "В корзине" - товар точно в корзине!');
    completeStep(7);
    
    // 8. Перейти в корзину для финальной проверки
    stepStartTime = Date.now();
    logStep(8, 'Перейти в корзину для финальной проверки');
    
    const goToCartButton = page.locator('text="Перейти в корзину"').first();
    
    if (await goToCartButton.isVisible()) {
      await goToCartButton.click();
      await page.waitForLoadState('networkidle', { timeout: 20000 });
      
      // Проверяем, что мы в корзине и товар там есть
      await expect(page).toHaveURL(/cart\.onliner\.by/);
      await expect(page.locator('text="Корзина"')).toBeVisible();
      
      // Проверяем наличие товара Samsung в корзине
      const productInCart = page.locator('text="Samsung WW70AG6S23ANLP"').first();
      await expect(productInCart).toBeVisible();
      
      // Проверяем, что товар от магазина STOX
      const stoxInCart = page.locator('text="STOX"').first();
      await expect(stoxInCart).toBeVisible();
      
      console.log('🎉 УСПЕХ! Товар "Стиральная машина Samsung WW70AG6S23ANLP" успешно добавлен в корзину от магазина STOX!');
    } else {
      console.log('🎉 УСПЕХ! Товар добавлен в корзину (кнопка "Перейти в корзину" не найдена, но это нормально)!');
    }
    
    completeStep(8);
    
    console.log('🏁 Тест завершен успешно!');
    
    // Генерируем финальный отчет
    testReport.status = 'completed';
    testReport.endTime = new Date().toISOString();
    testReport.totalDuration = Date.now() - new Date(testReport.startTime).getTime();
    
    // Выводим детальный отчет
    console.log('\n' + '='.repeat(80));
    console.log('📊 ОТЧЕТ О ПРОХОЖДЕНИИ ТЕСТА');
    console.log('='.repeat(80));
    console.log(`🎯 Название теста: ${testReport.testName}`);
    console.log(`⏰ Время начала: ${new Date(testReport.startTime).toLocaleString('ru-RU')}`);
    console.log(`⏰ Время завершения: ${new Date(testReport.endTime).toLocaleString('ru-RU')}`);
    console.log(`⏱️ Общая продолжительность: ${Math.round(testReport.totalDuration / 1000)} сек`);
    console.log(`📈 Статус: ${testReport.status === 'completed' ? '✅ УСПЕШНО' : '❌ ПРОВАЛЕН'}`);
    
    console.log('\n📋 Детализация по шагам:');
    console.log('-'.repeat(80));
    
    testReport.steps.forEach((step) => {
      const duration = step.duration ? `${Math.round(step.duration / 1000)} сек` : 'N/A';
      const status = step.status === 'completed' ? '✅' : step.status === 'failed' ? '❌' : '🔄';
      console.log(`${status} Шаг ${step.step}: ${step.description} (${duration})`);
    });
    
    console.log('\n' + '='.repeat(80));
    console.log('🎉 ТЕСТ УСПЕШНО ЗАВЕРШЕН!');
    console.log('='.repeat(80));
    
  } catch (error) {
    // Обработка ошибок
    testReport.status = 'failed';
    testReport.endTime = new Date().toISOString();
    testReport.totalDuration = Date.now() - new Date(testReport.startTime).getTime();
    
    console.log('\n❌ ТЕСТ ПРОВАЛЕН!');
    console.log(`Ошибка: ${error.message}`);
    
    // Выводим отчет об ошибке
    console.log('\n' + '='.repeat(80));
    console.log('📊 ОТЧЕТ О ПРОВАЛЕ ТЕСТА');
    console.log('='.repeat(80));
    console.log(`🎯 Название теста: ${testReport.testName}`);
    console.log(`⏰ Время начала: ${new Date(testReport.startTime).toLocaleString('ru-RU')}`);
    console.log(`⏰ Время завершения: ${new Date(testReport.endTime).toLocaleString('ru-RU')}`);
    console.log(`⏱️ Общая продолжительность: ${Math.round(testReport.totalDuration / 1000)} сек`);
    console.log(`📈 Статус: ❌ ПРОВАЛЕН`);
    console.log(`❌ Ошибка: ${error.message}`);
    
    throw error;
  }
  
  // Ждем немного перед завершением теста
  await page.waitForTimeout(3000);
});
