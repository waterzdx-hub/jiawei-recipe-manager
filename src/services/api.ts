// src/services/api.ts
import { Recipe, CartItem } from '../../types';

const API_BASE_URL = 'https://vrlvedyuccqk.sealosbja.site'; // 根据文档中的基础URL

// 通用请求函数
const request = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || '请求失败');
    }

    return data;
  } catch (error) {
    console.error(`API请求错误: ${endpoint}`, error);
    throw error;
  }
};

// 菜谱相关API
export const recipeApi = {
  // 获取菜谱列表
  getRecipes: async (params?: { category?: string; search?: string; page?: number; limit?: number }) => {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const endpoint = `/api/recipes${queryString ? '?' + queryString : ''}`;

    return request(endpoint);
  },

  // 获取单个菜谱详情
  getRecipeById: async (id: string) => {
    return request(`/api/recipes/${id}`);
  },

  // 创建菜谱
  createRecipe: async (recipeData: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => {
    return request('/api/recipes', {
      method: 'POST',
      body: JSON.stringify(recipeData),
    });
  },

  // 更新菜谱
  updateRecipe: async (id: string, recipeData: Partial<Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>>) => {
    return request(`/api/recipes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(recipeData),
    });
  },

  // 删除菜谱
  deleteRecipe: async (id: string) => {
    return request(`/api/recipes/${id}`, {
      method: 'DELETE',
    });
  },
};

// 分类相关API
export const categoryApi = {
  // 获取分类列表
  getCategories: async () => {
    return request('/api/categories');
  },

  // 创建分类
  createCategory: async (name: string) => {
    return request('/api/categories', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  },
};

// 购物车相关API
export const cartApi = {
  // 获取购物车
  getCart: async () => {
    return request('/api/cart');
  },

  // 添加到购物车
  addToCart: async (recipeId: string, quantity: number = 1) => {
    return request('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ recipeId, quantity }),
    });
  },

  // 更新购物车项目数量
  updateCartItemQuantity: async (recipeId: string, quantity: number) => {
    return request(`/api/cart/${recipeId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  },

  // 从购物车移除项目
  removeFromCart: async (recipeId: string) => {
    return request(`/api/cart/${recipeId}`, {
      method: 'DELETE',
    });
  },

  // 清空购物车
  clearCart: async () => {
    return request('/api/cart/clear', {
      method: 'DELETE',
    });
  },
};