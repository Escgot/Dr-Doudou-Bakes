import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '@/context/ProductContext';
import type { Product, Category, Badge } from '@/types';
import {
  Plus, Pencil, Trash2, Eye, EyeOff, Lock, LayoutDashboard,
  Package, Tags, Award, ShoppingBag, X, Save, ArrowLeft, BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRecipes } from '@/context/RecipeContext';

const ADMIN_PIN = '1234';

// ── PIN Gate ─────────────────────────────────────────────────────────

function PinGate({ onSuccess }: { onSuccess: () => void }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      onSuccess();
    } else {
      setError(true);
      setPin('');
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#16213e] rounded-2xl p-8 w-full max-w-sm shadow-2xl border border-white/5"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-white font-serif text-2xl mb-2">Admin Access</h1>
          <p className="text-gray-400 text-sm">Enter your PIN to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={pin}
            onChange={e => setPin(e.target.value)}
            placeholder="Enter PIN"
            maxLength={8}
            className={`w-full px-4 py-3 bg-[#0f3460] border rounded-xl text-white text-center text-lg tracking-[0.5em] placeholder:tracking-normal placeholder:text-gray-500 focus:outline-none focus:ring-2 transition-all ${
              error ? 'border-red-500 ring-red-500/20' : 'border-white/10 focus:ring-amber-500/30'
            }`}
            autoFocus
          />
          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm text-center">
              Incorrect PIN. Try again.
            </motion.p>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl font-medium hover:from-amber-600 hover:to-orange-700 transition-all"
          >
            Unlock Dashboard
          </button>
        </form>
        <Link to="/" className="flex items-center justify-center gap-2 text-gray-500 text-sm mt-6 hover:text-gray-300 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to site
        </Link>
      </motion.div>
    </div>
  );
}

// ── Tab Types ────────────────────────────────────────────────────────

type Tab = 'products' | 'recipes' | 'categories' | 'badges' | 'orders';

// ── Modal ────────────────────────────────────────────────────────────

function Modal({ open, onClose, title, children }: {
  open: boolean; onClose: () => void; title: string; children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={e => e.stopPropagation()}
          className="bg-[#16213e] rounded-2xl border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-white font-serif text-xl">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Product Form ─────────────────────────────────────────────────────

function ProductForm({
  initial,
  categories,
  badges,
  onSave,
  onCancel,
}: {
  initial?: Product;
  categories: Category[];
  badges: Badge[];
  onSave: (data: Omit<Product, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? '');
  const [slug, setSlug] = useState(initial?.slug ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [price, setPrice] = useState(initial?.price?.toString() ?? '');
  const [image, setImage] = useState(initial?.image ?? '');
  const [categoryId, setCategoryId] = useState(initial?.categoryId ?? categories[1]?.id ?? '');
  const [badgeIds, setBadgeIds] = useState<string[]>(initial?.badgeIds ?? []);
  const [ingredients, setIngredients] = useState(initial?.ingredients ?? '');
  const [dietaryNotes, setDietaryNotes] = useState(initial?.dietaryNotes?.join(', ') ?? '');
  const [isPublished, setIsPublished] = useState(initial?.isPublished ?? true);

  const autoSlug = (val: string) => val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const handleNameChange = (val: string) => {
    setName(val);
    if (!initial) setSlug(autoSlug(val));
  };

  const toggleBadge = (id: string) => {
    setBadgeIds(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name, slug, description,
      price: parseFloat(price) || 0,
      image, categoryId, badgeIds, ingredients,
      dietaryNotes: dietaryNotes.split(',').map(s => s.trim()).filter(Boolean),
      isPublished,
    });
  };

  const inputClass = "w-full px-4 py-3 bg-[#0f3460] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-sm";
  const labelClass = "text-gray-300 text-xs font-medium tracking-wider mb-2 block";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Product Name *</label>
          <input value={name} onChange={e => handleNameChange(e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Slug</label>
          <input value={slug} onChange={e => setSlug(e.target.value)} className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Price (TND) *</label>
          <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Category *</label>
          <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className={inputClass}>
            {categories.filter(c => c.slug !== 'all').map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className={labelClass}>Image Path / URL</label>
        <input value={image} onChange={e => setImage(e.target.value)} className={inputClass} placeholder="/images/desserts/example.jpg" />
        {image && (
          <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden border border-white/10">
            <img src={image} alt="preview" className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = 'none')} />
          </div>
        )}
      </div>
      <div>
        <label className={labelClass}>Description *</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} className={inputClass + ' resize-none'} rows={3} required />
      </div>
      <div>
        <label className={labelClass}>Ingredients</label>
        <textarea value={ingredients} onChange={e => setIngredients(e.target.value)} className={inputClass + ' resize-none'} rows={2} placeholder="Comma-separated ingredients..." />
      </div>
      <div>
        <label className={labelClass}>Dietary Notes</label>
        <input value={dietaryNotes} onChange={e => setDietaryNotes(e.target.value)} className={inputClass} placeholder="Contains: Gluten, Eggs, Dairy" />
      </div>
      <div>
        <label className={labelClass}>Badges</label>
        <div className="flex flex-wrap gap-2">
          {badges.map(badge => (
            <button
              key={badge.id}
              type="button"
              onClick={() => toggleBadge(badge.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                badgeIds.includes(badge.id)
                  ? 'text-white shadow-lg scale-105'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
              style={badgeIds.includes(badge.id) ? { backgroundColor: badge.color } : undefined}
            >
              {badge.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsPublished(!isPublished)}
          className={`relative w-12 h-6 rounded-full transition-colors ${isPublished ? 'bg-emerald-500' : 'bg-gray-600'}`}
        >
          <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${isPublished ? 'left-[26px]' : 'left-0.5'}`} />
        </button>
        <span className="text-gray-300 text-sm">{isPublished ? 'Published' : 'Draft'}</span>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl font-medium hover:from-amber-600 hover:to-orange-700 transition-all flex items-center justify-center gap-2">
          <Save className="w-4 h-4" /> {initial ? 'Update Product' : 'Create Product'}
        </button>
        <button type="button" onClick={onCancel} className="px-6 py-3 bg-white/5 text-gray-300 rounded-xl hover:bg-white/10 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}

// ── Recipe Form ──────────────────────────────────────────────────────

function RecipeForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}) {
  const [id, setId] = useState(initial?.id ?? '');
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? '');
  const [prepTime, setPrepTime] = useState(initial?.prepTime ?? '');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>(initial?.difficulty ?? 'Medium');
  const [servings, setServings] = useState(initial?.servings?.toString() ?? '4');
  const [translationsJson, setTranslationsJson] = useState(() => {
    if (initial) return JSON.stringify(initial.translations, null, 2);
    return JSON.stringify({
      EN: { title: "", description: "", category: "Cakes", tags: [], quote: "", ingredientGroups: [], steps: [] },
      FR: { title: "", description: "", category: "Cakes", tags: [], quote: "", ingredientGroups: [], steps: [] },
      AR: { title: "", description: "", category: "Cakes", tags: [], quote: "", ingredientGroups: [], steps: [] }
    }, null, 2);
  });
  const [jsonError, setJsonError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedTranslations = JSON.parse(translationsJson);
      setJsonError('');
      onSave({
        id: id || `recipe-${Date.now()}`,
        imageUrl,
        prepTime,
        difficulty,
        servings: parseInt(servings) || 4,
        translations: parsedTranslations
      });
    } catch (err) {
      setJsonError('Invalid JSON format in translations');
    }
  };

  const inputClass = "w-full px-4 py-3 bg-[#0f3460] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-sm";
  const labelClass = "text-gray-300 text-xs font-medium tracking-wider mb-2 block";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Recipe ID *</label>
          <input value={id} onChange={e => setId(e.target.value)} className={inputClass} required disabled={!!initial} placeholder="e.g. chocolate-cake" />
        </div>
        <div>
          <label className={labelClass}>Image URL *</label>
          <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} className={inputClass} required />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Prep Time *</label>
          <input value={prepTime} onChange={e => setPrepTime(e.target.value)} className={inputClass} required placeholder="e.g. 45m" />
        </div>
        <div>
          <label className={labelClass}>Difficulty *</label>
          <select value={difficulty} onChange={e => setDifficulty(e.target.value as any)} className={inputClass}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Servings *</label>
          <input type="number" value={servings} onChange={e => setServings(e.target.value)} className={inputClass} required />
        </div>
      </div>
      <div>
        <label className={labelClass}>Translations (JSON) *</label>
        <textarea value={translationsJson} onChange={e => setTranslationsJson(e.target.value)} className={inputClass + ' font-mono text-xs h-64'} required />
        {jsonError && <p className="text-red-400 text-xs mt-1">{jsonError}</p>}
        <p className="text-gray-500 text-xs mt-1">Must include EN, FR, and AR objects with title, description, category, tags, quote, ingredientGroups, and steps.</p>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl font-medium hover:from-amber-600 hover:to-orange-700 transition-all flex items-center justify-center gap-2">
          <Save className="w-4 h-4" /> {initial ? 'Update Recipe' : 'Create Recipe'}
        </button>
        <button type="button" onClick={onCancel} className="px-6 py-3 bg-white/5 text-gray-300 rounded-xl hover:bg-white/10 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}

// ── Main Admin Component ─────────────────────────────────────────────

export function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('products');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();
  const [editingBadge, setEditingBadge] = useState<Badge | undefined>();
  // Category / Badge inline forms
  const [newCatName, setNewCatName] = useState('');
  const [newBadgeLabel, setNewBadgeLabel] = useState('');
  const [newBadgeColor, setNewBadgeColor] = useState('#D4A574');

  const [editingRecipe, setEditingRecipe] = useState<any | undefined>();

  const {
    products, categories, badges, orders,
    addProduct, updateProduct, deleteProduct, togglePublish,
    addCategory, updateCategory, deleteCategory,
    addBadge, updateBadge, deleteBadge,
    updateOrderStatus, deleteOrder,
  } = useProducts();
  
  const { recipes, addRecipe, updateRecipe, deleteRecipe } = useRecipes();

  if (!authenticated) return <PinGate onSuccess={() => setAuthenticated(true)} />;

  const tabs: { key: Tab; label: string; icon: React.ElementType; count: number }[] = [
    { key: 'products', label: 'Products', icon: Package, count: products.length },
    { key: 'recipes', label: 'Recipes', icon: BookOpen, count: recipes.length },
    { key: 'categories', label: 'Categories', icon: Tags, count: categories.length },
    { key: 'badges', label: 'Badges', icon: Award, count: badges.length },
    { key: 'orders', label: 'Orders', icon: ShoppingBag, count: orders.length },
  ];

  const handleSaveProduct = (data: Omit<Product, 'id' | 'createdAt'>) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, data);
    } else {
      addProduct(data);
    }
    setModalOpen(false);
    setEditingProduct(undefined);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name: newCatName,
        slug: newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      });
      setEditingCategory(undefined);
    } else {
      addCategory({
        name: newCatName,
        slug: newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      });
    }
    setNewCatName('');
  };

  const handleAddBadge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBadgeLabel.trim()) return;
    if (editingBadge) {
      updateBadge(editingBadge.id, { label: newBadgeLabel, color: newBadgeColor });
      setEditingBadge(undefined);
    } else {
      addBadge({ label: newBadgeLabel, color: newBadgeColor });
    }
    setNewBadgeLabel('');
    setNewBadgeColor('#D4A574');
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-[#16213e] border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col lg:min-h-screen sticky top-0 z-30">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-serif text-sm font-semibold">Dr Doudou</h2>
              <p className="text-gray-500 text-xs">Admin Panel</p>
            </div>
          </div>
        </div>
        <nav className="p-4 flex flex-row overflow-x-auto lg:flex-col gap-2 lg:gap-1 custom-scrollbar lg:flex-1">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-shrink-0 lg:w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-amber-500/20 to-orange-600/20 text-amber-400 border border-amber-500/20'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                activeTab === tab.key ? 'bg-amber-500/20 text-amber-400' : 'bg-white/5 text-gray-500'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <Link to="/" className="flex items-center gap-2 text-gray-500 text-sm hover:text-gray-300 transition-colors px-4 py-2">
            <ArrowLeft className="w-4 h-4" /> Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 w-full overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* ── Products Tab ───────────────────────────────────────── */}
          {activeTab === 'products' && (
            <>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-white font-serif text-2xl sm:text-3xl">Products</h1>
                  <p className="text-gray-400 text-sm mt-1">Manage your dessert catalog</p>
                </div>
                <button
                  onClick={() => { setEditingProduct(undefined); setModalOpen(true); }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:from-amber-600 hover:to-orange-700 transition-all"
                >
                  <Plus className="w-4 h-4" /> Add Product
                </button>
              </div>
              <div className="bg-[#16213e] rounded-2xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto w-full">
                  <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left text-gray-400 text-xs font-medium tracking-wider px-6 py-4">Product</th>
                      <th className="text-left text-gray-400 text-xs font-medium tracking-wider px-6 py-4">Category</th>
                      <th className="text-left text-gray-400 text-xs font-medium tracking-wider px-6 py-4">Price</th>
                      <th className="text-left text-gray-400 text-xs font-medium tracking-wider px-6 py-4">Status</th>
                      <th className="text-right text-gray-400 text-xs font-medium tracking-wider px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => {
                      const cat = categories.find(c => c.id === product.categoryId);
                      return (
                        <tr key={product.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                                <img src={product.image} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <p className="text-white text-sm font-medium">{product.name}</p>
                                <p className="text-gray-500 text-xs mt-0.5">{product.slug}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-gray-300 text-sm">{cat?.name || '—'}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-white text-sm font-medium">{product.price.toFixed(2)} TND</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                              product.isPublished
                                ? 'bg-emerald-500/10 text-emerald-400'
                                : 'bg-gray-500/10 text-gray-400'
                            }`}>
                              {product.isPublished ? 'Published' : 'Draft'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-1">
                              <button onClick={() => togglePublish(product.id)} className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5" title={product.isPublished ? 'Unpublish' : 'Publish'}>
                                {product.isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                              <button onClick={() => handleEditProduct(product)} className="p-2 text-gray-400 hover:text-amber-400 transition-colors rounded-lg hover:bg-white/5" title="Edit">
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button onClick={() => { if (confirm('Delete this product?')) deleteProduct(product.id); }} className="p-2 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-white/5" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  </table>
                </div>
                {products.length === 0 && (
                  <div className="text-center py-16 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No products yet. Add your first product!</p>
                  </div>
                )}
              </div>

              <Modal open={modalOpen} onClose={() => { setModalOpen(false); setEditingProduct(undefined); }} title={editingProduct ? 'Edit Product' : 'Add New Product'}>
                <ProductForm
                  initial={editingProduct}
                  categories={categories}
                  badges={badges}
                  onSave={handleSaveProduct}
                  onCancel={() => { setModalOpen(false); setEditingProduct(undefined); }}
                />
              </Modal>
            </>
          )}

          {/* ── Recipes Tab ────────────────────────────────────────── */}
          {activeTab === 'recipes' && (
            <>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-white font-serif text-2xl sm:text-3xl">Recipes</h1>
                  <p className="text-gray-400 text-sm mt-1">Manage your recipe collection</p>
                </div>
                <button
                  onClick={() => { setEditingRecipe(undefined); setModalOpen(true); }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:from-amber-600 hover:to-orange-700 transition-all"
                >
                  <Plus className="w-4 h-4" /> Add Recipe
                </button>
              </div>
              <div className="bg-[#16213e] rounded-2xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto w-full">
                  <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left text-gray-400 text-xs font-medium tracking-wider px-6 py-4">Recipe</th>
                      <th className="text-left text-gray-400 text-xs font-medium tracking-wider px-6 py-4">Category</th>
                      <th className="text-left text-gray-400 text-xs font-medium tracking-wider px-6 py-4">Difficulty</th>
                      <th className="text-right text-gray-400 text-xs font-medium tracking-wider px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recipes.map(recipe => (
                      <tr key={recipe.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                              <img src={recipe.imageUrl} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-white text-sm font-medium">{recipe.translations.EN.title}</p>
                              <p className="text-gray-500 text-xs mt-0.5">{recipe.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-300 text-sm">{recipe.translations.EN.category}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-300 text-sm">{recipe.difficulty}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => { setEditingRecipe(recipe); setModalOpen(true); }} className="p-2 text-gray-400 hover:text-amber-400 transition-colors rounded-lg hover:bg-white/5" title="Edit">
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button onClick={() => { if (confirm('Delete this recipe?')) deleteRecipe(recipe.id); }} className="p-2 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-white/5" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  </table>
                </div>
                {recipes.length === 0 && (
                  <div className="text-center py-16 text-gray-500">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No recipes yet. Add your first recipe!</p>
                  </div>
                )}
              </div>

              <Modal open={modalOpen && (activeTab === 'recipes')} onClose={() => { setModalOpen(false); setEditingRecipe(undefined); }} title={editingRecipe ? 'Edit Recipe' : 'Add New Recipe'}>
                <RecipeForm
                  initial={editingRecipe}
                  onSave={(data) => {
                    if (editingRecipe) updateRecipe(data.id, data);
                    else addRecipe(data);
                    setModalOpen(false);
                  }}
                  onCancel={() => { setModalOpen(false); setEditingRecipe(undefined); }}
                />
              </Modal>
            </>
          )}

          {/* ── Categories Tab ─────────────────────────────────────── */}
          {activeTab === 'categories' && (
            <>
              <div className="mb-8">
                <h1 className="text-white font-serif text-2xl sm:text-3xl">Categories</h1>
                <p className="text-gray-400 text-sm mt-1">Organize your products into categories</p>
              </div>
              <div className="bg-[#16213e] rounded-2xl border border-white/5 p-4 sm:p-6 overflow-hidden">
                <form onSubmit={handleAddCategory} className="flex flex-col sm:flex-row gap-3 mb-6">
                  <input
                    value={newCatName}
                    onChange={e => setNewCatName(e.target.value)}
                    placeholder="Category name..."
                    className="flex-1 px-4 py-3 bg-[#0f3460] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-sm"
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-5 py-3 rounded-xl text-sm font-medium hover:from-amber-600 hover:to-orange-700 transition-all">
                      <Plus className="w-4 h-4" /> {editingCategory ? 'Update' : 'Add'}
                    </button>
                    {editingCategory && (
                      <button type="button" onClick={() => { setEditingCategory(undefined); setNewCatName(''); }} className="flex-1 sm:flex-none px-4 py-3 bg-white/5 text-gray-300 rounded-xl hover:bg-white/10 transition-colors text-sm">
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <div key={cat.id} className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/[0.02] transition-colors group">
                      <div>
                        <span className="text-white text-sm font-medium">{cat.name}</span>
                        <span className="text-gray-500 text-xs ml-3">/{cat.slug}</span>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setEditingCategory(cat); setNewCatName(cat.name); }} className="p-2 text-gray-400 hover:text-amber-400 transition-colors rounded-lg hover:bg-white/5">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        {cat.slug !== 'all' && (
                          <button onClick={() => { if (confirm('Delete category?')) deleteCategory(cat.id); }} className="p-2 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-white/5">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── Badges Tab ─────────────────────────────────────────── */}
          {activeTab === 'badges' && (
            <>
              <div className="mb-8">
                <h1 className="text-white font-serif text-2xl sm:text-3xl">Badges</h1>
                <p className="text-gray-400 text-sm mt-1">Create labels to highlight product features</p>
              </div>
              <div className="bg-[#16213e] rounded-2xl border border-white/5 p-4 sm:p-6 overflow-hidden">
                <form onSubmit={handleAddBadge} className="flex flex-col sm:flex-row gap-3 mb-6">
                  <div className="flex gap-2 flex-1">
                    <input
                      value={newBadgeLabel}
                      onChange={e => setNewBadgeLabel(e.target.value)}
                      placeholder="Badge label..."
                      className="flex-1 px-4 py-3 bg-[#0f3460] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-sm w-full"
                    />
                    <input
                      type="color"
                      value={newBadgeColor}
                      onChange={e => setNewBadgeColor(e.target.value)}
                      className="w-12 h-12 rounded-xl border border-white/10 bg-transparent cursor-pointer flex-shrink-0"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-5 py-3 rounded-xl text-sm font-medium hover:from-amber-600 hover:to-orange-700 transition-all">
                      <Plus className="w-4 h-4" /> {editingBadge ? 'Update' : 'Add'}
                    </button>
                    {editingBadge && (
                      <button type="button" onClick={() => { setEditingBadge(undefined); setNewBadgeLabel(''); setNewBadgeColor('#D4A574'); }} className="flex-1 sm:flex-none px-4 py-3 bg-white/5 text-gray-300 rounded-xl hover:bg-white/10 transition-colors text-sm">
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
                <div className="flex flex-wrap gap-3">
                  {badges.map(badge => (
                    <div key={badge.id} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] group hover:bg-white/[0.05] transition-colors">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: badge.color }} />
                      <span className="text-white text-sm">{badge.label}</span>
                      <button onClick={() => { setEditingBadge(badge); setNewBadgeLabel(badge.label); setNewBadgeColor(badge.color); }} className="p-1 text-gray-500 hover:text-amber-400 transition-colors opacity-0 group-hover:opacity-100">
                        <Pencil className="w-3 h-3" />
                      </button>
                      <button onClick={() => { if (confirm('Delete badge?')) deleteBadge(badge.id); }} className="p-1 text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── Orders Tab ─────────────────────────────────────────── */}
          {activeTab === 'orders' && (
            <>
              <div className="mb-8">
                <h1 className="text-white font-serif text-2xl sm:text-3xl">Orders</h1>
                <p className="text-gray-400 text-sm mt-1">View and manage customer orders</p>
              </div>
              <div className="bg-[#16213e] rounded-2xl border border-white/5 overflow-hidden">
                {orders.length > 0 ? (
                  <div className="overflow-x-auto w-full">
                    <table className="w-full min-w-[1000px]">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left text-gray-400 text-xs font-medium tracking-wider px-6 py-4">Order ID</th>
                        <th className="text-left text-gray-400 text-xs font-medium tracking-wider px-6 py-4">Customer</th>
                        <th className="text-left text-gray-400 text-xs font-medium tracking-wider px-6 py-4">Items</th>
                        <th className="text-left text-gray-400 text-xs font-medium tracking-wider px-6 py-4">Total</th>
                        <th className="text-left text-gray-400 text-xs font-medium tracking-wider px-6 py-4">Delivery</th>
                        <th className="text-left text-gray-400 text-xs font-medium tracking-wider px-6 py-4">Status</th>
                        <th className="text-right text-gray-400 text-xs font-medium tracking-wider px-6 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4 text-gray-300 text-sm font-mono">{order.id.slice(0, 12)}</td>
                          <td className="px-6 py-4">
                            <p className="text-white text-sm font-medium">{order.customer.name}</p>
                            <p className="text-gray-400 text-xs mt-1">{order.customer.phone}</p>
                            <p className="text-gray-400 text-xs">{order.customer.email}</p>
                            <p className="text-gray-500 text-xs mt-2 line-clamp-2" title={order.customer.address}>{order.customer.address}</p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1 max-h-24 overflow-y-auto pr-2 custom-scrollbar">
                              {order.items.map((item, i) => (
                                <div key={i} className="text-gray-300 text-xs flex items-start gap-1">
                                  <span className="text-white font-medium">{item.quantity}x</span> 
                                  <span className="line-clamp-1">{item.product.name}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-white text-sm font-medium">{order.total.toFixed(2)} TND</td>
                          <td className="px-6 py-4 text-gray-300 text-sm">{new Date(order.deliveryDate).toLocaleDateString()}</td>
                          <td className="px-6 py-4">
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                              className={`bg-transparent outline-none cursor-pointer appearance-none text-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                order.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400' :
                                order.status === 'pending' ? 'bg-amber-500/10 text-amber-400' :
                                order.status === 'delivered' ? 'bg-blue-500/10 text-blue-400' :
                                'bg-gray-500/10 text-gray-400'
                              }`}
                            >
                              <option value="pending" className="bg-[#16213e] text-white">Pending</option>
                              <option value="confirmed" className="bg-[#16213e] text-white">Confirmed</option>
                              <option value="delivered" className="bg-[#16213e] text-white">Delivered</option>
                              <option value="cancelled" className="bg-[#16213e] text-white">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-1">
                              <button onClick={() => { if (confirm('Delete this order?')) deleteOrder(order.id); }} className="p-2 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-white/5" title="Delete Order">
                                <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-16 text-gray-500">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No orders yet. Orders will appear here when customers check out.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
