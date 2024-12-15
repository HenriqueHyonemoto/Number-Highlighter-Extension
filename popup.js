document.getElementById('highlight-btn').addEventListener('click', () => {
    const number = document.getElementById('number-input').value;
    const greaterThan = document.getElementById('greater-than').value;
    const lessThan = document.getElementById('less-than').value;

    // Validação para aceitar apenas números inteiros e ignorar números decimais
    if (number.trim() !== '' && !/^\d+$/.test(number)) {
      alert('Please enter a valid integer for the number input!');
      return;
    }

    if (greaterThan.trim() !== '' && !/^\d+$/.test(greaterThan)) {
      alert('Please enter a valid integer for the "greater than" input!');
      return;
    }

    if (lessThan.trim() !== '' && !/^\d+$/.test(lessThan)) {
      alert('Please enter a valid integer for the "less than" input!');
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: resetAndHighlightValidNumbers,
        args: [number, greaterThan, lessThan],
      });
    });
  });

  function resetAndHighlightValidNumbers(number, greaterThan, lessThan) {
    // Remove existing highlights
    document.querySelectorAll('.highlight').forEach(el => {
      el.outerHTML = el.innerText; // Replace highlighted elements with their text content
    });

    // Highlight integers in specific tags
    const tags = ['p', 'span', 'li', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']; // Add more tags as needed
    const regex = new RegExp(`#(\\d+)\\b`, 'g'); // Match numbers preceded by #

    tags.forEach(tag => {
      document.querySelectorAll(tag).forEach(element => {
        element.innerHTML = element.innerHTML.replace(regex, (match, p1) => {
          const num = parseInt(p1, 10);
          if (
            (number !== '' && num === parseInt(number, 10)) ||
            (greaterThan !== '' && num >= parseInt(greaterThan, 10)) ||
            (lessThan !== '' && num <= parseInt(lessThan, 10))
          ) {
            return `<span class="highlight" style="background-color: yellow; color: black;">#${p1}</span>`;
          }
          return match;
        });
      });
    });
  }
