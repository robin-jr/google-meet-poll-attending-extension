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
    const MIN_MEMBERS = 20;

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

    function getCount() {
        const peopleCount = document.getElementsByClassName("uGOf1d");
        var count = parseInt(peopleCount[0]["innerText"]);
        console.log("total members ->", count);
        return count;
    }

    function endClass() {
        var endBtn = document.getElementsByClassName("VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ tWDL4c jh0Tpd");
        endBtn[0].click();
        console.log("Ended Call");
    }

    toggleActivies();
    await sleep(1000);
    togglePoll();
    await sleep(1000);

    //Enter the other loop only after the threshold is reached
    while (true) {
        let count = getCount();
        await sleep(DELAY);
        if (count > (MIN_MEMBERS + 5)) {
            break;
        }
    }


    while (true) {
        let count = getCount();
        if (count < MIN_MEMBERS) {
            endClass();
            return;
        }
        await sleep(500);
        fetchPolls();
        console.log("Sleeping ", DELAY, "ms");
        console.log("Attended Polls: ", attended);
        await sleep(DELAY);
    }

}