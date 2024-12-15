chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.number) {
      highlightNumbers(request.number);
    }
  });
  
  function highlightNumbers(number) {
    const regex = new RegExp(`\\b${number}\\b`, 'g');
    const elements = document.querySelectorAll('body, body *');
    elements.forEach(element => {
      if (element.childNodes.length === 0) {
        if (element.nodeType === Node.TEXT_NODE && regex.test(element.textContent)) {
          const highlightedText = element.textContent.replace(regex, match => `<span style="background-color: yellow;">${match}</span>`);
          const newElement = document.createElement(element.nodeName);
          newElement.innerHTML = highlightedText;
          element.parentNode.replaceChild(newElement, element);
        }
      }
    });
  }
  