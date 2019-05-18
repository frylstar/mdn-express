const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
})
// Virtual 是document的属性，但是不会被保存到MongoDB数据库
// getter 可以用于格式化和组合字段数据
// setter 可以很方便地分解一个值到多个字段
// 虚拟属性'name': 表示作者全名
AuthorSchema.virtual('name')
    .get(function () {
        return this.family_name + ', ' + this.first_name;
    })
// 虚拟属性'lifespan': 作者寿命
AuthorSchema.virtual('lifespan')
    .get(function () {
        return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
    })
// 虚拟属性'url': 作者 URL
AuthorSchema.virtual('url')
    .get(function() {
        return '/catalog/author/' + this._id;
    })

// 再次强调：虚拟值不能用于查询和字段选择，因为虚拟值不储存于MongoDB。

// 导出 Author 模型
module.exports = mongoose.model('Author', AuthorSchema);