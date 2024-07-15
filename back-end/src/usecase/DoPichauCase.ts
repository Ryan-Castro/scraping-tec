import puppeteer, { Page } from "puppeteer"
import { item } from "../@types/items"
import mainFunctions from "../mainFunctions";

const cardElement = "#__next main > div:nth-child(2) > div > div > div:nth-child(4) > div"


export default new class scrapingPichau {

  async start(link: string, marca: string): Promise<item[]>{
    return new Promise(async (resolve)=>{
      const browser = await puppeteer.launch({headless:false});
      try {
        const page = await browser.newPage();
        await page.goto(link)
        await page.waitForSelector(cardElement)
        await mainFunctions.waitFor(4000) 
        let itemsScraped = await this.doPage(page, marca)
        let isNext = await page.$$eval(cardElement, elements =>
          !elements[elements.length - 1].querySelector('a > div > div.MuiCardContent-root.jss437 > p')?.innerHTML.includes("Esgotado")
        )
        while(isNext){
          try {
            await page.waitForSelector(".MuiPagination-ul li:last-child button")
            await page.click(".MuiPagination-ul li:last-child button")
            await mainFunctions.waitFor(5000)
            const newItemsScraped = await this.doPage(page, marca)
            itemsScraped = [...itemsScraped, ...newItemsScraped]
            await mainFunctions.waitFor(2000)
            isNext = await page.$$eval(cardElement, elements =>
              !elements[elements.length - 1].querySelector('a > div > div.MuiCardContent-root.jss437 > p')?.innerHTML.includes("Esgotado")
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
      await this.doScroll(page)
      const itemsScraped: item[] = await page.evaluate(([marca, cardElement]) => {
        const items = Array.from(document.querySelectorAll(cardElement));
        const itemsReturn: item[] = []
        items.forEach((item: any) => {
        const nome = item.querySelector("a > div > div:nth-child(3) > h2").innerText;
        let preco:string = item.querySelector('a > div > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(3)').innerText
        const link = item.querySelector('a').href;
        const thumb = item.querySelector('a > div > div:nth-child(1) > div img').src;
        if(preco){
          itemsReturn.push({
            nome,
            preco: Number(preco.replace("R$", "").replace(".", "").replace(",", ".")),
            link,
            thumb,
            loja: "pichau",
            marca
          });
        }
      });
      return itemsReturn
    }, [marca, cardElement]);
    resolve(itemsScraped)
    })
  }
  async doScroll(page: Page): Promise<boolean>{
    return new Promise(async (resolve)=>{
      let scrollHeight = 0; 
      while (scrollHeight < 30) {
        scrollHeight++
        await page.evaluate(() => window.scrollBy(0, 500));
        await mainFunctions.waitFor(1000)
      }
      resolve(true)
    })
  }
}