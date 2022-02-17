`mkdir part9`

`npm init `

注意： 你可能需要运行 `npm run ts-node -- -O '{""noImplicitAny"": false}' .\multiplier.ts` 或者使用 `tsconfig.json` 打开严格模式

`npm install --save-dev @types/express`

`npm install --save-dev ts-node-dev`

`npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser`

您可能会发现在处理请求正文中的数据时使用显式 any 类型是有益的。 我们的 eslint 配置可以防止这种情况，但是你可以通过在前一行插入下面的注释来取消这个规则:
`// eslint-disable-next-line @typescript-eslint/no-explicit-any`
