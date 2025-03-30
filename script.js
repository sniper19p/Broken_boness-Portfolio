// Function to populate games section
async function populateGames() {
  try {
    const response = await fetch('data/games.json');
    const data = await response.json();
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = ''; // Clear existing content

    data.games.forEach((game) => {
      const gameCard = document.createElement('div');
      gameCard.className = 'project-card';

      gameCard.innerHTML = `
        <h3>${game.title}</h3>
        <p>${game.description}</p>
        <div class="status-play-container">
          <div class="game-status ${game.status.toLowerCase().replace(' ', '-')}">
            ${game.status}
          </div>
          <a href="${game.playLink}" target="_blank" class="play-now">Play Now</a>
        </div>
      `;

      projectsGrid.appendChild(gameCard);
    });
  } catch (error) {
    console.error('Error loading games:', error);
  }
}

// Function to populate web projects section
async function populateWebProjects() {
  try {
    const response = await fetch('data/web-projects.json');
    const data = await response.json();
    const webProjectsGrid = document.querySelector('.web-projects-grid');
    webProjectsGrid.innerHTML = ''; // Clear existing content

    data.projects.forEach((project) => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card';

      projectCard.innerHTML = `
        <h3>${project.name}</h3>
        <div class="role">${project.role}</div>
        <p>${project.description}</p>
        <div class="technologies">
          ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <p class="contribution">${project.contribution}</p>
        ${project.projectLink ? `<a href="${project.projectLink}" target="_blank" class="project-link">View Project</a>` : ''}
        ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" class="github-link">GitHub</a>` : ''}
        ${project.status ? `<div class="project-status">${project.status}</div>` : ''}
      `;

      webProjectsGrid.appendChild(projectCard);
    });
  } catch (error) {
    console.error('Error loading web projects:', error);
  }
}

// Function to populate affiliations section
async function populateAffiliations() {
  try {
    const response = await fetch('data/affiliations.json');
    const data = await response.json();
    const affiliationsGrid = document.querySelector('.affiliations-grid');
    affiliationsGrid.innerHTML = ''; // Clear existing content

    data.affiliations.forEach((affiliation) => {
      const affiliationCard = document.createElement('div');
      affiliationCard.className = 'affiliation-card';

      let gamesHtml = '';
      affiliation.games.forEach((game) => {
        gamesHtml += `
          <div class="group-game">
            <h4>${game.title}</h4>
            <p>${game.description}</p>
            <div class="game-details">
              <div class="game-status ${game.status.toLowerCase().replace(' ', '-')}">
                ${game.status}
              </div>
              ${game.plays ? `<div class="play-count">${game.plays} Plays</div>` : ''}
            </div>
            ${game.playLink !== '#' ? `<a href="${game.playLink}" target="_blank" class="play-link">Play Now</a>` : ''}
            <p class="contribution">Contribution: ${game.contribution}</p>
          </div>
        `;
      });

      affiliationCard.innerHTML = `
        <h3>${affiliation.name}</h3>
        <div class="role">${affiliation.role}</div>
        <p>${affiliation.description}</p>
        <div class="member-count">Members: ${affiliation.memberCount}</div>
        ${affiliation.duration ? `<div class="duration">${affiliation.duration}</div>` : ''}
        <div class="group-games">
          <h4>Games:</h4>
          ${gamesHtml}
        </div>
      `;

      affiliationsGrid.appendChild(affiliationCard);
    });
  } catch (error) {
    console.error('Error loading affiliations:', error);
  }
}


// Function to populate commissions
async function populateCommissions() {
  try {
    const response = await fetch('data/commissions.json');
    const data = await response.json();
    const container = document.getElementById('commissions-container');
    container.innerHTML = ''; // Clear existing content

    data.categories.forEach(category => {
      // Create a category section wrapper
      const categorySection = document.createElement('div');
      categorySection.className = 'commission-category';

      // Add category header section
      const categoryHeader = document.createElement('div');
      categoryHeader.className = 'category-header';

      // Add category title
      const categoryTitle = document.createElement('h3');
      categoryTitle.className = 'service-category';
      categoryTitle.textContent = category.name;
      categoryHeader.appendChild(categoryTitle);

      // Add category note if present
      if (category.note) {
        const note = document.createElement('p');
        note.className = 'service-note';
        note.textContent = category.note;
        categoryHeader.appendChild(note);
      }

      categorySection.appendChild(categoryHeader);

      // Add grid for this category's packages
      const grid = document.createElement('div');
      grid.className = 'projects-grid';

      // Add packages
      category.packages.forEach(pkg => {
        const card = document.createElement('div');
        card.className = 'project-card';

        card.innerHTML = `
          <div class="commission-header">
            <h3>${pkg.title}</h3>
            <div class="price">${pkg.price}</div>
          </div>
          <div class="commission-content">
            <ul class="commission-features">
              ${pkg.features.map(feature => 
                `<li><i class="fas fa-check"></i> ${feature}</li>`
              ).join('')}
            </ul>
            <div class="delivery-time">${pkg.deliveryTime}</div>
          </div>
        `;

        grid.appendChild(card);
      });

      categorySection.appendChild(grid);
      container.appendChild(categorySection);
    });
  } catch (error) {
    console.error('Error loading commissions:', error);
  }
}

// Function to update stats
async function updateStats() {
  try {
    let totalPlays = 0;
    let totalGames = 0;

    // Get games data
    const gamesResponse = await fetch('data/games.json');
    const gamesData = await gamesResponse.json();
    gamesData.games.forEach(game => {
      if (game.playLink && game.playLink !== '#') {
        totalGames++;
      }
    });

    // Get affiliations data
    const affiliationsResponse = await fetch('data/affiliations.json');
    const affiliationsData = await affiliationsResponse.json();
    affiliationsData.affiliations.forEach(affiliation => {
      affiliation.games.forEach(game => {
        if (game.plays) {
          const plays = parseInt(game.plays.replace(/[^0-9]/g, ''));
          totalPlays += plays;
        }
        if (game.playLink && game.playLink !== '#') {
          totalGames++;
        }
      });
    });

    // Animate the counters
    const playsElement = document.getElementById('total-plays');
    const gamesElement = document.getElementById('total-games');

    if (playsElement) {
      let current = 0;
      const step = () => {
        current += Math.ceil(totalPlays / 100);
        if (current >= totalPlays) {
          current = totalPlays;
          playsElement.textContent = current + 'M+';
          return;
        }
        playsElement.textContent = current + 'M+';
        requestAnimationFrame(step);
      };
      step();
    }

    if (gamesElement) {
      let current = 0;
      const step = () => {
        current += 1;
        if (current >= totalGames) {
          current = totalGames;
          gamesElement.textContent = current;
          return;
        }
        gamesElement.textContent = current;
        requestAnimationFrame(step);
      };
      step();
    }
  } catch (error) {
    console.error('Error updating stats:', error);
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", async () => {
  // Hamburger menu functionality
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navLinksItems = document.querySelectorAll('.nav-links a');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking a link
  navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Initialize typing animation
  new Typed('.typed-text', {
    strings: ['Broken_Boness'],
    typeSpeed: 100,
    backSpeed: 50,
    loop: false,
    showCursor: true,
    cursorChar: '|'
  });

  // Initialize data
  try {
    await Promise.all([
      populateGames(),
      populateWebProjects(),
      populateAffiliations(),
      populateCommissions()
    ]);
    updateStats();
  } catch (error) {
    console.error('Error initializing data:', error);
  }
});