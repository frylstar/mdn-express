const Book = require('../models/book');
const Author = require('../models/author')
const Genre = require('../models/genre')
const BookInstance = require('../models/bookinstance')

const async = require('async')

exports.index = (req, res, next) => {
  // async.parallel()方法传递一个对象，其中包含用于获取每个模型计数的函数
  // 这些函数都是在同一时间开始的，全部完成时，最终回调将与结果参数中的计数（或错误）一起被调用
  async.parallel({
    book_count: function(callback) {
      Book.count({}, callback)
    },
    book_instance_count: function(callback) {
      BookInstance.count({}, callback)
    },
    book_instance_available_count: function(callback) {
      BookInstance.count({status: 'Available'}, callback);
    },
    author_count: function(callback) {
      Author.count({}, callback)
    },
    genre_count: function(callback) {
      Genre.count({}, callback)
    }
  }, function(err, results) {
    // 指定名为'index'的视图（模板），以及一个对象包含了要插入其中的数据
    res.render('index', { title: 'Local Library Home', err: err, data: results })
  })
}

exports.book_detail = (req, res) => {
  res.send('未实现，书详细信息：');
}

exports.book_create_get = (req, res) => {
  res.send('未实现');
}

exports.book_create_post = (req, res) => {
  res.send('未实现');
}

exports.book_delete_get = (req, res) => {
  res.send('未实现');
}

exports.book_delete_post = (req, res) => {
  res.send('未实现');
}

exports.book_update_get = (req, res) => {
  res.send('未实现');
}

exports.book_update_post = (req, res) => {
  res.send('未实现');
}

exports.book_list = (req, res) => {
  res.send('未实现')
}