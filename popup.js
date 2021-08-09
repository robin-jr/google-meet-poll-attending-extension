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
    
    var isOpen=false;

    function toggleActivies(){
        isOpen = !isOpen;

        var activity= document.getElementsByClassName("VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ JsuyRc boDUxc");
        console.log("activity Opened");
        activity[3].click();
        if(isOpen){
            setTimeout(togglePoll,1000);
        }

    }


    function togglePoll (){
        var polls= document.getElementsByClassName("rHLKYe  VfPpkd-StrnGf-rymPhb-ibnC6b VfPpkd-rymPhb-ibnC6b-OWXEXe-tPcied-hXIJHe");
        // console.log(polls[1]);
        polls[1].click();
        console.log("poll tab opened");
    }

    var currentPoll=0;
    var numberOfAnswered=0;

    function fetchPolls (){
        var pollList = document.getElementsByClassName("Gy7HOd");
        console.log(pollList);
        // console.log(pollList[0]["innerText"]);
        if(pollList.length>0){
            console.log("curent-->poll",currentPoll+1);
            console.log("no of polls",numberOfAnswered+1);
            if(currentPoll === numberOfAnswered && currentPoll<pollList.length){
                ansewrPoll(pollList[currentPoll]);
            }

            // ansewrPoll(pollList[currentPoll]);
        }
    }

function ansewrPoll(poll){
        let pollNo = poll["children"][0]["children"][0]["children"][0]["innerText"];
        let question=poll["children"][0]["children"][1]["children"][0]["innerText"];
        let options= poll["children"][0]["children"][2]["children"][0]["children"];
        let voteBtn = poll["children"][0]["children"][2]["children"][1]["children"][1]["children"][0]["children"][0];

        console.log("No:",pollNo);
        console.log("Question:",question);
        console.log("option:",options);
        console.log("vote:",voteBtn);

        //choose option
        
            var randIndex=Math.floor(Math.random()*options.length);
            var radioBtn = options[randIndex]["children"][0]["children"][0];
            var text=options[1]["children"][1]["innerText"];
            radioBtn.click();
            console.log("pressed answer-->",text);
            setTimeout(() => {
                voteBtn.click();
                console.log("submitted");
            }, 1000);
            
        currentPoll += 1;
        numberOfAnswered +=1;
    }

    toggleActivies();
    setInterval(()=>{
        fetchPolls();
        console.log("-->calling after 5sec<--");
    },5000);
}