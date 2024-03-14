import puppeteer from "puppeteer"
import { item } from "../@types/items"
import mainFunctions from "../mainFunctions";


export default new class scrapingTerabyte {

  async start(link: string, marca?: string): Promise<item[]>{
    return new Promise(async (resolve)=>{
      const browser = await puppeteer.launch({
        headless: false
      });
      try {
        const page = await browser.newPage();
        await page.goto(link)
        await mainFunctions.waitFor(10000)
        await page.waitForSelector("#bannerPop > div > div > button")
        await page.click("#bannerPop > div > div > button")
        let isNext = await page.$$eval("div#prodarea > div.pbox", elements=>elements[elements.length - 1].querySelector("div.prod-new-price")?.innerHTML)
        let currentPage = 1
        while(isNext && currentPage < 3){
          await page.waitForSelector("#pdmore")
          await page.click("#pdmore")
          await mainFunctions.waitFor(5000)
          isNext = await page.$$eval("div#prodarea > div.pbox", elements=> elements[elements.length - 1].querySelector("div.prod-new-price")?.innerHTML)
          currentPage++
        }
        const itemsScraped: item[] = await page.evaluate((marca) => {
          const items = Array.from(document.querySelectorAll("div#prodarea > div.pbox"));
          const itemsReturn: item[] = []
          items.forEach((item: any) => {
            const nome = item.querySelector("a.prod-name").innerText;
            const elementPreco = item.querySelector('div.prod-new-price')
            let preco = 0
            const link = item.querySelector('a.prod-name').href;
            const thumb = item.querySelector('.commerce_columns_item_image img').src;
            if(elementPreco){
              preco = item.querySelector('div.prod-new-price').innerText
                          .replace("R$", "")
                          .replace("à vista", "")
                          .replaceAll(".", "")
                          .replace(",", ".")
                          .trim()
              itemsReturn.push({
                nome,
                preco: Number(preco),
                link,
                thumb,
                loja: "terabyte",
                marca
              });
            }
          });
          return itemsReturn
        }, marca);
        await browser.close()
        resolve(itemsScraped)
      } catch (error) {
        await browser.close()
        console.log(error)
        resolve([])
      }
    })
  }
}