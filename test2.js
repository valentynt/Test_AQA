"use strict";

const { Builder, By } = require('selenium-webdriver');
const assert = require('chai').assert;

async function testTwo() {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        // 1. Открыть в браузере http://the-internet.herokuapp.com/
        await driver.get('http://the-internet.herokuapp.com/');
        await driver.manage().window().maximize();

        // 2. Перейти в JavaScript Alerts
        let jsAlerts = await driver.findElement(By.linkText("JavaScript Alerts"));
        await jsAlerts.click();

        // 3. Кликните на Click for JS Alert > Кликните OK на алерте
        await (await driver.findElement(By.xpath("//button[text()='Click for JS Alert']"))).click();
        await (await driver.switchTo().alert()).accept();

        // 4. Проверьте, что результат You successfuly clicked an alert
        let actResult1 = await (await driver.findElement(By.id('result'))).getText();
        assert.equal(actResult1, 'You successfuly clicked an alert', 'Result: ' + actResult1);

        // 5. Кликните на Click for JS Confirm > Кликните Cancel
        let confirm = (await driver.findElements(By.xpath("//button[contains(text(),'Click')]")))[1];
        await confirm.click();
        await (await driver.switchTo().alert()).dismiss();

        // 6. Проверьте, что результат You clicked: Cancel
        let actResult2 = await (await driver.findElement(By.id('result'))).getText();
        assert.equal(actResult2, 'You clicked: Cancel', 'Result: ' + actResult2);

        // 7. Кликните на Click for JS Prompt > Введите любое слово > Кликните OK на алерте
        let promptJS = (await driver.findElements(By.xpath("//button[contains(text(),'Click')]")))[2];
        await promptJS.click();
        await (await driver.switchTo().alert()).sendKeys('Hello World!!!');
        await (await driver.switchTo().alert()).accept();

        // 8. Проверьте, что результат You entered: asd
        let actResult3 = await (await driver.findElement(By.id('result'))).getText();
        assert.include(actResult3, 'Hello World!!!', 'Result: ' + actResult3);

    } finally {
        await driver.quit();
    }
}

testTwo();
