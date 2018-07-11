var convertEvent = function(tab) {
  chrome.tabs.executeScript({
    code: 'window.getSelection().toString();'
  }, function(selection) {
    if (!isNaN(selection)) {
      console.log(mmToInches(selection))
    }
  });
}

// chrome.browserAction.onClicked.addListener(convertEvent);
chrome.commands.onCommand.addListener(convertEvent);

function mmToInches(value) {
  return value * 0.039370
}