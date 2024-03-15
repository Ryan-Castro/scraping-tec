import puppeteer, { Page } from "puppeteer"
import { item } from "../@types/items"
import mainFunctions from "../mainFunctions";


export default new class scrapingKabum {

  async start(link: string, marca: string): Promise<item[]>{
    return new Promise(async (resolve)=>{
      const browser = await puppeteer.launch();
      try {
        const page = await browser.newPage();
        await page.goto(link)
        await page.waitForSelector("#blocoProdutosListagem > div.productCard")
        let itemsScraped = await this.doPage(page, marca)
        let isNext = await page.$$eval("#blocoProdutosListagem > div.productCard", elements =>
          !elements[elements.length - 1].querySelector("div.prod-new-price")?.innerHTML.includes("---")
        )
        while(isNext){
          try {
            await page.waitForSelector("a.nextLink")
            await page.click("a.nextLink")
            await mainFunctions.waitFor(2000)
            const newItemsScraped = await this.doPage(page, marca)
            itemsScraped = [...itemsScraped, ...newItemsScraped]
            await mainFunctions.waitFor(2000)
            isNext = await page.$$eval("#blocoProdutosListagem > div.productCard", elements =>
              !elements[elements.length - 1].querySelector("div.prod-new-price")?.innerHTML.includes("---")
            )    
          } catch (error) {
            isNext = false
          }
        }
        
        await browser.close()
        resolve(itemsScraped)
      } catch (error) {
        await browser.close()
        console.log(error)
        resolve([])
      }
    })
  }
  
  async doPage(page: Page, marca: string): Promise<item[]>{
    return new Promise(async (resolve)=>{
      const itemsScraped: item[] = await page.evaluate((marca) => {
        const items = Array.from(document.querySelectorAll("#blocoProdutosListagem > div.productCard"));
        const itemsReturn: item[] = []
        items.forEach((item: any) => {
          const nome = item.querySelector("span.nameCard").innerText;
          let preco:string = item.querySelector('span.priceCard').innerText
          const link = item.querySelector('a.productLink').href;
          const thumb = item.querySelector('img.imageCard').src;
          if(!preco.includes("---")){
            itemsReturn.push({
              nome,
              preco: Number(preco.replace("R$", "")),
              link,
              thumb,
              loja: "kabum",
              marca
            });
          }
        });
        return itemsReturn
      }, marca);
      resolve(itemsScraped)
    })
  }
}