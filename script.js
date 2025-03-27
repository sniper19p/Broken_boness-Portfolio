// Roblox games data
const games = [
  {
    title: "The Never Ending Obby!",
    description:
      "An obby game featuring endlessly and randomly generated stages, ensuring a unique experience each time players join. One of my first games to ever come out.",
    status: "Completed",
    playLink: "https://www.roblox.com/games/6296129446/The-Never-Ending-Obby",
  },
  {
    title: "Build Battle: Alpha",
    description:
      "A competitive building game where players are tasked with constructing themed builds within a time limit, followed by a voting phase to determine the best creation.",
    status: "In Development",
    playLink: "https://www.roblox.com/games/15433046686/Build-Battle-Alpha",
  },
  {
    title: "The Graveyard: Beta",
    description:
      "An immersive experience set in a mysterious graveyard, challenging players to explore and uncover hidden secrets.",
    status: "On Hold",
    playLink: "https://www.roblox.com/games/12252350815/The-Graveyard-beta3",
  },
  {
    title: "Ice Cream Tycoon",
    description:
      "A tycoon game where players build and manage their own ice cream business, striving to expand and dominate the market.",
    status: "Completed",
    playLink: "https://www.roblox.com/games/10914161045/NEW-Ice-Cream-Tycoon",
  },
  {
    title: "Business Empire Tycoon",
    description:
      "Players start from scratch to build a vast business empire, making strategic decisions to outmaneuver competitors and maximize profits.",
    status: "Completed",
    playLink: "https://www.roblox.com/games/12318737316/Business-Empire-Tycoon",
  },
  {
    title: "Social Hangout",
    description:
      "A social platform designed for players to meet, chat, and engage in various mini-games, fostering a vibrant community atmosphere.",
    status: "On Hold",
    playLink: "https://www.roblox.com/games/9322776451/Social-hangout-UPDATE",
  },
];

const webProjects = [
  {
    name: "Personal Portfolio",
    role: "Full Stack Developer",
    description:
      "A modern, responsive portfolio website showcasing my development work across different platforms.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Particles.js"],
    contribution: "Designed and developed the entire website from scratch",
    projectLink: "https://github.com/sniper19p/Broken_boness-Portfolio",
    githubLink: "https://github.com/sniper19p/Broken_boness-Portfolio",
  },
  {
    name: "Mr.Daily Bot",
    role: "Bot Developer",
    description:
      "A feature-rich Discord bot that delivered daily facts, jokes, and historical events to servers.mUsers could easily manage content delivery with slash commands and customize their daily information feed.",
    technologies: [
      "Discord.js",
      "Node.js",
      "MongoDB",
      "REST APIs",
      "Slash Commands",
    ],
    contribution:
      "Developed the entire bot from concept to deployment, including command system, database integration, and automated content delivery.",
    //  links: {
    //      support: "https://discord.gg/xnX7ZeJvYP",
    //      donate: "https://www.buymeacoffee.com/MrDaily"
    //    },
    status: "Archived (The bot served over 600+ Discord servers before being discontinued due to hosting and operational costs.)",
  },
];

const affiliations = [
  {
    name: "Silverline Entertainment",
    role: "Developer",
    description:
      "A thriving Roblox development group owned by DutchDeveloper. Joined the team post-launch of Build to Survive Disasters to implement new features and gather community feedback. Currently collaborating on an exciting new build-focused game.",
    memberCount: "6,000+",
    games: [
      {
        title: "Build to Survive Disasters",
        description:
          "Build your base to protect yourself from monsters that spawn every few minutes. Monsters can use their special powers to hunt you down, so you must fight them off!",
        status: "Released",
        playLink:
          "https://www.roblox.com/games/13914298804/Build-to-Survive-Disasters",
        plays: "10M+",
        contribution: "Bug fixes",
      },
      {
        title: "Upcoming Game",
        description: "A new game in development without monsters.",
        status: "In Development",
        playLink: "#",
        contribution: "Core gameplay systems",
      },
    ],
  },
  {
    name: "The Mining Company",
    role: "Developer",
    description:
      "A major Roblox development group led by DutchDeveloper with a massive community. Joined the team to help maintain and optimize Mining INC: Remastered, focusing on bug fixes and performance improvements based on player feedback.",
    memberCount: "104,000+",
    games: [
      {
        title: "Mining INC: Remastered",
        description:
          "Welcome to Mining Inc Remastered! an exciting team-based game set in the depths of the mine.",
        status: "Released",
        playLink:
          "https://www.roblox.com/games/3168928542/Mining-INC-Remastered",
        plays: "41M+",
        contribution: "Bug fixes and optimizations",
      },
    ],
  },
];

// Populate games section
function populateGames() {
  const projectsGrid = document.querySelector(".projects-grid");
  projectsGrid.innerHTML = ""; // Clear existing content

  games.forEach((game) => {
    const gameCard = document.createElement("div");
    gameCard.className = "project-card";

    gameCard.innerHTML = `
            <h3>${game.title}</h3>
            <p>${game.description}</p>
            <div class="status-play-container">
                <div class="game-status ${game.status
                  .toLowerCase()
                  .replace(" ", "-")}">
                    ${game.status}
                </div>
                <a href="${
                  game.playLink
                }" target="_blank" class="play-now">Play Now</a>
            </div>
        `;

    projectsGrid.appendChild(gameCard);
  });
}

// Populate affiliations section
function populateAffiliations() {
  const affiliationsGrid = document.querySelector(".affiliations-grid");
  affiliationsGrid.innerHTML = ""; // Clear existing content

  affiliations.forEach((affiliation) => {
    const affiliationCard = document.createElement("div");
    affiliationCard.className = "affiliation-card";

    let gamesHtml = "";
    affiliation.games.forEach((game) => {
      gamesHtml += `
                <div class="group-game">
                    <h4>${game.title}</h4>
                    <p>${game.description}</p>
                    <div class="game-details">
                        <div class="game-status ${game.status
                          .toLowerCase()
                          .replace(" ", "-")}">
                            ${game.status}
                        </div>
                        ${
                          game.plays
                            ? `<div class="play-count">${game.plays} Plays</div>`
                            : ""
                        }
                    </div>
                    <p class="contribution">My Role: ${game.contribution}</p>
                    ${
                      game.playLink !== "#"
                        ? `<a href="${game.playLink}" target="_blank" class="play-now">Play Now</a>`
                        : ""
                    }
                </div>
            `;
    });

    affiliationCard.innerHTML = `
            <h3>${affiliation.name}</h3>
            <p class="role">${affiliation.role}</p>
            <p class="member-count">${affiliation.memberCount} Members</p>
            <p>${affiliation.description}</p>
            <div class="group-games">
                <h4 class="games-header">Games</h4>
                ${gamesHtml}
            </div>
        `;

    affiliationsGrid.appendChild(affiliationCard);
  });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Animate counting up
function animateValue(element, start, end, duration) {
  const range = end - start;
  const increment = range / (duration / 16); // 60fps
  let current = start;
  const isPlays = element.id === "total-plays";

  const animate = () => {
    current += increment;
    if (
      (increment >= 0 && current >= end) ||
      (increment < 0 && current <= end)
    ) {
      current = end;
      element.textContent = isPlays
        ? Math.round(current) + "M+"
        : Math.round(current);
      return;
    }
    element.textContent = isPlays
      ? Math.round(current) + "M+"
      : Math.round(current);
    requestAnimationFrame(animate);
  };

  animate();
}

// Calculate and display stats
function updateStats() {
  let totalPlays = 0;
  let totalGames = 0;

  // Add plays from personal games
  games.forEach((game) => {
    if (game.playLink && game.playLink !== "#") {
      totalGames++;
    }
  });

  // Add plays from group games
  affiliations.forEach((affiliation) => {
    affiliation.games.forEach((game) => {
      if (game.plays) {
        const plays = parseInt(game.plays.replace(/[^0-9]/g, ""));
        totalPlays += plays;
      }
      if (game.playLink && game.playLink !== "#") {
        totalGames++;
      }
    });
  });

  // Animate the counters
  const playsElement = document.getElementById("total-plays");
  const gamesElement = document.getElementById("total-games");

  animateValue(playsElement, 0, totalPlays, 2000); // 2 seconds duration
  animateValue(gamesElement, 0, totalGames, 1500); // 1.5 seconds duration
}

// Populate web projects section
function populateWebProjects() {
  const webProjectsGrid = document.querySelector(".web-projects-grid");
  webProjectsGrid.innerHTML = ""; // Clear existing content

  webProjects.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.className = "affiliation-card";

    let techStack = "";
    project.technologies.forEach((tech) => {
      techStack += `<span class="tech-tag">${tech}</span>`;
    });

    let links = "";
    if (project.projectLink && project.projectLink !== "#") {
      links += `<a href="${project.projectLink}" target="_blank" class="project-link">View Project</a>`;
    }
    if (project.githubLink && project.githubLink !== "#") {
      links += `<a href="${project.githubLink}" target="_blank" class="github-link">View Code</a>`;
    }
    if (project.links) {
      if (project.links.support) {
        links += `<a href="${project.links.support}" target="_blank" class="support-link">Support Server</a>`;
      }
      if (project.links.donate) {
        links += `<a href="${project.links.donate}" target="_blank" class="donate-link">Support Project</a>`;
      }
    }

    projectCard.innerHTML = `
            <h3>${project.name}</h3>
            <p class="role">${project.role}</p>
            <p>${project.description}</p>
            <div class="tech-stack">
                <h4>Technologies</h4>
                <div class="tech-tags">${techStack}</div>
            </div>
            <p class="contribution">My Role: ${project.contribution}</p>
            ${
              project.status
                ? `<div class="project-status">${project.status}</div>`
                : ""
            }
            ${links ? `<div class="project-links">${links}</div>` : ""}
        `;

    webProjectsGrid.appendChild(projectCard);
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  populateGames();
  populateAffiliations();
  populateWebProjects();
  updateStats();
});
