import React, { useState, useMemo } from 'react';
import { Modal } from './Modal';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ChevronDown, ChevronRight, Minus, Plus, Search } from 'lucide-react';
import { catalogData, Product } from '../data/catalog';

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CatalogModal({ isOpen, onClose }: CatalogModalProps) {
  const [name, setName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Utensílios']));

  const allProducts = useMemo(() => {
    const products: Record<string, Product> = {};
    catalogData.forEach(cat => {
      cat.items.forEach(item => products[item.id] = item);
      cat.subcategories?.forEach(sub => {
        sub.items.forEach(item => products[item.id] = item);
      });
    });
    return products;
  }, []);

  const filteredCatalogData = useMemo(() => {
    if (!searchQuery.trim()) return catalogData;
    const lowerQuery = searchQuery.toLowerCase();
    
    return catalogData.map(category => {
      const filteredItems = category.items.filter(item => item.name.toLowerCase().includes(lowerQuery));
      const filteredSubcategories = category.subcategories?.map(sub => {
        return {
          ...sub,
          items: sub.items.filter(item => item.name.toLowerCase().includes(lowerQuery))
        };
      }).filter(sub => sub.items.length > 0);

      return {
        ...category,
        items: filteredItems,
        subcategories: filteredSubcategories?.length ? filteredSubcategories : undefined
      };
    }).filter(category => category.items.length > 0 || (category.subcategories && category.subcategories.length > 0));
  }, [searchQuery]);

  const updateQuantity = (productId: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[productId] || 0;
      const next = Math.max(0, current + delta);
      const updated = { ...prev };
      if (next === 0) {
        delete updated[productId];
      } else {
        updated[productId] = next;
      }
      return updated;
    });
  };

  const toggleCategory = (title: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedCategories(newExpanded);
  };

  const calculateTotal = () => {
    let total = 0;
    Object.entries(quantities).forEach(([id, qty]) => {
      if (allProducts[id]) {
        total += allProducts[id].price * qty;
      }
    });
    return total;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = '5542998714997';
    
    let productsText = 'Nenhum produto selecionado, gostaria de mais informações.';
    if (Object.keys(quantities).length > 0) {
      const selectedNames = Object.entries(quantities).map(([id, qty]) => {
        const prod = allProducts[id];
        const itemTotal = prod.price * qty;
        return `- ${qty}x ${prod.name} (R$ ${itemTotal.toFixed(2).replace('.', ',')})`;
      });
      const total = calculateTotal();
      productsText = `*Produtos de interesse:*\n${selectedNames.join('\n')}\n\n*Total Estimado:* R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    const message = `Olá! Meu nome é *${name}*.\n\nEstou entrando em contato através do catálogo.\n\n${productsText}`;
    
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const renderProduct = (product: Product) => {
    const qty = quantities[product.id] || 0;
    const isSelected = qty > 0;
    return (
      <div 
        key={product.id}
        className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
          isSelected 
            ? 'bg-[#bf953f]/10 border-[#bf953f] shadow-[0_0_10px_rgba(191,149,63,0.2)]' 
            : 'bg-black/40 border-white/5 hover:border-[#bf953f]/30'
        }`}
      >
        <div className="flex-1 pr-2">
          <span className="text-sm text-gray-200 leading-tight block mb-1">{product.name}</span>
          <span className="text-xs font-semibold text-[#D4AF37]">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
        </div>
        
        <div className="flex items-center space-x-2 shrink-0 bg-black/50 rounded-lg p-1 border border-white/10">
          <button 
            type="button"
            onClick={() => updateQuantity(product.id, -1)}
            className="w-6 h-6 flex items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Minus size={14} />
          </button>
          <span className="w-5 text-center text-sm font-semibold text-white">{qty}</span>
          <button 
            type="button"
            onClick={() => updateQuantity(product.id, 1)}
            className="w-6 h-6 flex items-center justify-center rounded-md text-[#bf953f] hover:bg-[#bf953f]/20 transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Catálogo de Produtos">
      <form onSubmit={handleSubmit} className="flex flex-col min-h-0 h-full">
        <div className="shrink-0 mb-3 sm:mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">Nome</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/50 border border-[#bf953f]/30 rounded-xl px-4 py-2 sm:py-3 text-white focus:outline-none focus:border-[#bf953f] transition-colors"
            placeholder="Seu nome"
          />
        </div>
        
        <div className="flex-1 min-h-0 flex flex-col mb-3 sm:mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2 shrink-0">Selecione os produtos:</label>
          <div className="relative mb-3 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar produtos..."
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#bf953f] transition-colors"
            />
          </div>
          <div className="space-y-2 overflow-y-auto pr-2 custom-scrollbar flex-1">
            {filteredCatalogData.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">Nenhum produto encontrado.</p>
            )}
            {filteredCatalogData.map((category) => {
              const isExpanded = searchQuery.trim() !== '' || expandedCategories.has(category.title);
              return (
                <div key={category.title} className="bg-black/30 rounded-xl border border-white/5 overflow-hidden shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.title)}
                    className="w-full flex items-center justify-between p-3 sm:p-4 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="font-semibold text-[#F9E498] uppercase tracking-wider text-xs sm:text-sm">{category.title}</span>
                    {isExpanded ? <ChevronDown size={18} className="text-[#bf953f]" /> : <ChevronRight size={18} className="text-[#bf953f]" />}
                  </button>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-2 sm:p-3 pt-0 space-y-2">
                          {category.items.map(renderProduct)}
                          
                          {category.subcategories?.map(sub => (
                            <div key={sub.title} className="mt-3 sm:mt-4 first:mt-0">
                              <h4 className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 pl-1">
                                {sub.title}
                              </h4>
                              <div className="space-y-2 pl-2 border-l border-white/10">
                                {sub.items.map(renderProduct)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <div className="shrink-0 pt-3 sm:pt-4 border-t border-white/10 mt-auto">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <span className="text-sm text-gray-400">Total parcial:</span>
            <span className="text-lg font-bold text-gradient">
              R$ {calculateTotal().toFixed(2).replace('.', ',')}
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#bf953f] text-black font-semibold rounded-xl px-4 py-2.5 sm:py-3 flex items-center justify-center space-x-2 shadow-gold-hover transition-all text-sm sm:text-base"
          >
            <ShoppingBag size={18} className="sm:w-5 sm:h-5" />
            <span>Confirmar Pedido</span>
          </motion.button>
        </div>
      </form>
    </Modal>
  );
}
