
module.exports = function (db) {
  var website = {db: db};
  db.defaults({
    posts: [],
    users: [],
    postCount: 0
  });
};
