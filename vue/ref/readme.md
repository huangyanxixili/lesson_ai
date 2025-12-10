# 响应式驱动界面的诞生
    - 前后端分离
    - ref 封装响应式数据，将数据包装成响应式对象
    - 界面由 {{}} v-for 进行数据驱动 template 
    - 聚焦于业务，数据的变化

## 纯后端的套模板
- mvc 开发模式
   - model 数据
        mysql 数据库抽象
   - view 模板
        html {{todos}}
   - controller 业务逻辑
        控制器：用于查询model
        再去渲染view模板
   - http 伺服状态
        req.url
        res.end
           - html 静态部分
           - 动态部分，由数据驱动 
        用于处理用户请求
        再去调用控制器
        最后返回响应

## 前后端分离
- 前端
    写 html/css/js
    用 ajax/fetch 前端可以去主动拉取数据
     http://127.0.0.1:5500/vue/ref/demo2/frontend/index.html

- 后端
    没有返还 html
    而是返还 数据接口 api  :3000/users
    http://localhost:3000/users

- 前后端分离的优势
     开发人员解耦
         - 前端专注于用户交互和可视化
               DOM 编程 先找节点（不是业务）
               focus业务？ -> 数据驱动界面
         - 后端专注于数据处理和业务逻辑

## 响应式数据驱动
    - 响应式 **数据驱动** 的界面（template）
          {{todos}}
          和在后端套模板的业务中
          不用做DOM API 磨人，性能还差
    - 前后端分离  