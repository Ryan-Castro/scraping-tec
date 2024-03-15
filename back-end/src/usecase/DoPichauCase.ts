import puppeteer, { Page } from "puppeteer"
import { item } from "../@types/items"
import mainFunctions from "../mainFunctions";

const cardElement = "#__next > main > div:nth-child(2) > div > div.MuiGrid-root.jss413.MuiGrid-item.MuiGrid-grid-md-9.MuiGrid-grid-lg-10 > div.MuiGrid-root.jss415.MuiGrid-container.MuiGrid-spacing-xs-3 > div"


export default new class scrapingPichau {

  async start(link: string, marca: string): Promise<item[]>{
    return new Promise(async (resolve)=>{
      const browser = await puppeteer.launch();
      try {
        const page = await browser.newPage();
        await page.goto(link)
        await page.waitForSelector(cardElement)
        let itemsScraped = await this.doPage(page, marca)
        let isNext = await page.$$eval(cardElement, elements =>
          !elements[elements.length - 1].querySelector('a > div > div.MuiCardContent-root.jss437 > p')?.innerHTML.includes("Esgotado")
        )
        while(isNext){
          try {
            await page.waitForSelector("#__next > main > div:nth-child(2) > div > div.MuiGrid-root.jss413.MuiGrid-item.MuiGrid-grid-md-9.MuiGrid-grid-lg-10 > nav > ul > li:nth-child(9) > button")
            await page.click("#__next > main > div:nth-child(2) > div > div.MuiGrid-root.jss413.MuiGrid-item.MuiGrid-grid-md-9.MuiGrid-grid-lg-10 > nav > ul > li:nth-child(9) > button")
            await mainFunctions.waitFor(2000)
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
      const itemsScraped: item[] = await page.evaluate(([marca, cardElement]) => {
        const items = Array.from(document.querySelectorAll(cardElement));
        const itemsReturn: item[] = []
        items.forEach((item: any) => {
          const nome = item.querySelector("a > div > div.MuiCardContent-root.jss437 > h2").innerText;
          let preco:string = item.querySelector('div > div.jss577').innerText
          const link = item.querySelector('a.jss369').href;
          const thumb = item.querySelector('a > div > div.jss438 > div > div > img').src;
          if(preco){
            itemsReturn.push({
              nome,
              preco: Number(preco.replace("R$", "")),
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
}