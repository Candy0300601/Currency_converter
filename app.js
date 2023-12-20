const baseurl="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select")
const btn=document.querySelector("form button");
const msg=document.querySelector(".msg");
// for(code in  countryList)
// {
//      console.log(code,countryList[code]);
// }
 
for(let select of dropdowns)
{
    for(curcode in countryList)
    {
         let newoption = document.createElement("option");
         newoption.innerText=curcode;
         newoption.value=curcode;
         select.append(newoption);
         if(select.name ==="from" && curcode==="USD")
         {
             newoption.selected="selected";
         }
         else if(select.name ==="to" && curcode==="INR")
         {
             newoption.selected="selected";
         }
    }

    select.addEventListener("change",(evt)=>
    {
         updateflag(evt.target);
    })
}

const updateflag=(element)=>
{
  let curcode=element.value;
 // console.log(curcode);
  let countrycode= countryList[curcode];
  // console.log(countrycode);
   let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
   let img=element.parentElement.querySelector("img");
   img.src=newsrc;
};

btn.addEventListener("click", (evt)=>
{
    evt.preventDefault();
    updatexchangerate();
});

        const updatexchangerate = async ()=>
        {
            let amount=document.querySelector(".amount input");
            let amtval=amount.value;
            if(amtval==="" || amtval<1)
             amtval=1;
            amount.value=1;
            //   console.log(amtval);
            //       console.log(fromcurr.value,tocurr.value);
              
                  const url=`${baseurl}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
                 let response=await fetch(url);
                 
                 let data=await response.json();
                 let rate=data[tocurr.value.toLowerCase()];
               //  console.log(rate);
                 let finalamt=rate*amtval;
                 msg.innerText=`${amtval} ${fromcurr.value} = ${finalamt} ${tocurr.value}`;
        };

        window.addEventListener("load",()=>
        {
            updatexchangerate();
        });

