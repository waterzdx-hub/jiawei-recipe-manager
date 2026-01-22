import React, { useState, useEffect, useCallback } from 'react';
import { Recipe, CartItem, Page } from './types';
import { recipeApi, categoryApi, cartApi } from './src/services/api';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';
import RecipeDetail from './pages/RecipeDetail';
import Cart from './pages/Cart';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  // Flattened categories for easier global sorting
  const [categories, setCategories] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 初始化数据
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        
        // 添加超时处理，防止API调用一直没有响应
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('API调用超时')), 5000);
        });
        
        // 并行请求所有数据，并设置超时
        const [recipeResponse, categoryResponse, cartResponse] = await Promise.race([
          Promise.all([
            recipeApi.getRecipes(),
            categoryApi.getCategories(),
            cartApi.getCart()
          ]),
          timeoutPromise
        ]);
        
        // 检查API响应是否返回了有效的数据
        const recipesData = recipeResponse.data.recipes || [];
        const categoriesData = categoryResponse.data.categories || [];
        const cartData = cartResponse.data.items || [];
        
        // 如果API返回的数据为空，使用默认数据
        if (recipesData.length === 0 || categoriesData.length === 0) {
          console.log('API返回的数据为空，使用默认数据');
          setRecipes([
            {
              id: '1',
              name: '红烧肉',
              categories: ['热菜'],
              tags: ['家常', '肉类'],
              image: 'https://picsum.photos/seed/hongshaorou/800/600',
              date: new Date().toLocaleDateString('zh-CN'),
              ingredients: [
                { name: '五花肉', amount: '500g' },
                { name: '生姜', amount: '1块' },
                { name: '大蒜', amount: '3瓣' },
                { name: '酱油', amount: '2勺' },
                { name: '料酒', amount: '1勺' },
                { name: '白糖', amount: '2勺' }
              ],
              steps: [
                { description: '将五花肉洗净，切成方块' },
                { description: '锅中放入清水，将五花肉放入锅中，大火煮开后撇去浮沫' },
                { description: '将五花肉捞出，沥干水分' },
                { description: '锅中放入少量油，放入白糖，小火炒至融化呈焦糖色' },
                { description: '放入五花肉，翻炒均匀，使每块肉都裹上糖色' },
                { description: '放入生姜、大蒜、酱油、料酒，翻炒均匀' },
                { description: '加入没过五花肉的清水，大火煮开后转小火炖1.5小时' },
                { description: '大火收汁，即可出锅' }
              ],
              chefNote: '红烧肉要选肥瘦相间的五花肉，这样做出来的红烧肉才会肥而不腻，瘦而不柴。'
            },
            {
              id: '2',
              name: '宫保鸡丁',
              categories: ['热菜'],
              tags: ['家常', '川菜', '鸡肉'],
              image: 'https://picsum.photos/seed/gongbaojiding/800/600',
              date: new Date().toLocaleDateString('zh-CN'),
              ingredients: [
                { name: '鸡胸肉', amount: '300g' },
                { name: '花生米', amount: '100g' },
                { name: '干辣椒', amount: '10个' },
                { name: '花椒', amount: '1勺' },
                { name: '生姜', amount: '1块' },
                { name: '大蒜', amount: '3瓣' },
                { name: '酱油', amount: '1勺' },
                { name: '料酒', amount: '1勺' },
                { name: '白糖', amount: '1勺' },
                { name: '醋', amount: '1勺' },
                { name: '淀粉', amount: '1勺' }
              ],
              steps: [
                { description: '将鸡胸肉洗净，切成丁，加入料酒、酱油、淀粉腌制15分钟' },
                { description: '将花生米放入锅中，小火炒香，捞出备用' },
                { description: '锅中放入适量油，放入干辣椒、花椒爆香' },
                { description: '放入腌制好的鸡丁，翻炒至变色' },
                { description: '放入生姜、大蒜，翻炒均匀' },
                { description: '放入白糖、醋，翻炒均匀' },
                { description: '放入炒香的花生米，翻炒均匀，即可出锅' }
              ],
              chefNote: '宫保鸡丁要选用鸡胸肉，这样做出来的鸡丁才会嫩滑。花生米要最后放入，这样做出来的花生米才会酥脆。'
            }
          ]);
          setCategories(['热菜', '凉菜', '汤羹', '主食', '甜点']);
        } else {
          // 如果API返回了有效的数据，使用API返回的数据
          setRecipes(recipesData);
          setCategories(categoriesData);
          setCart(cartData);
        }
      } catch (error) {
        console.error('初始化数据失败:', error);
        // 当API调用失败时，使用默认数据
        setRecipes([
          {
            id: '1',
            name: '红烧肉',
            categories: ['热菜'],
            tags: ['家常', '肉类'],
            image: 'https://picsum.photos/seed/hongshaorou/800/600',
            date: new Date().toLocaleDateString('zh-CN'),
            ingredients: [
              { name: '五花肉', amount: '500g' },
              { name: '生姜', amount: '1块' },
              { name: '大蒜', amount: '3瓣' },
              { name: '酱油', amount: '2勺' },
              { name: '料酒', amount: '1勺' },
              { name: '白糖', amount: '2勺' }
            ],
            steps: [
              { description: '将五花肉洗净，切成方块' },
              { description: '锅中放入清水，将五花肉放入锅中，大火煮开后撇去浮沫' },
              { description: '将五花肉捞出，沥干水分' },
              { description: '锅中放入少量油，放入白糖，小火炒至融化呈焦糖色' },
              { description: '放入五花肉，翻炒均匀，使每块肉都裹上糖色' },
              { description: '放入生姜、大蒜、酱油、料酒，翻炒均匀' },
              { description: '加入没过五花肉的清水，大火煮开后转小火炖1.5小时' },
              { description: '大火收汁，即可出锅' }
            ],
            chefNote: '红烧肉要选肥瘦相间的五花肉，这样做出来的红烧肉才会肥而不腻，瘦而不柴。'
          },
          {
            id: '2',
            name: '宫保鸡丁',
            categories: ['热菜'],
            tags: ['家常', '川菜', '鸡肉'],
            image: 'https://picsum.photos/seed/gongbaojiding/800/600',
            date: new Date().toLocaleDateString('zh-CN'),
            ingredients: [
              { name: '鸡胸肉', amount: '300g' },
              { name: '花生米', amount: '100g' },
              { name: '干辣椒', amount: '10个' },
              { name: '花椒', amount: '1勺' },
              { name: '生姜', amount: '1块' },
              { name: '大蒜', amount: '3瓣' },
              { name: '酱油', amount: '1勺' },
              { name: '料酒', amount: '1勺' },
              { name: '白糖', amount: '1勺' },
              { name: '醋', amount: '1勺' },
              { name: '淀粉', amount: '1勺' }
            ],
            steps: [
              { description: '将鸡胸肉洗净，切成丁，加入料酒、酱油、淀粉腌制15分钟' },
              { description: '将花生米放入锅中，小火炒香，捞出备用' },
              { description: '锅中放入适量油，放入干辣椒、花椒爆香' },
              { description: '放入腌制好的鸡丁，翻炒至变色' },
              { description: '放入生姜、大蒜，翻炒均匀' },
              { description: '放入白糖、醋，翻炒均匀' },
              { description: '放入炒香的花生米，翻炒均匀，即可出锅' }
            ],
            chefNote: '宫保鸡丁要选用鸡胸肉，这样做出来的鸡丁才会嫩滑。花生米要最后放入，这样做出来的花生米才会酥脆。'
          }
        ]);
        setCategories(['热菜', '凉菜', '汤羹', '主食', '甜点']);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  const navigateTo = (page: Page, recipeId?: string) => {
    setSelectedRecipeId(recipeId || null);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const addToCart = async (recipeId: string) => {
    try {
      // 检查购物车中是否已存在该项目
      const existingItem = cart.find(item => item.recipeId === recipeId);
      
      if (existingItem) {
        // 如果已存在，则更新数量
        const newQuantity = existingItem.quantity + 1;
        // 先更新本地状态，确保用户界面立即反映变化
        setCart(prev => 
          prev.map(item => 
            item.recipeId === recipeId ? { ...item, quantity: newQuantity } : item
          )
        );
        // 然后调用API
        await cartApi.updateCartItemQuantity(recipeId, newQuantity);
      } else {
        // 如果不存在，则添加到购物车
        // 先更新本地状态，确保用户界面立即反映变化
        setCart(prev => [...prev, { recipeId, quantity: 1 }]);
        // 然后调用API
        await cartApi.addToCart(recipeId, 1);
      }
    } catch (error) {
      console.error('添加到购物车失败:', error);
      // 即使API调用失败，本地状态已经更新，用户仍然可以看到购物车数据
    }
  };

  const updateCartQuantity = async (recipeId: string, delta: number) => {
    try {
      const existingItem = cart.find(item => item.recipeId === recipeId);
      if (!existingItem) return;
      
      const newQty = Math.max(0, existingItem.quantity + delta);
      if (newQty === 0) {
        // 先更新本地状态，确保用户界面立即反映变化
        setCart(prev => prev.filter(item => item.recipeId !== recipeId));
        // 然后调用API
        await cartApi.removeFromCart(recipeId);
      } else {
        // 先更新本地状态，确保用户界面立即反映变化
        setCart(prev => 
          prev.map(item => 
            item.recipeId === recipeId ? { ...item, quantity: newQty } : item
          ).filter(item => item.quantity > 0)
        );
        // 然后调用API
        await cartApi.updateCartItemQuantity(recipeId, newQty);
      }
    } catch (error) {
      console.error('更新购物车数量失败:', error);
      // 即使API调用失败，本地状态已经更新，用户仍然可以看到购物车数据
    }
  };

  const clearCart = async () => {
    try {
      // 先更新本地状态，确保用户界面立即反映变化
      setCart([]);
      // 然后调用API
      await cartApi.clearCart();
    } catch (error) {
      console.error('清空购物车失败:', error);
      // 即使API调用失败，本地状态已经更新，用户仍然可以看到购物车被清空
    }
  };

  const addRecipe = async (newRecipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await recipeApi.createRecipe(newRecipe);
      const createdRecipe = response.data;
      
      // 更新本地状态
      setRecipes(prev => [createdRecipe, ...prev]);
      setCurrentPage(Page.Home);
    } catch (error) {
      console.error('添加菜谱失败:', error);
    }
  };

  const deleteRecipe = async (recipeId: string) => {
    try {
      await recipeApi.deleteRecipe(recipeId);
      setRecipes(prev => prev.filter(r => r.id !== recipeId));
      setCart(prev => prev.filter(item => item.recipeId !== recipeId));
      navigateTo(Page.Home);
    } catch (error) {
      console.error('删除菜谱失败:', error);
    }
  };

  const addGlobalCategory = async (cat: string) => {
    try {
      // 检查分类是否已存在
      if (categories.includes(cat)) return;
      
      await categoryApi.createCategory(cat);
      setCategories(prev => [...prev, cat]);
    } catch (error) {
      console.error('添加分类失败:', error);
    }
  };

  const reorderCategories = (newCategories: string[]) => {
    setCategories(newCategories);
  };

  const renderPage = () => {
    // For AddRecipe, we can still provide categories as groups if we want, or just a flat list
    // Reconstructing groups for UI consistency in AddRecipe
    const groupedCategories: string[][] = [
      categories.slice(0, 5),
      categories.slice(5, 8),
      categories.slice(8)
    ];

    if (loading) {
      return (
        <div className="max-w-[480px] mx-auto min-h-screen bg-warm-bg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">加载中...</p>
          </div>
        </div>
      );
    }

    switch (currentPage) {
      case Page.Home:
        return (
          <Home 
            recipes={recipes} 
            categories={categories}
            onReorderCategories={reorderCategories}
            onNavigate={navigateTo} 
            onAddToCart={addToCart} 
            cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          />
        );
      case Page.Add:
        return (
          <AddRecipe 
            categoryGroups={groupedCategories}
            onAddGlobalCategory={(groupIdx, newCat) => addGlobalCategory(newCat)}
            onBack={() => navigateTo(Page.Home)} 
            onSave={addRecipe} 
          />
        );
      case Page.Detail:
        if (!selectedRecipeId) {
          // 如果没有选择的菜谱ID，显示一个错误提示
          return (
            <div className="max-w-[480px] mx-auto min-h-screen bg-warm-bg flex items-center justify-center">
              <div className="text-center">
                <span className="material-symbols-outlined text-4xl text-gray-400">error_outline</span>
                <p className="mt-4 text-gray-600">找不到对应的菜谱</p>
                <button 
                  onClick={() => navigateTo(Page.Home)}
                  className="mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                >
                  返回首页
                </button>
              </div>
            </div>
          );
        }
        const recipe = recipes.find(r => r.id === selectedRecipeId);
        if (recipe) {
          return (
            <RecipeDetail 
              recipe={recipe} 
              onBack={() => navigateTo(Page.Home)} 
              onDelete={() => deleteRecipe(recipe.id)}
            />
          );
        } else {
          // 如果找不到对应的菜谱，显示一个错误提示
          return (
            <div className="max-w-[480px] mx-auto min-h-screen bg-warm-bg flex items-center justify-center">
              <div className="text-center">
                <span className="material-symbols-outlined text-4xl text-gray-400">error_outline</span>
                <p className="mt-4 text-gray-600">找不到对应的菜谱</p>
                <button 
                  onClick={() => navigateTo(Page.Home)}
                  className="mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                >
                  返回首页
                </button>
              </div>
            </div>
          );
        }
      case Page.Cart:
        return (
          <Cart 
            cartItems={cart}
            recipes={recipes}
            onUpdateQuantity={updateCartQuantity}
            onClearAll={clearCart}
            onBack={() => navigateTo(Page.Home)}
          />
        );
      default:
        return <Home recipes={recipes} categories={categories} onReorderCategories={reorderCategories} onNavigate={navigateTo} onAddToCart={addToCart} cartCount={cart.length} />;
    }
  };

  return (
    <div className="max-w-[480px] mx-auto min-h-screen bg-warm-bg shadow-2xl relative overflow-x-hidden">
      {renderPage()}
    </div>
  );
};

export default App;