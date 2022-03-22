import Api from './api.js'

export const mainSection = document.querySelector(".main__section")
const url = `https://www.cbr-xml-daily.ru/daily_json.js`
const api = new Api(url)
export class Valute{
    constructor(section,api){
        this.section = section
        this.api = api
    }
    
     getValutes(){
        return this.api.getDataJson().then(data=>data.Valute)
    }
    
    async renderCurrencies(data){
        for(let valute in data){
            let prevPrice = data[valute].Previous
            let currentPrice = data[valute].Value
            let tooltip = data[valute].Name
            const html = ` 
            <ul data-tooltip="${data[valute].Name.split()}" id = "${valute}" class="line">
                <li data-tooltip="${tooltip}"  class="currency">${valute}</li>
                <li data-tooltip="${tooltip}" class="RUB">${data[valute].Value}</li>
                <li data-tooltip="${tooltip}" class="nominal">${data[valute].Nominal}</li>
                <li data-tooltip="${tooltip}" class="difference">${this.getDifference(prevPrice,currentPrice)}</li>
            </ul>
             `       
        this.section.innerHTML+=html
        }
    }

     getDifference(firstValue,secondValue){
        const difference = secondValue - firstValue
        const differenceProcent =  Math.abs((100*difference)/firstValue)
        const mark = ()=>{
            if(secondValue>firstValue){
                return "&#9650" //up
            }else if(secondValue<firstValue){
                return "&#9661" //down
            }
            return ""
        }
        return `${differenceProcent.toFixed(2)}% ${mark()}`
    }
}
export const valute = new Valute(mainSection,api)