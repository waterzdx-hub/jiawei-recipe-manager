# 家味 - 家庭菜谱管理器后端接口文档

## 项目概述

这是一款基于 Node.js 的后端项目，使用 MongoDB 作为数据库，提供了无需身份验证的后端接口，适用于个人或家庭内部使用的场景。

## 接口规范

- 协议：HTTP/HTTPS
- 数据格式：JSON
- 字符编码：UTF-8
- 时间格式：ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)
- 基础 URL：https://vrlvedyuccqk.sealosbja.site

## 错误码定义

| 错误码 | 描述 | HTTP 状态码 |
|--------|------|------------|
| 10000 | 请求成功 | 200/201 |
| 10001 | 参数错误 | 400 |
| 10002 | 资源不存在 | 404 |
| 10003 | 资源已存在 | 400 |
| 10004 | 服务器内部错误 | 500 |
| 10005 | 数据库错误 | 500 |

## 接口列表

### 1. 健康检查接口

#### 接口地址：`GET /`
- **功能描述**：检查服务器是否正常运行
- **请求参数**：无
- **成功返回值**：
  ```json
  {
    "success": true,
    "message": "服务器运行正常",
    "data": null
  }
  ```
- **失败返回值**：
  ```json
  {
    "success": false,
    "message": "服务器内部错误",
    "data": null
  }
  ```

### 2. 菜谱管理接口

#### 2.1 获取菜谱列表
- **接口地址**：`GET /api/recipes?category=&search=&page=&limit=`
- **功能描述**：获取菜谱列表，支持分类和关键词筛选
- **查询参数**：
  - `category` (可选): 按分类筛选
  - `search` (可选): 按关键词搜索
  - `page` (可选): 页码，默认为 1
  - `limit` (可选): 每页数量，默认为 10
- **成功返回值**：
  ```json
  {
    "success": true,
    "message": "获取菜谱列表成功",
    "data": {
      "recipes": [
        {
          "id": "string",
          "name": "string",
          "categories": ["string"],
          "tags": ["string"],
          "image": "string",
          "date": "string",
          "ingredients": [
            {
              "name": "string",
              "amount": "string"
            }
          ],
          "steps": [
            {
              "description": "string"
            }
          ],
          "chefNote": "string",
          "createdAt": "string",
          "updatedAt": "string"
        }
      ],
      "pagination": {
        "page": 1,
        "limit": 10,
        "total": 100,
        "totalPages": 10
      }
    }
  }
  ```
- **失败返回值**：
  ```json
  {
    "success": false,
    "message": "服务器内部错误",
    "data": null
  }
  ```

#### 2.2 获取单个菜谱详情
- **接口地址**：`GET /api/recipes/{id}`
- **功能描述**：获取指定 ID 的菜谱详情
- **路径参数**：`id` - 菜谱 ID
- **成功返回值**：
  ```json
  {
    "success": true,
    "message": "获取菜谱详情成功",
    "data": {
      "id": "string",
      "name": "string",
      "categories": ["string"],
      "tags": ["string"],
      "image": "string",
      "date": "string",
      "ingredients": [
        {
          "name": "string",
          "amount": "string"
        }
      ],
      "steps": [
        {
          "description": "string"
        }
      ],
      "chefNote": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
  }
  ```
- **失败返回值**：
  ```json
  {
    "success": false,
    "message": "菜谱不存在",
    "data": null
  }
  ```
  ```json
  {
    "success": false,
    "message": "服务器内部错误",
    "data": null
  }
  ```

#### 2.3 创建菜谱
- **接口地址**：`POST /api/recipes`
- **功能描述**：创建新的菜谱
- **请求体**：
  ```json
  {
    "name": "string",
    "categories": ["string"],
    "tags": ["string"],
    "image": "string",
    "ingredients": [
      {
        "name": "string",
        "amount": "string"
      }
    ],
    "steps": [
      {
        "description": "string"
      }
    ],
    "chefNote": "string"
  }
  ```
- **成功返回值**：
  ```json
  {
    "success": true,
    "message": "创建菜谱成功",
    "data": {
      "id": "string",
      "name": "string",
      "categories": ["string"],
      "tags": ["string"],
      "image": "string",
      "date": "string",
      "ingredients": [
        {
          "name": "string",
          "amount": "string"
        }
      ],
      "steps": [
        {
          "description": "string"
        }
      ],
      "chefNote": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
  }
  ```
- **失败返回值**：
  ```json
  {
    "success": false,
    "message": "服务器内部错误",
    "data": null
  }
  ```

#### 2.4 更新菜谱
- **接口地址**：`PUT /api/recipes/{id}`
- **功能描述**：更新指定 ID 的菜谱
- **路径参数**：`id` - 菜谱 ID
- **请求体**：同创建菜谱
- **成功返回值**：
  ```json
  {
    "success": true,
    "message": "更新菜谱成功",
    "data": {
      "id": "string",
      "name": "string",
      "categories": ["string"],
      "tags": ["string"],
      "image": "string",
      "date": "string",
      "ingredients": [
        {
          "name": "string",
          "amount": "string"
        }
      ],
      "steps": [
        {
          "description": "string"
        }
      ],
      "chefNote": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
  }
  ```
- **失败返回值**：
  ```json
  {
    "success": false,
    "message": "菜谱不存在",
    "data": null
  }
  ```
  ```json
  {
    "success": false,
    "message": "服务器内部错误",
    "data": null
  }
  ```

#### 2.5 删除菜谱
- **接口地址**：`DELETE /api/recipes/{id}`
- **功能描述**：删除指定 ID 的菜谱
- **路径参数**：`id` - 菜谱 ID
- **成功返回值**：
  ```json
  {
    "success": true,
    "message": "删除菜谱成功",
    "data": null
  }
  ```
- **失败返回值**：
  ```json
  {
    "success": false,
    "message": "菜谱不存在",
    "data": null
  }
  ```
  ```json
  {
    "success": false,
    "message": "服务器内部错误",
    "data": null
  }
  ```

### 3. 分类管理接口

#### 3.1 获取分类列表
- **接口地址**：`GET /api/categories`
- **功能描述**：获取所有菜谱分类
- **请求参数**：无
- **成功返回值**：
  ```json
  {
    "success": true,
    "message": "获取分类列表成功",
    "data": {
      "categories": ["string"]
    }
  }
  ```
- **失败返回值**：
  ```json
  {
    "success": false,
    "message": "服务器内部错误",
    "data": null
  }
  ```

#### 3.2 创建分类
- **接口地址**：`POST /api/categories`
- **功能描述**：创建新分类
- **请求体**：
  ```json
  {
    "name": "string"
  }
  ```
- **成功返回值**：
  ```json
  {
    "success": true,
    "message": "创建分类成功",
    "data": {
      "id": "string",
      "name": "string",
      "createdAt": "string"
    }
  }
  ```
- **失败返回值**：
  ```json
  {
    "success": false,
    "message": "分类已存在",
    "data": null
  }
  ```
  ```json
  {
    "success": false,
    "message": "服务器内部错误",
    "data": null
  }
  ```

### 4. 购物车管理接口

#### 4.1 获取购物车
- **接口地址**：`GET /api/cart`
- **功能描述**：获取当前用户的购物车内容
- **请求参数**：无
- **成功返回值**：
  ```json
  {
    "success": true,
    "message": "获取购物车成功",
    "data": {
      "items": [
        {
          "recipeId": "string",
          "quantity": "number",
          "recipe": {
            // 完整的菜谱对象
          }
        }
      ]
    }
  }
  ```
- **失败返回值**：
  ```json
  {
    "success": false,
    "message": "服务器内部错误",
    "data": null
  }
  ```

#### 4.2 添加到购物车
- **接口地址**：`POST /api/cart`
- **功能描述**：添加菜谱到购物车
- **请求体**：
  ```json
  {
    "recipeId": "string",
    "quantity": "number"
  }
  ```
- **成功返回值**：
  ```json
  {
    "success": true,
    "message": "添加到购物车成功",
    "data": {
      "recipeId": "string",
      "quantity": "number"
    }
  }
  ```
- **失败返回值**：
  ```json
  {
    "success": false,
    "message": "菜谱不存在",
    "data": null
  }
  ```
  ```json
  {
    "success": false,
    "message": "服务器内部错误",
    "data": null
  }
  ```

#### 4.3 更新购物车项目数量
- **接口地址**：`PUT /api/cart/{recipeId}`
- **功能描述**：更新购物车中指定菜谱的数量
- **路径参数**：`recipeId` - 菜谱 ID
- **请求体**：
  ```json
  {
    "quantity": "number"
  }
  ```
- **成功返回值**：
  ```json
  {
    "success": true,
    "message": "更新购物车项目数量成功",
    "data": {
      "recipeId": "string",
      "quantity": "number"
    }
  }
  ```
- **失败返回值**：
  ```json
  {
    "success": false,
    "message": "购物车不存在",
    "data": null
  }
  ```
  ```json
  {
    "success": false,
    "message": "购物车中不存在该菜谱",
    "data": null
  }
  ```
  ```json
  {
    "success": false,
    "message": "服务器内部错误",
    "data": null
  }
  ```

#### 4.4 从购物车移除项目
- **接口地址**：`DELETE /api/cart/{recipeId}`
- **功能描述**：从购物车移除指定菜谱
- **路径参数**：`recipeId` - 菜谱 ID
- **成功返回值**：
  ```json
  {
    "success": true,
    "message": "从购物车移除项目成功",
    "data": null
  }
  ```
- **失败返回值**：
  ```json
  {
    "success": false,
    "message": "购物车不存在",
    "data": null
  }
  ```
  ```json
  {
    "success": false,
    "message": "服务器内部错误",
    "data": null
  }
  ```

#### 4.5 清空购物车
- **接口地址**：`DELETE /api/cart/clear`
- **功能描述**：清空当前用户购物车
- **请求参数**：无
- **成功返回值**：
  ```json
  {
    "success": true,
    "message": "清空购物车成功",
    "data": null
  }
  ```
- **失败返回值**：
  ```json
  {
    "success": false,
    "message": "购物车不存在",
    "data": null
  }
  ```
  ```json
  {
    "success": false,
    "message": "服务器内部错误",
    "data": null
  }
  ```

## 注意事项

1. 此版本接口无需身份验证，适用于个人或家庭内部使用
2. 对于敏感操作（如删除），应增加二次确认
3. 文件上传功能（如菜谱图片）需单独实现
4. 由于没有身份验证，数据安全性较低，建议仅在受信任的网络环境中使用
5. 所有用户共享同一套数据，不区分用户数据
6. 为保证数据一致性，关键操作应使用事务处理
7. 考虑缓存策略以提高性能