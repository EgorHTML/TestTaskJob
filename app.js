import { valute, mainSection, Valute } from "./Valute.js"
import Api from "./Api.js"

const day = new Date().getDate()
const month = new Date().getMonth()+1

class Calendar{
    static getMonth(){
        return String(month).length==1?`0${month}`:`${month}`
    }
    static getDay(day){
        return String(day).length==1?`0${day}`:`${day}`
    }
}

const listValute = []
valute.renderValutes(await valute.getValutes()).then(()=>{
    const valuteLines = valute.section.querySelectorAll(".line")
    for(let i = 0;i<valuteLines.length;i++){listValute.push(valuteLines[i])}
    listValute.forEach((line)=>line.addEventListener("mouseover",renderingTooltip))
    
})
.then(renderLastData)

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
          }
    }
}

function renderLastData(){
    listValute.forEach((element)=>element.addEventListener("click",(event)=>{
        if(document.querySelector(".second__table")){
            document.querySelector(".second__table").remove()
            generateTable(event)
        }else{
            generateTable(event)
        }
    },true))
}

mainSection.addEventListener("click",(event)=>{
    if(document.querySelector(".second__table") && event.target==event.currentTarget){
        document.querySelector(".second__table").remove()
    }
},false)

async function generateTable(event){
  if(event.target.dataset.tooltip){
    let x = event.pageX
    let y = event.pageY
    let id = event.currentTarget.id
    let div = document.createElement("div")
    div.classList.add("second__table")
    div.style.left = `${x}px`
    div.style.top = `${y}px`
    const lastValute = new Valute(div,"")
    lastValute.renderValutes(await getLastData(id))
    checkCountTable()
    mainSection.appendChild(div)
  }
}

async function getLastData(id){
    const valutes = {}
    for(let i = 0;i<=13;i++){
        try{
            let prevUrl = `//www.cbr-xml-daily.ru/archive/2022/${Calendar.getMonth()}/${Calendar.getDay(day-i)}/daily_json.js`
            let api =  new Api(prevUrl)
            let data = await api.getDataJson()
            valutes[id+i] = data.Valute[id]
        }catch(err){
            console.clear()
            continue
        }
    }
    
    return valutes
}

function checkCountTable(){
    if(document.querySelectorAll(".second__table").length===1){
        document.querySelectorAll(".second__table")[1].remove()
    }
}



