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

```
  "scripts": {
    "start": "NODE_ENV=production node index.js",
    "dev": "NODE_ENV=development nodemon index.js",
    "test": "NODE_ENV=test jest --verbose --runInBand"
  },
```

之前的不能在win工作，增加cross-env

`npm install --save-dev cross-env`

```
  "scripts": {
    "start": "cross-env NODE_ENV=production node index.js",
    "dev": "cross-env NODE_ENV=development nodemon index.js",
    "test": "cross-env NODE_ENV=test jest --verbose --runInBand"
  },
```

api测试
`npm install --save-dev supertest`

消除try catch
`npm install express-async-errors`