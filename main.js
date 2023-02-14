
let days = ["sun","mon","tue","wed","thu","fri","sat"];
let daysRect = document.querySelectorAll(".Chart>div>div.rect");

let date = new Date();
let dayNum = date.getDay();
let currentDay = days[dayNum];

// select the current day and color 
let currentDayRect = document.querySelector(`.${currentDay}>div.rect`);
currentDayRect.style.backgroundColor = "hsl(186, 34%, 60%)";

// emapty array to store amounts
let amounts = [];

//then create asynchronouse function to fetch data form json file
async function getData(){
    let response = await fetch("./data.json");
    let data = await response.json();
    for(let i = 0; i < data.length; i++){
        amounts[i] = data[i].amount;
    }
    daysRect.forEach((day,i)=>{
        day.style.height = `${amounts[i]*2.5}px`;//to make it heigher
    })
}

getData();

// adding mousenter event listener to show the amounts when hover 
daysRect.forEach(rect=>{
    rect.addEventListener("mouseenter",(e)=>{
        let amountDiv = document.createElement("div");
        let curDayHov = e.target.parentNode;
        let curDayHovClass = curDayHov.className;
        function getAmount(){
            for(let index in days){
                if(days[index] == curDayHovClass){
                    if(days[index] == "sun") return amounts[6];
                    return amounts[index-1];
                }
            }
        }

        // applaying show class on amountDiv
        amountDiv.classList.add("show");
        amountDiv.textContent = `$${getAmount()}`;// insert amount with $ sign
        if(curDayHov.className!=currentDayRect.parentNode.className){
            e.target.style.backgroundColor = "#ef97b1";// add blue color when hover
        }
        curDayHov.insertBefore(amountDiv, curDayHov.firstChild);// insert it before its rectangle
        amountDiv.style.bottom = `${e.target.clientHeight+40}px`;// put it ubove its rectangle
    })
})
// add mouseleave eventLitener to remove the amount div when leaving
daysRect.forEach(rect =>{
    rect.addEventListener("mouseleave", function (e) {
            let curDayHov = e.target.parentNode;
            e.target.style.backgroundColor = "hsl(10, 79%, 65%)";
            currentDayRect.style.backgroundColor = "hsl(186, 34%, 60%)";
            curDayHov.removeChild(curDayHov.firstElementChild);
        })
})


