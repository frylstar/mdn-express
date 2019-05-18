const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema({
    // 指向相关藏书的引用
    book: {type: Schema.Types.ObjectId, ref: 'Book', required: true},
    // 出版项
    imprint: {type: String, required: true},
    status: {
        type: String,
        required: true,
        enum: ['可供借阅', '馆藏维护', '已借出', '保留'],
        default: '馆藏维护'
    },
    due_back: {type: Date, default: Date.now}
})

BookInstanceSchema.virtual('url')
    .get(function() {
        return '/catalog/bookinstance' + this._id;
    });

// 导出 BookInstance 模型
module.exports = mongoose.model('BookInstance', BookInstanceSchema);