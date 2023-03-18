document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Set the initial state of the toggle switch based on the system preference
  darkModeToggle.checked = isDarkMode;
  document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');

  // Toggle dark mode on click
  darkModeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
  });

  // Your existing RSS feed fetching code follows

  const rssFeedContainer = document.getElementById('rss-feed-container');
  const rssFeedUrl = 'https://hnrss.org/frontpage?link=comments';

  fetch(rssFeedUrl)
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');
      const items = xmlDoc.getElementsByTagName('item');

      for (let i = 0; i < items.length; i++) {
        const title = items[i].getElementsByTagName('title')[0].textContent;
        const link = items[i].getElementsByTagName('link')[0].textContent;
        const pubDate = items[i].getElementsByTagName('pubDate')[0].textContent;

        const feedItem = document.createElement('div');
        feedItem.classList.add('feed-item');

        const feedTitle = document.createElement('a');
        feedTitle.classList.add('feed-title');
        feedTitle.href = link;
        feedTitle.target = '_blank';
        feedTitle.textContent = title;

        const feedDate = document.createElement('span');
        feedDate.classList.add('feed-date');
        feedDate.textContent = new Date(pubDate).toLocaleDateString();

        feedItem.appendChild(feedTitle);
        feedItem.appendChild(feedDate);
        rssFeedContainer.appendChild(feedItem);
      }
    })
    .catch(err => {
      console.error('Failed to fetch RSS feed:', err);
    });
});
