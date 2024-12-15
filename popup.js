document.getElementById('highlight-btn').addEventListener('click', () => {
    const number = document.getElementById('number-input').value;
  
    if (number.trim() === '') {
      alert('Please enter a number!');
      return;
    }
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: resetAndHighlightNumbers,
        args: [number],
      });
    });
  });
  
  function resetAndHighlightNumbers(number) {
    // Remove existing highlights
    document.querySelectorAll('.highlight').forEach(el => {
      el.outerHTML = el.innerText; // Replace highlighted elements with their text content
    });
  
    // Highlight new numbers in specific tags
    const tags = ['p', 'span', 'li', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']; // Add more tags as needed
    const regex = new RegExp(`\\b${number}\\b`, 'g');
  
    tags.forEach(tag => {
      document.querySelectorAll(tag).forEach(element => {
        if (regex.test(element.innerHTML)) {
          element.innerHTML = element.innerHTML.replace(
            regex,
            `<span class="highlight" style="background-color: yellow;">${number}</span>`
          );
        }
      });
    });
  }
  