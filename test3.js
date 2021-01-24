"use strict";

const { Builder, By } = require('selenium-webdriver');
const assert = require('chai').assert;
const nodeFetch = require("node-fetch");
const reqURL = 'http://jsonplaceholder.typicode.com/todos?_start=0&_limit=5';



async function testThree() {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        // 1. Открыть в браузере http://the-internet.herokuapp.com/
        await driver.get('http://the-internet.herokuapp.com/');
        await driver.manage().window().maximize();

        // 2. Перейти в Frames > iFrame
        await (await driver.findElement(By.linkText("Frames"))).click();
        await (await driver.findElement(By.linkText("iFrame"))).click();

        // 3. Выполните нативно GET запрос http://jsonplaceholder.typicode.com/todos?_start=0&_limit=5 и запомните все title
        let response = await (await nodeFetch(reqURL)).json();

        // 4. Введите все title в текстовое поле через \n (Перевод строки)
        let contentBody = await driver.findElement(By.id('mce_0_ifr'));
        for (let i = 0; i < response.length; i++) {
            await contentBody.sendKeys(response[i].title + '\n');
        }
    } finally {
        await driver.quit();
    }
}

testThree();
