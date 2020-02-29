var timeoutId;
const notes = document.getElementById("notes");
document.addEventListener("keyup", logKey);
browser.tabs.onActivated.addListener(tabOpen);
browser.windows.onFocusChanged.addListener(tabOpen);

function logKey(e) {
  console.log("Textarea Change");
  clearTimeout(timeoutId);
  timeoutId = setTimeout(function() {
    // Runs 1 second (1000 ms) after the last change
    saveToDB();
  }, 1000);
}

function saveToDB() {
  browser.storage.sync.set({
    tab_note: document.querySelector("#notes").value
  });
}

function tabOpen(tab) {
  console.log("tab open");
  browser.storage.sync.get("tab_note").then(result => {
    console.log(result);
    document.querySelector("#notes").value = result.tab_note;
  });
}


window.addEventListener('load', () => {
    tabOpen()
  })