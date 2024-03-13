import puppeteer from "puppeteer"
import { item } from "../@types/items"
import mainFunctions from "../mainFunctions";


export default new class scrapingTerabyte {

    async start(link: string): Promise<item[]>{
        return new Promise(async (resolve)=>{
            try {
                const browser = await puppeteer.launch({
                    headless: false
                });
                const page = await browser.newPage();
                await page.goto(link)
                let isNext = await page.$$eval("div#prodarea > div.pbox", elements=>elements[elements.length - 1].querySelector("div.prod-new-price")?.innerHTML)
                while(isNext){
                    await page.waitForSelector("#pdmore")
                    await page.click("#pdmore")
                    await mainFunctions.waitFor(5000)
                    isNext = await page.$$eval("div#prodarea > div..pbox", elements=> elements[elements.length - 1].querySelector("div.prod-new-price")?.innerHTML)
                }
                const itemsScraped: item[] = await page.evaluate(() => {
                    const items = Array.from(document.querySelectorAll("div#prodarea > div.pbox"));
                    return items.map((item: any) => {
                      const nome = item.querySelector("a.prod-name").innerText;
                      const elementPreco = item.querySelector('div.prod-new-price')
                      let preco = 0
                      if(elementPreco){
                        preco = item.querySelector('div.prod-new-price').innerText.replace("R$", "").replace("à vista", "");

                      }
                      const link = item.querySelector('a.prod-name').href;
                      const thumb = item.querySelector('.commerce_columns_item_image img').src;
            
                      return {
                        nome,
                        preco,
                        link,
                        thumb
                      };
                    });
                  });
                  resolve(itemsScraped)
            } catch (error) {
                console.log(error)
            }
        })

    }
}