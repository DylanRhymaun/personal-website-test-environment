function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }

    // Hide all sub-navs
    const subNavs = document.querySelectorAll('.sub-nav');
    subNavs.forEach(subNav => {
        subNav.style.display = 'none';
    });
}
// ####################################### ARTICLE LOADER ################################################################
function loadArticle(articlePath) {
    const contentDiv = document.getElementById('article-content'); 
    const writingSection = document.getElementById('writing');
    const allLists = writingSection.querySelectorAll('ul'); // Select all <ul> inside #writing
    const allHeadings = writingSection.querySelectorAll('h2'); // Select all <h2>

    if (!contentDiv) {
        console.error("Element with id 'article-content' not found.");
        return;
    }

    // Hide all the lists and headings
    allLists.forEach(list => {
        list.style.display = 'none';
    });
    allHeadings.forEach(heading => {
        heading.style.display = 'none';
    });

    fetch(articlePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load article');
            }
            return response.text();
        })
        .then(data => {
            const formattedContent = data
                .split(/\n\s*\n/)
                .map(para => `<p>${para.trim()}</p>`)
                .join("");
            contentDiv.innerHTML = formattedContent;

            if (window.innerWidth <= 1540) {
                contentDiv.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        })
        .catch(error => {
            contentDiv.innerHTML = `<p>Error loading article: ${error.message}</p>`;
        });
}

// ###################################### LOGO ANIMATION ONCLICK #################################################################
document.querySelector('.logo').addEventListener('click', function() {
    this.style.animation = 'none'; // Reset animation
    void this.offsetWidth; // Force reflow to restart it
    this.style.animation = 'fontCycle 0.5s steps(1) 3 forwards'; // Restart animation
});
// ####################################### BACK TO INDEX BUTTON ################################################################
function goBackToIndex() {
    const contentDiv = document.getElementById('article-content');
    const writingSection = document.getElementById('writing');
    const allLists = writingSection.querySelectorAll('ul');
    const allHeadings = writingSection.querySelectorAll('h2.betterH2');

    // Clear article content
    contentDiv.innerHTML = '';

    // Show all the lists and headings again
    allLists.forEach(list => {
        list.style.display = 'block';
    });
    allHeadings.forEach(heading => {
        heading.style.display = 'block';
    });

    // Optionally scroll back to the top
    writingSection.scrollIntoView({ behavior: "smooth", block: "start" });
}
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

// ######################################### FEATHER/LIGHT MODE ##############################################################
document.addEventListener('DOMContentLoaded', function() {
    const featherBtn = document.getElementById('feather-toggle');
    const themeBtn = document.getElementById('theme-toggle');
    const stylesLink = document.querySelector('link[href*="styles.css"]');
    let featherModeActive = false;

    featherBtn.addEventListener('click', function() {
        featherModeActive = !featherModeActive;

        if (featherModeActive) {
            // 1️⃣ Disable styles.css
            if (stylesLink) {
                stylesLink.disabled = true;
            }

            // 2️⃣ Replace .logo with .logoLight
            document.querySelectorAll('.logo').forEach(el => {
                el.classList.remove('logo');
                el.classList.add('logoLight');
            });

            // 3️⃣ Hide theme toggle button
            themeBtn.style.display = 'none';
        } else {
            // Re-enable styles.css
            if (stylesLink) {
                stylesLink.disabled = false;
            }

            // Swap .logoLight back to .logo
            document.querySelectorAll('.logoLight').forEach(el => {
                el.classList.remove('logoLight');
                el.classList.add('logo');
            });

            // Show theme toggle button
            themeBtn.style.display = 'block';
        }
    });
    
});

/* Apply random floating to all elements
document.querySelectorAll('body *').forEach(el => {
    const speed = Math.random() * 5 + 8;  // 
    const xAmp = (Math.random() * 0.2 + 0.1).toFixed(2);  
    const yAmp = (Math.random() * 0.1 + 0.1).toFixed(2);

    el.style.setProperty('--xAmp', `${xAmp}%`);
    el.style.setProperty('--yAmp', `${yAmp}%`);
    el.style.animation = `float-random ${speed}s ease-in-out infinite`;
});
*/

/* ###################FONT TOGGLER - not being used####################### */
document.addEventListener('DOMContentLoaded', function () {
    const fontBtn = document.getElementById('font-toggle');
    let funnelFontActive = false;

    fontBtn.addEventListener('click', function () {
        funnelFontActive = !funnelFontActive;

        document.body.classList.toggle('funnel-font', funnelFontActive);
    });
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

/* DATA TOOLTIP FIX */
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

/*Link to login page onclick */
document.getElementById('testingSwitch').addEventListener('click', () => {
  window.location.href = 'loginpage.html';
});