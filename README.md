# components-playgroud

爱速搭自定义组件本地开发环境

## 开发指南

```
# 安装依赖
npm i

# 开启本地服务
npm start

# 生成自定义组件压缩包 components.zip
npm run build
```

进入爱速搭 应用管理-自定义组件，点击「导入组件」，选中压缩包导入，等待编译完成后即可使用。

## 注意事项

### 自定义组件 key 值

导入到爱速搭中，解析后会自动根据文件名，生成对应的组件 key，并在前加 `custom-` 前缀。

例如：一个名字为 `vue-text.js` 的组件文件，导入后，是通过 `custom-vue-text` 来使用的。

> 因为是根据文件名生成组件 key，所以文件名不可以重复
