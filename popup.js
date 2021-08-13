//triggering when page loaded
document.addEventListener("DOMContentLoaded", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: attendPolls,
    });
});


async function attendPolls() {
    var attended = [];
    const DELAY = 2000; //2 seconds

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function toggleActivies() {
        var activity = document.getElementsByClassName("VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ JsuyRc boDUxc");
        activity[3].click();
        console.log("Activity tab opened");
    }


    function togglePoll() {
        var polls = document.getElementsByClassName("rHLKYe  VfPpkd-StrnGf-rymPhb-ibnC6b");
        polls[1].click();
        console.log("Poll tab opened");
    }

    function fetchPolls() {
        var pollList = document.getElementsByClassName("Gy7HOd");
        if (pollList.length > 0) {
            for (var i = 0; i < pollList.length; i++) {
                if (!attended.includes(i)) {
                    answerPoll(pollList[i]);
                    attended.push(i);
                }
            }
        }
    }

    async function answerPoll(poll) {
        try {
            console.log("Trying to answer a poll");
            let options = poll["children"][0]["children"][2]["children"][0]["children"];
            let voteBtn = poll["children"][0]["children"][2]["children"][1]["children"][1]["children"][0]["children"][0];

            //choose option
            var randIndex = Math.floor(Math.random() * options.length);
            var radioBtn = options[randIndex]["children"][0]["children"][0];
            radioBtn.click();

            await sleep(500);
            voteBtn.click();
            console.log("submitted");
        } catch (error) {
            //the poll is already attended
            console.log("error attending poll-->", error);
        }
    }

    //auto exit impleimentation

    function checkTime(){
        var d = new Date();
        var currtime = d.getHours() * 100 + d.getMinutes();
        // now your currtime looks like 530 if it's 5.30am, or 1730 if it's 5.30 pm
        // you can just do a simple comparison between ints

        console.log("time",currtime);

        if ((currtime > 9040 && currtime < 9050)||
            (currtime > 1040 && currtime < 1050)||
            (currtime > 1150 && currtime < 1210)||
            (currtime > 1250 && currtime < 1310)||
            (currtime > 1450 && currtime < 1510)){
            // closed between 20:00 (8 pm) and 8:00 (8 am) as an example

            // console.log("true");
            return true;
        }
        // console.log("false");
        return false;
    }

    function checkCount (){
        let peopleCount = document.getElementsByClassName("uGOf1d");
        // console.log("count -->",peopleCount[0]["innerText"]);
        var b = parseInt(peopleCount[0]["innerText"]);
        console.log("count int->",b);

        return (b<20);

    }

    function checkPeople(){
        if(currtime() && checkCount()){
            var endBtn = document.getElementsByClassName("VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ tWDL4c jh0Tpd Gt6sbf QQrMi ftJPW");
            // console.log(endBtn[0]);
            endBtn[0].click();
            console.log("meet Ended");
        }
    }




    toggleActivies();
    await sleep(1000);
    togglePoll();
    await sleep(1000);

    setInterval(checkPeople,5000);
    
    while (true) {
        fetchPolls();
        console.log("sleeping ", DELAY, "ms");
        console.log("attended: ", attended);
        await sleep(DELAY);
    }

}