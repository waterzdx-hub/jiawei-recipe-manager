
import React from 'react';
import { CartItem, Recipe } from '../types';

interface CartProps {
  cartItems: CartItem[];
  recipes: Recipe[];
  onUpdateQuantity: (recipeId: string, delta: number) => void;
  onClearAll: () => void;
  onBack: () => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, recipes, onUpdateQuantity, onClearAll, onBack }) => {
  const confirmClear = () => {
    if (window.confirm('确定要清空购物车吗？')) {
      onClearAll();
    }
  };

  // 计算总价（这里只是一个模拟计算，实际情况可能需要更复杂的逻辑）
  const totalPrice = cartItems.reduce((sum, item) => {
    // 假设每样食材的价格为5元
    const recipe = recipes.find(r => r.id === item.recipeId);
    const ingredientCount = recipe?.ingredients.length || 0;
    return sum + (ingredientCount * 5 * item.quantity);
  }, 0);

  return (
    <div className="min-h-screen bg-background-light pb-32">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-50 bg-background-light/80 backdrop-blur-md px-4 py-3 flex items-center border-b border-gray-200">
        <button 
          onClick={onBack} 
          className="flex size-10 items-center justify-center text-[#1b120d] hover:bg-gray-100 rounded-full active:scale-90 transition-all"
          aria-label="返回"
        >
          <span className="material-symbols-outlined !text-xl font-bold">arrow_back_ios_new</span>
        </button>
        <h1 className="flex-1 text-center text-lg font-bold tracking-tight pr-10">购物清单</h1>
        <button 
          onClick={confirmClear}
          className="flex size-10 items-center justify-center text-red-500 hover:bg-red-50 rounded-full active:scale-90 transition-all"
          aria-label="清空"
        >
          <span className="material-symbols-outlined !text-xl font-bold">autorenew</span>
        </button>
      </div>

      <main className="pb-20">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <span className="material-symbols-outlined text-4xl">shopping_cart</span>
            <p className="mt-2 text-sm text-center px-4">购物车空空如也</p>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-100">
              {cartItems.map((item) => {
                const recipe = recipes.find(r => r.id === item.recipeId);
                if (!recipe) return null;

                return (
                  <div key={item.recipeId} className="p-4 bg-white my-3 mx-4 rounded-xl flex items-center gap-4">
                    <div 
                      className="w-16 h-16 rounded-lg bg-cover bg-center" 
                      style={{ backgroundImage: `url("${recipe.image}")` }}
                    ></div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 truncate">{recipe.name}</h3>
                      <p className="text-xs text-gray-500 truncate">{recipe.date}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => onUpdateQuantity(item.recipeId, -1)}
                        className="size-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:scale-90"
                      >
                        <span className="material-symbols-outlined text-sm">remove</span>
                      </button>
                      
                      <span className="font-bold w-6 text-center">{item.quantity}</span>
                      
                      <button 
                        onClick={() => onUpdateQuantity(item.recipeId, 1)}
                        className="size-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:scale-90"
                      >
                        <span className="material-symbols-outlined text-sm">add</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mx-4 my-6">
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600">小计</span>
                  <span className="font-bold">¥{totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center text-lg font-bold mb-4">
                  <span>总计</span>
                  <span>¥{totalPrice.toFixed(2)}</span>
                </div>
                
                <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-transform active:scale-95">
                  去结算
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Cart;
