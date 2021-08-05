let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
    changeColor.style.backgroundColor = color;
});

changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: alter,
    });
});

async function alter() {
    while (true) {
        document.body.style.backgroundColor = "yellow";
        let string = document.body;
        console.log(string);
        await new Promise(resolve => setTimeout(resolve, 2000));
        document.body.style.backgroundColor = "green";
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}