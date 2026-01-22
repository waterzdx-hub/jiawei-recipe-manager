import React, { useState } from 'react';
import { Recipe, Ingredient } from '../types';

interface AddRecipeProps {
  categoryGroups: string[][];
  onAddGlobalCategory: (groupIdx: number, newCat: string) => void;
  onBack: () => void;
  onSave: (recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const AddRecipe: React.FC<AddRecipeProps> = ({ categoryGroups, onAddGlobalCategory, onBack, onSave }) => {
  const [name, setName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['热菜']);
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: '', amount: '' }]);
  const [steps, setSteps] = useState<string>('');
  const [note, setNote] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (!name) {
      alert('请先输入菜名哦');
      return;
    }
    const newRecipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'> = {
      name,
      categories: selectedCategories,
      tags: ['家常'],
      image: selectedImage || `https://picsum.photos/seed/${Date.now()}/800/600`,
      date: new Date().toLocaleDateString('zh-CN'),
      ingredients: ingredients.filter(i => i.name),
      steps: steps.split('\n').filter(s => s.trim()).map(s => ({ description: s })),
      chefNote: note
    };
    onSave(newRecipe);
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const addNewCategoryToGroup = (groupIdx: number) => {
    const newCat = window.prompt('请输入新分类名称:');
    if (newCat && newCat.trim()) {
      const trimmed = newCat.trim();
      onAddGlobalCategory(groupIdx, trimmed);
      // Automatically select the newly added category
      if (!selectedCategories.includes(trimmed)) {
        setSelectedCategories(prev => [...prev, trimmed]);
      }
    }
  };

  const addIngredientRow = () => setIngredients([...ingredients, { name: '', amount: '' }]);
  const removeIngredient = (idx: number) => setIngredients(ingredients.filter((_, i) => i !== idx));
  const updateIngredient = (idx: number, field: keyof Ingredient, val: string) => {
    const next = [...ingredients];
    next[idx][field] = val;
    setIngredients(next);
  };

  // 处理文件上传
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 触发文件选择
  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-background-light min-h-screen flex flex-col">
      {/* Header with Back Button on Top Left */}
      <div className="sticky top-0 z-50 bg-background-light/80 backdrop-blur-md px-2 py-3 flex items-center border-b border-gray-200">
        <button 
          onClick={onBack} 
          className="flex size-10 items-center justify-center text-[#1b120d] hover:bg-gray-100 rounded-full active:scale-90 transition-all"
          aria-label="返回"
        >
          <span className="material-symbols-outlined !text-xl font-bold">arrow_back_ios_new</span>
        </button>
        <h1 className="flex-1 text-center text-lg font-bold tracking-tight pr-10">添加新菜谱</h1>
      </div>

      <main className="pb-44 overflow-y-auto">
        {/* Photo Upload Placeholder */}
        <div className="p-4">
          {/* 隐藏的文件输入 */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          {/* 上传照片区域 */}
          <div 
            onClick={handlePhotoClick}
            className="group relative w-full aspect-[4/3] rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-3 overflow-hidden transition-all hover:border-primary/50 cursor-pointer"
          >
            {selectedImage ? (
              // 显示已选择的图片
              <div className="absolute inset-0">
                <img 
                  src={selectedImage} 
                  alt="预览" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-6">
                  <p className="text-white font-medium">点击更换照片</p>
                </div>
              </div>
            ) : (
              // 显示上传提示
              <>
                <div className="bg-primary/10 p-4 rounded-full">
                  <span className="material-symbols-outlined text-primary text-3xl">add_a_photo</span>
                </div>
                <div className="text-center">
                  <p className="font-bold text-sm">上传照片</p>
                  <p className="text-xs text-gray-500 mt-1">记录属于你家的味道</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Basic Info */}
        <div className="px-4 py-3">
          <label className="flex flex-col w-full">
            <p className="text-sm font-bold pb-2 text-primary uppercase tracking-wider">菜名</p>
            <input 
              className="form-input w-full rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary h-14 p-4 text-base font-medium" 
              placeholder="这道菜叫什么名字？"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>

        {/* Categories Section */}
        <div className="pt-4 px-4 space-y-5">
          <h3 className="text-sm font-bold text-primary uppercase tracking-wider">选择分类 (多选)</h3>
          
          {categoryGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="flex flex-wrap gap-2 items-center">
              {group.map(cat => (
                <button 
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`flex h-9 shrink-0 items-center justify-center rounded-full border px-4 text-sm font-medium transition-all ${
                    selectedCategories.includes(cat) 
                      ? 'bg-primary text-white border-primary shadow-sm' 
                      : 'bg-white border-gray-200 text-gray-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
              <button 
                onClick={() => addNewCategoryToGroup(groupIdx)}
                className="flex h-9 shrink-0 items-center justify-center rounded-full border border-dashed border-primary text-primary hover:bg-primary/5 px-4 text-sm font-medium transition-all active:scale-90"
                title="添加新分类"
              >
                <span className="material-symbols-outlined text-base mr-1">add</span>添加
              </button>
            </div>
          ))}
        </div>

        {/* Ingredients */}
        <div className="px-4 py-8">
          <div className="flex items-center justify-between pb-3">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider">食材清单</h3>
            <button 
              onClick={addIngredientRow}
              className="flex items-center gap-1 text-primary font-bold text-sm bg-primary/10 px-3 py-1 rounded-full active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-sm">add</span> 添加食材
            </button>
          </div>
          <div className="space-y-3">
            {ingredients.map((ing, idx) => (
              <div key={idx} className="flex gap-2 animate-fade-in">
                <input 
                  className="flex-[2] form-input rounded-xl border border-gray-200 h-12 px-4 text-sm" 
                  placeholder="食材" 
                  value={ing.name}
                  onChange={(e) => updateIngredient(idx, 'name', e.target.value)}
                />
                <input 
                  className="flex-1 form-input rounded-xl border border-gray-200 h-12 px-4 text-sm" 
                  placeholder="用量" 
                  value={ing.amount}
                  onChange={(e) => updateIngredient(idx, 'amount', e.target.value)}
                />
                <button 
                  onClick={() => removeIngredient(idx)}
                  className="text-gray-300 hover:text-red-400 flex items-center px-1 transition-colors"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cooking Steps */}
        <div className="px-4 py-4">
          <h3 className="text-sm font-bold pb-3 text-primary uppercase tracking-wider">烹饪步骤</h3>
          <textarea 
            className="form-textarea w-full rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary p-4 text-sm min-h-40 resize-none leading-relaxed" 
            placeholder="第一步：将五花肉洗净切块...&#10;第二步：冷水下锅..."
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
          ></textarea>
        </div>

        {/* Chef's Notes */}
        <div className="px-4 py-4">
          <label className="flex flex-col w-full">
            <p className="text-sm font-bold pb-2 text-primary uppercase tracking-wider">独门秘籍 / 小贴士</p>
            <input 
              className="form-input w-full rounded-xl border border-gray-200 h-12 px-4 text-sm" 
              placeholder="有什么特别要注意的吗？"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </label>
        </div>
      </main>

      {/* Footer Save Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto z-50">
        <div className="px-4 pb-12 pt-4 bg-white/80 backdrop-blur-xl border-t border-gray-100">
          <button 
            onClick={handleSave}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined">auto_stories</span>
            保存到家味
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;