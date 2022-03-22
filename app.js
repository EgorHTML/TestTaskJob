import { valute } from "./Valute.js"
import { mainSection } from "./Valute.js"
import {Valute} from "./Valute.js"
import Api from "./api.js"

let day = new Date().getDate()-3

const listValute = []
valute.renderCurrencies(await valute.getValutes()).then(()=>{
    const valuteLines = valute.section.querySelectorAll(".line")
    for(let i = 0;i<valuteLines.length;i++){listValute.push(valuteLines[i])}
    listValute.forEach((line)=>line.addEventListener("mouseover",renderingTooltip))
    
})


console.log(await valute.getValutes());
function renderingTooltip({target}){
    let tooltip
    if(target.dataset.tooltip){
        let tooltipHtml = target.dataset.tooltip;
        if (!tooltipHtml) return;
         tooltip = document.createElement("div")
         tooltip.className = "tooltip"

        function positionCursor(e){
            tooltip.style.left =`${e.pageX-30}px`;
            tooltip.style.top =`${e.pageY+20}px`;
        }

        addEventListener('mousemove', positionCursor, false);

        tooltip.innerHTML = tooltipHtml
        mainSection.appendChild(tooltip)
        listValute.forEach((line)=>line.addEventListener("mouseout",closeShowValute))
    }
    function closeShowValute(){
        if (tooltip) {
            tooltip.remove();
            // tooltip = null 
          }
    }
}

listValute.forEach((element)=>element.addEventListener("click",(event)=>{
    if(document.querySelector(".second__table")){
        document.querySelector(".second__table").remove()
        renderLastDataAboutValute(event)
    }else{
        renderLastDataAboutValute(event)
    }
},true))

mainSection.addEventListener("click",(e)=>{
    if(document.querySelector(".second__table")&&e.target==e.currentTarget){
        document.querySelector(".second__table").remove()
    }
},false)

async function renderLastDataAboutValute(event){
  if(event.target.dataset.tooltip){
    let x = event.pageX
    let y = event.pageY
    let id = event.currentTarget.id
    let div = document.createElement("div")
    div.classList.add("second__table")
    div.style.left = `${x}px`
    div.style.top = `${y}px`
    const newValute = new Valute(div,"")
    newValute.renderCurrencies(await getLastData(id))
    


    mainSection.appendChild(div)
  }
}

async function getLastData(id){
    const valutes = {}
    for(let i = 0;i<=9;i++){
        if(19-i==14 || 19-i==13){
            continue
        }else{
            let prevUrl = `//www.cbr-xml-daily.ru/archive/2022/03/${day-i}/daily_json.js`
            let api = new Api(prevUrl)
            let data = await api.getDataJson()
            valutes[id+i] = data.Valute[id]
        }
    }
    return valutes
}


