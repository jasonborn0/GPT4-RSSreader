document.addEventListener('DOMContentLoaded', () => {
  const rssFeedContainer = document.getElementById('rss-feed-container');
  const rssFeedUrl = 'https://hnrss.org/frontpage';

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
