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

    toggleActivies();
    await sleep(1000);
    togglePoll();
    await sleep(1000);
    while (true) {
        fetchPolls();
        console.log("sleeping ", DELAY, "ms");
        console.log("attended: ", attended);
        await sleep(DELAY);
    }

}