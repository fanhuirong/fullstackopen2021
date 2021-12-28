`npm init`

`npm install express`

`npm install cors`

`npm install dotenv`

`npm install mongoose`

`npm install --save-dev nodemon `

## 拆解
1. config 拆出来
2. logger拆出来
3. 数据库schema 的 models文件拆出
4. controller拆出来，进行数据库的接口操作
5. 从index里拆出app.js

## 测试
`npm install --save-dev jest`
```
{
"test": "jest --verbose"
}

"jest": {
   "testEnvironment": "node"
 }
```