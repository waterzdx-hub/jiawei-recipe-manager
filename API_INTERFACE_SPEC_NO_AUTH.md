# 家味 - 家庭菜谱管理器后端接口文档

## 项目概述

家味是一款家庭菜谱管理应用，当前为纯前端实现，使用本地状态管理菜谱数据。本文档定义了无需身份验证的后端接口，适用于个人或家庭内部使用的场景。
我的数据库连接方式为：mongodb://root:wksw8fzg@test-db-mongodb.ns-rgnz0cop.svc:27017

## 接口规范

- 协议：HTTP/HTTPS
- 数据格式：JSON
- 字符编码：UTF-8
- 时间格式：ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)

## 接口列表

### 菜谱管理接口

#### 1. 获取菜谱列表
- **接口地址**：`GET /api/recipes?category=&search=`
- **功能描述**：获取菜谱列表，支持分类和关键词筛选
- **查询参数**：
  - `category` (可选): 按分类筛选
  - `search` (可选): 按关键词搜索
  - `page` (可选): 页码，默认为1
  - `limit` (可选): 每页数量，默认为10
- **响应参数**：
  ```json
  {
    "success": true,
    "message": "string",
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

#### 2. 获取单个菜谱详情
- **接口地址**：`GET /api/recipes/{id}`
- **功能描述**：获取指定ID的菜谱详情
- **路径参数**：`id` - 菜谱ID
- **响应参数**：
  ```json
  {
    "success": true,
    "message": "string",
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

#### 3. 创建菜谱
- **接口地址**：`POST /api/recipes`
- **功能描述**：创建新的菜谱
- **请求参数**：
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
- **响应参数**：
  ```json
  {
    "success": true,
    "message": "string",
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

#### 4. 更新菜谱
- **接口地址**：`PUT /api/recipes/{id}`
- **功能描述**：更新指定ID的菜谱
- **路径参数**：`id` - 菜谱ID
- **请求参数**：同创建菜谱
- **响应参数**：
  ```json
  {
    "success": true,
    "message": "string",
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

#### 5. 删除菜谱
- **接口地址**：`DELETE /api/recipes/{id}`
- **功能描述**：删除指定ID的菜谱
- **路径参数**：`id` - 菜谱ID
- **响应参数**：
  ```json
  {
    "success": true,
    "message": "string",
    "data": null
  }
  ```

### 分类管理接口

#### 6. 获取分类列表
- **接口地址**：`GET /api/categories`
- **功能描述**：获取所有菜谱分类
- **响应参数**：
  ```json
  {
    "success": true,
    "message": "string",
    "data": {
      "categories": ["string"]
    }
  }
  ```

#### 7. 创建分类
- **接口地址**：`POST /api/categories`
- **功能描述**：创建新分类
- **请求参数**：
  ```json
  {
    "name": "string"
  }
  ```
- **响应参数**：
  ```json
  {
    "success": true,
    "message": "string",
    "data": {
      "id": "string",
      "name": "string",
      "createdAt": "string"
    }
  }
  ```

### 购物车管理接口

#### 8. 获取购物车
- **接口地址**：`GET /api/cart`
- **功能描述**：获取当前用户的购物车内容
- **响应参数**：
  ```json
  {
    "success": true,
    "message": "string",
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

#### 9. 添加到购物车
- **接口地址**：`POST /api/cart`
- **功能描述**：添加菜谱到购物车
- **请求参数**：
  ```json
  {
    "recipeId": "string",
    "quantity": "number"
  }
  ```
- **响应参数**：
  ```json
  {
    "success": true,
    "message": "string",
    "data": {
      "recipeId": "string",
      "quantity": "number"
    }
  }
  ```

#### 10. 更新购物车项目数量
- **接口地址**：`PUT /api/cart/{recipeId}`
- **功能描述**：更新购物车中指定菜谱的数量
- **路径参数**：`recipeId` - 菜谱ID
- **请求参数**：
  ```json
  {
    "quantity": "number"
  }
  ```
- **响应参数**：
  ```json
  {
    "success": true,
    "message": "string",
    "data": {
      "recipeId": "string",
      "quantity": "number"
    }
  }
  ```

#### 11. 从购物车移除项目
- **接口地址**：`DELETE /api/cart/{recipeId}`
- **功能描述**：从购物车移除指定菜谱
- **路径参数**：`recipeId` - 菜谱ID
- **响应参数**：
  ```json
  {
    "success": true,
    "message": "string",
    "data": null
  }
  ```

#### 12. 清空购物车
- **接口地址**：`DELETE /api/cart/clear`
- **功能描述**：清空当前用户购物车
- **响应参数**：
  ```json
  {
    "success": true,
    "message": "string",
    "data": null
  }
  ```

## 错误码定义

| 错误码 | 描述 |
|--------|------|
| 10000 | 请求成功 |
| 10001 | 参数错误 |
| 10002 | 资源不存在 |
| 10003 | 资源已存在 |
| 10004 | 服务器内部错误 |
| 10005 | 数据库错误 |
| 10006 | 文件上传失败 |

## 注意事项

1. 此版本接口无需身份验证，适用于个人或家庭内部使用
2. 对于敏感操作（如删除），应增加二次确认
3. 文件上传功能（如菜谱图片）需单独实现
4. 为保证数据一致性，关键操作应使用事务处理
5. 考虑缓存策略以提高性能
6. 由于没有身份验证，数据安全性较低，建议仅在受信任的网络环境中使用
7. 所有用户共享同一套数据，不区分用户数据