"use strict";

const { Builder, By } = require('selenium-webdriver');
const assert = require('chai').assert;

async function testOne() {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        // 1. Открыть в браузере http://the-internet.herokuapp.com/
        await driver.get('http://the-internet.herokuapp.com/');
        await driver.manage().window().maximize();

        // 2. Перейти в Add/Remove Elements
        let addRemove = await driver.findElement(By.linkText("Add/Remove Elements"));
        await addRemove.click();

        // 3. Кликните на “Add Element” три раза
        let addElement = await driver.findElement(By.xpath("//button[text()='Add Element']"));
        for (let i = 0; i < 3; i++) {
            await addElement.click();
        }

        // 4. Проверьте, что появилось три элемента Delete
        let btnDel = await driver.findElements(By.className("added-manually"));
        assert.equal(btnDel.length, 3, 'find three elements');

        // 5. Кликните на любой Delete
        await btnDel[1].click();

        // 6. Проверьте, что осталось только два элемента Delete
        btnDel = await driver.findElements(By.className("added-manually"));
        assert.equal(btnDel.length, 2, 'left two elements');

    } finally {
        await driver.quit();
    }
}

testOne();
