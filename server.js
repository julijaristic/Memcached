const express = require('express');
const path = require('path');
const axios = require('axios');

const Memcached = require('memcached');
const memcachedClient = new Memcached('127.0.0.1:11211'); 

memcachedClient.on('issue', (details) => {
  console.error("Memcached issue:", details);
});
memcachedClient.on('failure', (details) => {
  console.error("Memcached failure:", details);
});
memcachedClient.on('reconnecting', (details) => {
  console.log("Reconnecting to Memcached:", details);
});

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.locals.dateFns = require('date-fns');

// Function to search Hacker News
async function searchHN(query) {
  const response = await axios.get(
    `https://hn.algolia.com/api/v1/search?query=${query}&tags=story&hitsPerPage=90`
  );
  return response.data;
}

app.get('/', (req, res) => {
  res.render('home', { title: 'Search Hacker News' });
});

app.get('/search', (req, res, next) => {
  try {
    const searchQuery = req.query.q;
    if (!searchQuery) {
      res.redirect(302, '/');
      return;
    }

    const key = "search:" + searchQuery.toLowerCase();

    memcachedClient.get(key, (err, value) => {
      if (err) return next(err);

      if (value) {
        const results = JSON.parse(value);
        console.log("Cache hit");
        res.render('search', {
          title: `Search results for: ${searchQuery}`,
          searchResults: results,
          searchQuery,
        });
      } else {
        searchHN(searchQuery).then(results => {
          memcachedClient.set(key, JSON.stringify(results), 300, (err) => {
            if (err) return next(err);
            console.log("Cache miss");
            res.render('search', {
              title: `Search results for: ${searchQuery}`,
              searchResults: results,
              searchQuery,
            });
          });
        }).catch(next);
      }
    });
  } catch (err) {
    next(err);
  }
});

/*// Cache middleware

function cachePage(req, res, next) {
  const cacheKey = `page:${req.originalUrl}`;
  
  memcachedClient.get(cacheKey, (err, value) => {
    if (err) return next(err);

    if (value) {
      console.log("Page cache hit");
      res.send(value);
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        memcachedClient.set(cacheKey, body, 300, (err) => {
          if (err) console.error("Cache set error:", err);
        });
        res.sendResponse(body);
      };
      next();
    }
  });
}

app.get('/', cachePage, (req, res) => {
  res.render('home', { title: 'Search Hacker News' });
});
*/

app.use((err, req, res, next) => {
  console.error(err);
  res.set('Content-Type', 'text/html');
  res.status(500).send('<h1>Internal Server Error</h1>');
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Hacker news server started on port: ${server.address().port}`);
});
