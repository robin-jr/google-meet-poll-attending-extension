let Trigger = document.getElementById("trigger");

chrome.storage.sync.get("color", ({ color }) => {
    changeColor.style.backgroundColor = color;
});

// Trigger.addEventListener("click", async () => {
//     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//     chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         function: alter,
//     });
// });


//triggering when page loaded
document.addEventListener("DOMContentLoaded",async ()=> {
  
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: alter,
    });
});




function alter() {
    
    var isOpen=true;

    function toggleActivies(){
        isOpen = !isOpen;

        var activity= document.getElementsByClassName("VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ JsuyRc boDUxc");
        console.log(activity[3]);
        activity[3].click();
      
    }


    function togglePoll (){
       if(isOpen){
        var polls= document.getElementsByClassName("rHLKYe  VfPpkd-StrnGf-rymPhb-ibnC6b VfPpkd-rymPhb-ibnC6b-OWXEXe-tPcied-hXIJHe");
        console.log(polls[1]);
        polls[1].click();
       }
    }

    function fetchPolls (){
        var pollList = document.getElementsByClassName("BE3Wmf");
        console.log(pollList);
        console.log(pollList[0]["innerText"]);
    }

    // toggleActivies();
    // togglePoll();
    fetchPolls();
   
    // setInterval(printSource,2000);
}