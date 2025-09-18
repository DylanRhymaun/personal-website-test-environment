 // ################################### Section revealer ####################################################################
  const menu = document.getElementById('menu');
  const sections = document.querySelectorAll('section');

  menu.addEventListener('change', () => {
    sections.forEach(sec => sec.classList.add('hidden')); // hide all
    const selected = document.getElementById(menu.value);
    if (selected) selected.classList.remove('hidden'); // show one
  });

// ################################### (light/dark mode)THEME TOGGLE ####################################################################
document.getElementById("theme-toggle").addEventListener("click", function () {
    const body = document.body;
    const icon = document.getElementById("theme-icon");

    body.classList.toggle("light-mode");

    // Toggle between sun and moon icons
    if (body.classList.contains("light-mode")) {
        icon.classList.replace("fa-sun", "fa-moon"); 
    } else {
        icon.classList.replace("fa-moon", "fa-sun"); // Show moon in dark mode
    }
});


/* ################### Decrypt effect####################### */
document.addEventListener('DOMContentLoaded', () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()⫍_⪗+⧕⊬∫√';
    const speed = 30;
    
    function getRandomChar() {
        return chars[Math.floor(Math.random() * chars.length)];
    }
    
    function getAllTextNodes(element) {
        const textNodes = [];
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            node => node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
        );
        
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        return textNodes;
    }
    
    function decryptText(textNode) {
        const originalText = textNode.textContent;
        const parent = textNode.parentNode;
        
        // Create span wrapper
        const wrapper = document.createElement('span');
        const spans = originalText.split('').map((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? ' ' : getRandomChar();
            span.className = char === ' ' ? 'revealed' : 'encrypted';
            return span;
        });
        
        spans.forEach(span => wrapper.appendChild(span));
        parent.replaceChild(wrapper, textNode);
        
        // Decrypt sequentially
        let index = 0;
        const decrypt = () => {
            if (index >= originalText.length) return;
            
            if (originalText[index] !== ' ') {
                spans[index].textContent = originalText[index];
                spans[index].className = 'revealed';
            }
            
            index++;
            setTimeout(decrypt, speed);
        };
        
        setTimeout(decrypt, Math.random() * 1000); // Random delay for staggered start
    }
    // Apply to all text nodes
    const textNodes = getAllTextNodes(document.body);
    textNodes.forEach(decryptText);
});

/* ################### Hover Tooltip (not currently in use) ####################### */ /*
document.querySelectorAll('[data-tooltip]').forEach(el => {
    el.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.innerText = el.getAttribute('data-tooltip');
        document.body.appendChild(tooltip);

        // Position and adjust if needed
        const rect = el.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        let top = rect.top - tooltipRect.height - 8;
        let left = rect.left + rect.width / 2 - tooltipRect.width / 2;

        // Adjust for overflow right
        if (left + tooltipRect.width > window.innerWidth) {
            left = window.innerWidth - tooltipRect.width - 10;
        }

        // Adjust for overflow left
        if (left < 0) {
            left = 10;
        }

        // Adjust for top overflow (if element is near top)
        if (top < 0) {
            top = rect.bottom + 8; // place below instead
        }

        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
        tooltip.style.opacity = 1;

        el._tooltipElement = tooltip;
    });

    el.addEventListener('mouseleave', () => {
        if (el._tooltipElement) {
            el._tooltipElement.remove();
            el._tooltipElement = null;
        }
    });
});
*/ 

/*############################Link to login page onclick #######################*/
document.getElementById('testingSwitch').addEventListener('click', () => {
  window.location.href = 'loginpage.html';
});