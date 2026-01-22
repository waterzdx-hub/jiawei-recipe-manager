import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Recipe, Page } from '../types';

interface FlyingIcon {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
}

interface HomeProps {
  recipes: Recipe[];
  categories: string[];
  onReorderCategories: (newCats: string[]) => void;
  onNavigate: (page: Page, recipeId?: string) => void;
  onAddToCart: (recipeId: string) => void;
  cartCount: number;
}

const Home: React.FC<HomeProps> = ({ recipes, categories, onReorderCategories, onNavigate, onAddToCart, cartCount }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [flyingIcons, setFlyingIcons] = useState<FlyingIcon[]>([]);
  const [isCartPopping, setIsCartPopping] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const isManualScrolling = useRef(false);


  // Group recipes by category for the main list
  const recipesByCategory = useMemo(() => {
    const grouped: Record<string, Recipe[]> = {};
    categories.forEach(cat => {
      grouped[cat] = recipes.filter(r => r.categories.includes(cat));
    });
    return grouped;
  }, [recipes, categories]);

  // Search results (flat list)
  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    return recipes.filter(r => 
      r.name.toLowerCase().includes(query) || 
      r.tags.some(t => t.toLowerCase().includes(query)) ||
      r.categories.some(c => c.toLowerCase().includes(query))
    );
  }, [recipes, searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  // Intersection Observer for ScrollSpy
  useEffect(() => {
    if (isSearching || isEditMode) return;

    const observerOptions = {
      root: scrollContainerRef.current,
      rootMargin: '-10% 0px -80% 0px', 
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      if (isManualScrolling.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const category = entry.target.getAttribute('data-category');
          if (category) setActiveCategory(category);
        }
      });
    }, observerOptions);

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [recipesByCategory, isSearching, isEditMode]);

  const handleSidebarClick = (cat: string) => {
    if (isEditMode) return;
    setActiveCategory(cat);
    const element = sectionRefs.current[cat];
    if (element) {
      isManualScrolling.current = true;
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        isManualScrolling.current = false;
      }, 800);
    }
    if (isSearching) setSearchQuery('');
  };

  const handleMoveCategory = async (index: number, direction: 'up' | 'down') => {
    const newCats = [...categories];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newCats.length) return;
    
    [newCats[index], newCats[targetIndex]] = [newCats[targetIndex], newCats[index]];
    // Update local state optimistically
    setData(prev => prev ? { ...prev, categories: newCats } : null);
    // Call the API to persist the change
    try {
      await apiService.reorderCategories(newCats);
      // The parent might need to update its state too
      onReorderCategories(newCats);
    } catch (err) {
      // If the API call fails, revert the change
      setData(data); 
      alert('排序更新失败，请重试。');
    }
  };

  const handleAddToCart = (e: React.MouseEvent, recipeId: string) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const screenWidth = Math.min(window.innerWidth, 480);
    const screenXOffset = (window.innerWidth - screenWidth) / 2;
    const targetX = screenXOffset + (screenWidth * 0.833) - startX;
    const targetY = (window.innerHeight - 60) - startY;

    const newIcon: FlyingIcon = {
      id: Date.now(),
      x: startX,
      y: startY,
      targetX,
      targetY
    };

    setFlyingIcons(prev => [...prev, newIcon]);
    onAddToCart(recipeId);

    setTimeout(() => {
      setIsCartPopping(true);
      setTimeout(() => setIsCartPopping(false), 300);
    }, 600);

    setTimeout(() => {
      setFlyingIcons(prev => prev.filter(icon => icon.id !== newIcon.id));
    }, 800);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden relative">
      {/* Flying Particles Container */}
      {flyingIcons.map(icon => (
        <div
          key={icon.id}
          className="fixed z-[9999] pointer-events-none animate-fly"
          style={{
            left: icon.x,
            top: icon.y,
            '--target-x': `${icon.targetX}px`,
            '--target-y': `${icon.targetY}px`
          } as React.CSSProperties}
        >
          <div className="size-6 bg-primary text-white rounded-full flex items-center justify-center shadow-lg border border-white/50">
            <span className="material-symbols-outlined text-sm font-bold">add</span>
          </div>
        </div>
      ))}

      {/* Header */}
      <header className="flex items-center px-4 py-3 justify-between bg-white shrink-0 border-b border-gray-100 z-10">
        <div className="text-primary flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <span className="material-symbols-outlined text-[18px] material-symbols-fill">restaurant_menu</span>
        </div>
        <h2 className="text-lg font-bold leading-tight flex-1 px-3">家味</h2>
        <button 
          onClick={() => onNavigate(Page.Add)}
          className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-primary text-white active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
        </button>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-2 bg-white shrink-0">
        <div className="flex w-full items-stretch rounded-full h-10 bg-[#f3ebe7] overflow-hidden border border-transparent focus-within:border-primary/30">
          <div className="text-[#9a634c] flex items-center justify-center pl-4">
            <span className="material-symbols-outlined text-[18px]">search</span>
          </div>
          <input 
            className="flex w-full border-none bg-transparent focus:ring-0 text-sm font-normal placeholder:text-[#9a634c] px-3" 
            placeholder="想吃什么？搜索所有菜谱..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {isSearching && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-[#9a634c] flex items-center justify-center pr-4"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-20 bg-sidebar-light flex flex-col border-r border-gray-100 shrink-0 relative overflow-hidden">
          {/* Scrollable labels */}
          <div className="flex-1 overflow-y-auto hide-scrollbar pb-32">
            {categories.map((cat, idx) => (
              <div key={cat} className="relative group">
                <button
                  onClick={() => handleSidebarClick(cat)}
                  disabled={isEditMode}
                  className={`w-full py-5 px-1 text-center text-sm transition-all relative ${
                    !isEditMode && activeCategory === cat 
                    ? 'bg-white text-primary font-bold border-l-4 border-primary' 
                    : 'text-[#9a634c] font-medium'
                  } ${isEditMode ? 'opacity-50 grayscale' : ''}`}
                >
                  {cat}
                </button>
                {isEditMode && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 z-20 bg-primary/10">
                    <button 
                      onClick={() => handleMoveCategory(idx, 'up')}
                      disabled={idx === 0}
                      className="size-6 bg-white rounded-full flex items-center justify-center text-primary disabled:opacity-30 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-sm">expand_less</span>
                    </button>
                    <button 
                      onClick={() => handleMoveCategory(idx, 'down')}
                      disabled={idx === categories.length - 1}
                      className="size-6 bg-white rounded-full flex items-center justify-center text-primary disabled:opacity-30 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-sm">expand_more</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Edit Sort Toggle - Sticky at Bottom of Sidebar */}
          <div className="absolute bottom-24 left-0 right-0 px-2">
            <button 
              onClick={() => setIsEditMode(!isEditMode)}
              className={`w-full h-10 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 ${isEditMode ? 'bg-primary text-white' : 'bg-white text-[#9a634c] border border-gray-200'}`}
              title={isEditMode ? '完成排序' : '手动排序'}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isEditMode ? 'check' : 'sort'}
              </span>
            </button>
          </div>
        </aside>

        {/* Recipe List */}
        <main 
          ref={scrollContainerRef}
          className="flex-1 bg-white overflow-y-auto hide-scrollbar scroll-smooth"
        >
          <div className="px-4 pb-32">
            {isSearching ? (
              <>
                <div className="sticky top-0 bg-white py-3 z-10">
                  <h3 className="text-sm font-bold text-gray-800">搜索结果 ({searchResults.length})</h3>
                </div>
                <div className="flex flex-col gap-1 mt-2">
                  {searchResults.length > 0 ? searchResults.map(recipe => (
                    <RecipeItem key={recipe.id} recipe={recipe} onNavigate={onNavigate} onAddToCart={handleAddToCart} />
                  )) : (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                      <span className="material-symbols-outlined text-4xl">search_off</span>
                      <p className="mt-2 text-sm text-center px-4">未找到匹配的菜谱</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              categories.map(cat => {
                const catRecipes = recipesByCategory[cat];
                if (!catRecipes || catRecipes.length === 0) return null;
                
                return (
                  <section 
                    key={cat} 
                    data-category={cat}
                    ref={el => { sectionRefs.current[cat] = el; }}
                    className="pt-2 mb-10"
                  >
                    <div className="sticky top-0 bg-white py-3 z-10 mb-2">
                      <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                        {cat}
                      </h3>
                    </div>
                    <div className="flex flex-col gap-1">
                      {catRecipes.map(recipe => (
                        <RecipeItem key={`${cat}-${recipe.id}`} recipe={recipe} onNavigate={onNavigate} onAddToCart={handleAddToCart} />
                      ))}
                    </div>
                  </section>
                );
              })
            )}
            
            {!isSearching && recipes.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <span className="material-symbols-outlined text-4xl">inventory_2</span>
                <p className="mt-2 text-sm text-center px-4">还没有菜谱哦，快去添加吧！</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] h-16 bg-white/95 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-around px-2 z-[100] border border-gray-100">
        <button onClick={() => onNavigate(Page.Home)} className="flex flex-col items-center justify-center flex-1 text-primary gap-0.5">
          <span className="material-symbols-outlined material-symbols-fill">home</span>
          <span className="text-[10px] font-medium">家味</span>
        </button>
        <button 
          onClick={() => onNavigate(Page.Add)}
          className="flex flex-col items-center justify-center flex-1 text-[#9a634c] hover:text-primary transition-colors gap-0.5"
        >
          <span className="material-symbols-outlined">add_circle</span>
          <span className="text-[10px] font-medium">添加</span>
        </button>
        <button 
          onClick={() => onNavigate(Page.Cart)}
          className={`flex flex-col items-center justify-center flex-1 text-[#9a634c] hover:text-primary transition-all gap-0.5 relative ${isCartPopping ? 'animate-cart-pop text-primary' : ''}`}
        >
          <span className={`material-symbols-outlined ${isCartPopping ? 'material-symbols-fill' : ''}`}>shopping_cart</span>
          <span className="text-[10px] font-medium">已点</span>
          {cartCount > 0 && (
            <span className="absolute top-2 right-4 bg-primary text-white text-[10px] font-bold size-4 flex items-center justify-center rounded-full transition-transform scale-100">
              {cartCount}
            </span>
          )}
        </button>
      </nav>
    </div>
  );
};

interface RecipeItemProps {
  recipe: Recipe;
  onNavigate: (page: Page, recipeId?: string) => void;
  onAddToCart: (e: React.MouseEvent, recipeId: string) => void;
}

const RecipeItem: React.FC<RecipeItemProps> = ({ recipe, onNavigate, onAddToCart }) => (
  <div className="flex gap-5 items-center animate-fade-in group py-3">
    <div 
      onClick={() => onNavigate(Page.Detail, recipe.id)}
      className="w-20 h-20 rounded-full bg-cover bg-center shrink-0 shadow-sm cursor-pointer border border-gray-100 overflow-hidden" 
      style={{ backgroundImage: `url("${recipe.image}")` }}
    ></div>
    <div className="flex flex-1 items-center justify-between py-1">
      <div onClick={() => onNavigate(Page.Detail, recipe.id)} className="cursor-pointer flex-1">
        <h4 className="font-bold text-[17px] leading-tight text-gray-900 group-hover:text-primary transition-colors">{recipe.name}</h4>
      </div>
      <div className="shrink-0 ml-4">
        <button 
          onClick={(e) => onAddToCart(e, recipe.id)}
          className="size-8 flex items-center justify-center bg-primary text-white rounded-full active:scale-90 transition-transform shadow-md hover:bg-primary/90"
        >
          <span className="material-symbols-outlined text-[20px] font-bold">add</span>
        </button>
      </div>
    </div>
  </div>
);

export default Home;
