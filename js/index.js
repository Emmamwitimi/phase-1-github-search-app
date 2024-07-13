document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#github-form");
    const searchInput = document.querySelector("#search");
    const userList = document.querySelector("#user-list");
    const reposList = document.querySelector("#repos-list");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        searchUsers(query);
      }
    });
  
    function searchUsers(query) {
      fetch(`https://api.github.com/search/users?q=${query}`, {
        headers: {
          "Accept": "application/vnd.github.v3+json"
        }
      })
      .then(response => response.json())
      .then(data => {
        displayUsers(data.items);
      })
      .catch(error => console.error("Error fetching user data:", error));
    }
  
    function displayUsers(users) {
      userList.innerHTML = "";
      reposList.innerHTML = "";
      users.forEach(user => {
        const userItem = document.createElement("li");
        userItem.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
          <a href="${user.html_url}" target="_blank">${user.login}</a>
          <button data-username="${user.login}">Show Repos</button>
        `;
        userList.appendChild(userItem);
  
        const showReposButton = userItem.querySelector("button");
        showReposButton.addEventListener("click", () => {
          fetchUserRepos(user.login);
        });
      });
    }
  
    function fetchUserRepos(username) {
      fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          "Accept": "application/vnd.github.v3+json"
        }
      })
      .then(response => response.json())
      .then(data => {
        displayRepos(data);
      })
      .catch(error => console.error("Error fetching repos:", error));
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = "";
      repos.forEach(repo => {
        const repoItem = document.createElement("li");
        repoItem.innerHTML = `
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        `;
        reposList.appendChild(repoItem);
      });
    }
  });
  