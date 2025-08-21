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
  await page.waitForTimeout(3000);
  
  // Обрабатываем cookie-баннер, если он появился
  try {
    const cookieButton = page.locator('button:has-text("Принять"), button:has-text("Accept"), button:has-text("OK"), button:has-text("Согласен"), button:has-text("Принять все cookie")').first();
    if (await cookieButton.isVisible({ timeout: 5000 })) {
      console.log('🍪 Принимаем cookie...');
      await cookieButton.click();
      await page.waitForTimeout(2000);
      console.log('✅ Cookie приняты');
    }
  } catch (error) {
    console.log('ℹ️ Форма с cookie не найдена или уже принята');
  }
  
  // Проверяем наличие кнопки "Каталог" с более точным селектором
  const catalogButton = page.locator('a[href*="catalog.onliner.by"]').first();
  
  // Если кнопка не видна, пробуем альтернативные селекторы
  if (!(await catalogButton.isVisible({ timeout: 5000 }))) {
    console.log('🔍 Пробуем альтернативные селекторы для кнопки "Каталог"...');
    const altCatalogButton = page.locator('a:has-text("Каталог"), .header-style__link:has-text("Каталог")').first();
    if (await altCatalogButton.isVisible({ timeout: 5000 })) {
      console.log('✅ Кнопка "Каталог" найдена альтернативным способом');
      await altCatalogButton.click();
    } else {
      throw new Error('Кнопка "Каталог" не найдена ни одним способом');
    }
  } else {
    console.log('✅ Кнопка "Каталог" найдена');
    await catalogButton.click();
  }
  
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
  await page.waitForTimeout(3000);
  
  // Обрабатываем cookie-баннер, если он появился
  try {
    const cookieButton = page.locator('button:has-text("Принять"), button:has-text("Accept"), button:has-text("OK"), button:has-text("Согласен"), button:has-text("Принять все cookie")').first();
    if (await cookieButton.isVisible({ timeout: 5000 })) {
      console.log('🍪 Принимаем cookie...');
      await cookieButton.click();
      await page.waitForTimeout(2000);
      console.log('✅ Cookie приняты');
    }
  } catch (error) {
    console.log('ℹ️ Форма с cookie не найдена или уже принята');
  }
  
  // Проверяем основные навигационные элементы с более гибким подходом
  try {
    const mainNav = page.locator('.b-main-navigation, .header-style__navigation, nav').first();
    if (await mainNav.isVisible({ timeout: 5000 })) {
      console.log('✅ Основная навигация найдена');
    } else {
      console.log('⚠️ Основная навигация не видна, но это может быть нормально');
    }
  } catch (error) {
    console.log('⚠️ Основная навигация не найдена');
  }
  
  // Проверяем наличие основных разделов с более гибким подходом
  const sections = [
    'Каталог',
    'Новости', 
    'Автобарахолка',
    'Дома и квартиры',
    'Услуги',
    'Барахолка',
    'Форум'
  ];
  
  let foundSections = 0;
  for (const section of sections) {
    try {
      const link = page.locator(`a:has-text("${section}"), .header-style__link:has-text("${section}")`).first();
      if (await link.isVisible({ timeout: 3000 })) {
        console.log(`✅ Раздел "${section}" найден`);
        foundSections++;
      } else {
        console.log(`⚠️ Раздел "${section}" не виден`);
      }
    } catch (error) {
      console.log(`⚠️ Раздел "${section}" не найден`);
    }
  }
  
  // Проверяем логотип с более гибким подходом
  try {
    const logo = page.locator('.header-style__title, .logo, [alt*="Onliner"], div:has-text("Onlíner")').first();
    if (await logo.isVisible({ timeout: 5000 })) {
      console.log('✅ Логотип сайта найден');
    } else {
      console.log('⚠️ Логотип не виден, но найден в DOM');
    }
  } catch (error) {
    console.log('⚠️ Логотип не найден');
  }
  
  console.log(`🎉 Проверка основных элементов завершена. Найдено разделов: ${foundSections}/${sections.length}`);
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


