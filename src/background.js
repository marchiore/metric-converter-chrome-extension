var convertEvent = function(tab) {
  chrome.tabs.executeScript({
    code: 'window.getSelection().toString();'
  }, function(selection) {
    if (!isNaN(selection)) {
      chrome.storage.sync.get({
        fromMetric: "mm",
        toMetric: "inch"
      }, function(items) {
        const fromMetric = items.fromMetric
        const toMetric = items.toMetric
        var operation = getOperation(fromMetric, toMetric)
        var textSelected = document.createElement("input")
        document.body.appendChild(textSelected)
        textSelected.setAttribute('value', operation(selection))
        textSelected.select()
        document.execCommand("copy")
        document.body.removeChild(textSelected)                
      });
    }
  });
}

function getOperation(from, to){
  
  // cm conversions
  function cmToInches(value) {
    return value * 0.393701
  }

  function cmToMilimiters(value) {
    return value * 10
  }

  // mm conversions
  function mmToCentimeters(value) {
    return value / 10
  }

  function mmToInches(value) {
    return value * 0.0393701
  }

  // inch conversions
  function inchToCentimeters(value) {
    return value * 2.54
  }

  function inchToMilimiters(value) {
    return value * 25.4
  }

  // lbs conversions
  function lbsToKilograms(value) {
    return value * 0.45359237
  }

  function lbsToGrams(value) {
    return value * 453.59237
  }

  // kg conversions
  function kgToPounds(value) {
    return value * 2.2
  }

  function kgToGrams(value) {
    return value * 1000
  }

  // g conversions
  function gToPounds(value) {
    return value * 0.0022
  }

  function gToKilograms(value) {
    return value * 1000
  }

  switch(from) {
    case "cm":
      if (to === "mm") {
        return cmToMilimiters
      } else if (to === "inch") { 
        return cmToInches
      } else {
        return null
      }
      break;
    case "mm":
      if (to === "cm") {
        return mmToCentimeters
      } else if (to === "inch") { 
        return mmToInches
      } else {
        return null
      }
      break;
    case "inch":
      if (to === "cm") {
        return inchToCentimeters
      } else if (to === "mm") { 
        return inchToMilimiters
      } else {
        return null
      }      
      break;
    case "lbs":
      if (to === "kg") {
        return lbsToKilograms
      } else if (to === "g") { 
        return lbsToGrams
      } else {
        return null
      }
      break;
    case "kg":
      if (to === "lbs") {
        return kgToPounds
      } else if (to === "g") { 
        return kgToGrams
      } else {
        return null
      }
      break;
    case "g":
      if (to === "lbs") {
        return gToPounds
      } else if (to === "kg") { 
        return gToKilograms
      } else {
        return null
      }
      break;
    default:
      return null
  }  
}

chrome.commands.onCommand.addListener(convertEvent);
