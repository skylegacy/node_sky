## NodeJs 

相關教學 :
- [Chris 技術筆記(Sequelize)](https://dwatow.github.io/tags/sequelize/)
- [How to use Sequelize with Node and Express](https://www.codementor.io/mirko0/how-to-use-sequelize-with-node-and-express-i24l67cuz)
- [让Node.js项目实现热部署，修改文件避免重启](https://www.javatang.com/archives/2018/12/04/50212669.html)
- [Node.js中的express框架熱部屬](https://blog.csdn.net/twodogya/article/details/80183565)

---

注意事項 :

1. ```User.sync()```中使用```{force: true}```會讓城市每次執行的時候強制刪除資料庫，並且重新建立資料庫。這比較適合在測試環境中執行，而正式環境，則需要把force拿掉...

2. 使用migration方式維護DB,需建立```.sequelizerc```已啟動ORM: [https://github.com/sequelize/express-example](https://github.com/sequelize/express-example)