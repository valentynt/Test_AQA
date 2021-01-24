"use strict";

const { Builder, By } = require('selenium-webdriver');
const assert = require('chai').assert;

async function testFour() {
    const driver = await new Builder().forBrowser('chrome').build();
    
    try {
        // 1. Открыть в браузере http://the-internet.herokuapp.com/
        await driver.get('http://the-internet.herokuapp.com/');
        await driver.manage().window().maximize();

        // 2. Перейти в File Upload
        await (await driver.findElement(By.linkText("File Upload"))).click();

        // 3. Выберите любой файл из ПК
        await driver.findElement(By.id("file-upload")).sendKeys("C:/Selenium/other_files/robot.png");

        // 4. Кликните Upload
        await (await driver.findElement(By.id("file-submit"))).click();

        // 5. Проверьте, что отображается месседж File Uploaded!
        let actText = await (await driver.findElement(By.className('example'))).getText();
        assert.include(actText, 'File Uploaded!', 'message: "File Uploaded!"');

    } finally {
        await driver.quit();
    }
}

testFour();
