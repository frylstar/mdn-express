# mdn-express
### 文件改动时重启服务器（nodemon）

只有重启服务器才能看到 Express 网站所做的改动。每次改动后手动启停服务器实在太烦人了，有必要花点时间让这项工作自动化。

[nodemon](https://github.com/remy/nodemon) 是最简便的自动化工具之一。通常将其全局安装（因为它是一个“工具”）：

```
$ sudo npm install -g nodemon
```

这里还可以把它作为开发依赖将安装在本地，于是使用这个项目的开发人员只要安装这个应用就能自动获得。通过以下命令将其安装在骨架项目的根目录：

```
$ npm install --save-dev nodemon
```

项目的 **package.json** 文件将自动添加一个新的属性：

```json
"devDependencies": {
    "nodemon": "^1.18.9"
  }
```

如果没有全局安装该工具，就无法从命令行启动它（除非我们将其添加到路径中），但是可以在 NPM 脚本中调用它，因为 NPM 掌握所有已安装包的信息。找到 package.json 的 `scripts`部分。在 `"start"` 一行的末尾添加逗号，并在新的一行中添加 `"devstart"`，如下所示：

```json
"scripts": {
    "start": "node ./bin/www",
    "devstart": "nodemon ./bin/www"
  },
```

现在可以用新建的 `devstart` 命令启动服务器：

```
$ DEBUG=express-locallibrary-tutorial:* npm run devstart
```

现在，如果编辑项目中的任何文件，服务器将自动重启（或者可以随时使用 rs 命令来重启）。查看更新后的页面需要点击浏览器的“刷新”按钮。

**注：**这里必须使用“`npm **run <scriptname>**`”命令，而不是 `npm start`，因为 “start” 本质上是映射到脚本的一条 NPM 命令。我们可以在 `start` 脚本中替换它，但我们只想在开发期间使用 nodemon，因此有必要创建一条新的脚本命令。