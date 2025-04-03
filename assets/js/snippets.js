document.addEventListener('DOMContentLoaded', async () => {
    // Initialize particles.js
    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#64ffda" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#64ffda",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 1 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });

    // Load snippets from JSON
    try {
        const response = await fetch('assets/data/snippets.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data || !data.snippets) {
            throw new Error('Invalid JSON structure');
        }
        renderSnippets(data.snippets);
    } catch (error) {
        console.error('Error loading snippets:', error);
        document.getElementById('snippet-grid').innerHTML = `<p style="color: #64ffda; text-align: center;">Error loading snippets. Please try again later.</p>`;
    }
});

// Handle mobile menu
document.querySelector('.hamburger').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav-links').classList.toggle('active');
});

function renderSnippets(snippets) {
    const grid = document.getElementById('snippet-grid');
    
    snippets.forEach(snippet => {
        const card = document.createElement('div');
        card.className = 'snippet-card';
        
        card.innerHTML = `
            <h3>${snippet.title}</h3>
            <p class="description">${snippet.description}</p>
            <pre><code class="language-${snippet.language}">${snippet.code}</code></pre>
            <button class="copy-button" aria-label="Copy code">
                <i class="fas fa-copy"></i>
            </button>
        `;
        
        const copyButton = card.querySelector('.copy-button');
        copyButton.addEventListener('click', () => {
            const code = snippet.code;
            navigator.clipboard.writeText(code).then(() => {
                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
            });
        });
        
        grid.appendChild(card);
    });

    // Initialize Prism.js syntax highlighting
    Prism.highlightAll();
}
