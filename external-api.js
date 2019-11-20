const request = require('request')

const getArticles = function (url) {
  return new Promise((resolve, reject) =>
    request.get(
      {
        url: url,
        json: true,
        headers: { 'User-Agent': 'request' }
      },
      (err, res, data) => {
        if (!err && res.statusCode === 200) {
          return resolve(
            data.message.items.map(i => {
              return {
                doi: i.DOI,
                title: i.title.join(' '),
                // title: i.title[0],
                issn: i.ISSN
              }
            })
          )
        } else {
          return reject(err)
          // TODO handle 404*
        }
      }
    )
  )
}

module.exports = { getArticles }