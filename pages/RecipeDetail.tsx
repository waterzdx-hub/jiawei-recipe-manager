
import React from 'react';
import { Recipe } from '../types';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  onDelete: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onBack, onDelete }) => {
  const confirmDelete = () => {
    if (window.confirm('确定要删除这个菜谱吗？')) {
      onDelete();
    }
  };

  return (
    <div className="min-h-screen bg-background-light pb-32 relative">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-50 bg-background-light/80 backdrop-blur-md px-4 py-3 flex items-center border-b border-gray-200">
        <button 
          onClick={onBack} 
          className="flex size-10 items-center justify-center text-[#1b120d] hover:bg-gray-100 rounded-full active:scale-90 transition-all"
          aria-label="返回"
        >
          <span className="material-symbols-outlined !text-xl font-bold">arrow_back_ios_new</span>
        </button>
        <h1 className="flex-1 text-center text-lg font-bold tracking-tight pr-10 truncate">{recipe.name}</h1>
        <button 
          onClick={confirmDelete}
          className="flex size-10 items-center justify-center text-red-500 hover:bg-red-50 rounded-full active:scale-90 transition-all"
          aria-label="删除"
        >
          <span className="material-symbols-outlined !text-xl font-bold">delete</span>
        </button>
      </div>

      <main className="pb-20">
        {/* Hero Image */}
        <div className="relative">
          <div 
            className="h-72 bg-cover bg-center" 
            style={{ backgroundImage: `url("${recipe.image}")` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background-light to-transparent"></div>
          </div>
        </div>

        {/* Content Card */}
        <div className="rounded-t-3xl -mt-12 relative z-10 bg-white px-5 pt-12 pb-8 shadow-lg">
          {/* Meta Info */}
          <div className="flex gap-3 mb-6">
            <div className="bg-primary/10 text-primary text-xs font-bold py-1 px-3 rounded-full">
              {recipe.date}
            </div>
            {recipe.tags?.map((tag, idx) => (
              <div key={idx} className="bg-gray-100 text-gray-600 text-xs font-medium py-1 px-3 rounded-full">
                {tag}
              </div>
            ))}
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-3">分类</h3>
            <div className="flex flex-wrap gap-2">
              {recipe.categories.map((cat, idx) => (
                <div key={idx} className="bg-gray-50 text-gray-700 text-sm font-medium py-2 px-4 rounded-full">
                  {cat}
                </div>
              ))}
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-3">所需食材</h3>
            <div className="grid grid-cols-2 gap-3">
              {recipe.ingredients?.map((ingredient, idx) => (
                <div key={idx} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">{ingredient.name}</span>
                  <span className="font-medium text-gray-900">{ingredient.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-3">烹饪步骤</h3>
            <div className="space-y-5">
              {recipe.steps?.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 pt-1">
                    <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="pb-6 text-gray-600">{step.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Chef's Note */}
          {recipe.chefNote && (
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
              <div className="flex gap-3">
                <div className="text-amber-500 flex-shrink-0 pt-0.5">
                  <span className="material-symbols-outlined text-2xl">lightbulb</span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1.5">独门秘籍</h3>
                  <p className="text-amber-800">{recipe.chefNote}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RecipeDetail;
