const Moment = require('moment');
const uuid = require('uuid/v4');

class Collection {
  constructor (name) {
    this.name = name;
    this.items = [];
  }

  create (data) {
    data.id = uuid();
    data.createdAt = Moment();
    this.items.push(data);
    return data;
  }

  find (query) {
    if (!query) {
      return this.items;
    }
    return this.items.filter((item)=> {
      return Object.entries(query).every(([attr, value])=> {
        return (item[attr] === value);
      });
    });
  }

  findOne (query) {
    let result = this.find(query);
    return (result.length) ? result[0] : null;
  }
}

const Author = new Collection ('authors');
const Post = new Collection ('posts');

module.exports = {
  Author,
  Post
};
