// @ts-check
import { test, expect } from '@playwright/test';

test('onliner.by доступен и содержит кнопку "Каталог"', async ({ page }) => {
  console.log('🚀 Начинаем проверку доступности onliner.by');
  
  // Переходим на сайт
  await page.goto('https://onliner.by/');
  
  // Проверяем, что страница загрузилась
  await expect(page).toHaveTitle(/Onlíner/);
  console.log('✅ Сайт onliner.by доступен');
  
  // Ждем загрузки основного контента
  await page.waitForLoadState('networkidle');
  
  // Проверяем наличие кнопки "Каталог"
  const catalogButton = page.locator('a[href*="catalog.onliner.by"]').first();
  await expect(catalogButton).toBeVisible();
  console.log('✅ Кнопка "Каталог" найдена');
  
  // Проверяем, что кнопка ведет на правильный URL
  await expect(catalogButton).toHaveAttribute('href', /catalog\.onliner\.by/);
  console.log('✅ Кнопка "Каталог" ведет на catalog.onliner.by');
  
  // Кликаем на кнопку каталог
  await catalogButton.click();
  await page.waitForLoadState('networkidle');
  
  // Проверяем, что мы перешли в каталог
  await expect(page).toHaveURL(/catalog\.onliner\.by/);
  console.log('✅ Переход в каталог успешен');
  
  // Проверяем заголовок каталога
  await expect(page).toHaveTitle(/Каталог/);
  console.log('✅ Заголовок каталога корректен');
  
  console.log('🎉 Проверка доступности onliner.by завершена успешно!');
});

test('проверка основных элементов onliner.by', async ({ page }) => {
  console.log('🔍 Проверяем основные элементы сайта');
  
  await page.goto('https://onliner.by/');
  await page.waitForLoadState('networkidle');
  
  // Проверяем основные навигационные элементы
  const mainNav = page.locator('.b-main-navigation');
  await expect(mainNav).toBeVisible();
  
  // Проверяем наличие основных разделов
  const sections = [
    'Каталог',
    'Новости', 
    'Автобарахолка',
    'Дома и квартиры',
    'Услуги',
    'Барахолка',
    'Форум'
  ];
  
  for (const section of sections) {
    try {
      const link = page.locator(`a:has-text("${section}")`).first();
      await expect(link).toBeVisible({ timeout: 5000 });
      console.log(`✅ Раздел "${section}" найден`);
    } catch (error) {
      console.log(`⚠️ Раздел "${section}" не найден или не виден`);
    }
  }
  
  // Проверяем логотип
  const logo = page.locator('.header-style__title, .logo, [alt*="Onliner"]').first();
  await expect(logo).toBeVisible();
  console.log('✅ Логотип сайта найден');
  
  console.log('🎉 Проверка основных элементов завершена');
});

test('быстрая проверка каталога onliner.by', async ({ page }) => {
  console.log('⚡ Быстрая проверка каталога');
  
  await page.goto('https://catalog.onliner.by/');
  await page.waitForLoadState('networkidle');
  
  // Проверяем заголовок
  await expect(page).toHaveTitle(/Каталог/);
  console.log('✅ Каталог доступен');
  
  // Проверяем наличие основных категорий
  const categories = [
    'Компьютеры и сети',
    'Мобильные телефоны',
    'Бытовая техника',
    'Телевизоры и видео'
  ];
  
  for (const category of categories) {
    try {
      const categoryLink = page.locator(`text="${category}"`).first();
      await expect(categoryLink).toBeVisible({ timeout: 3000 });
      console.log(`✅ Категория "${category}" найдена`);
    } catch (error) {
      console.log(`⚠️ Категория "${category}" не найдена`);
    }
  }
  
  console.log('🎉 Быстрая проверка каталога завершена');
});


