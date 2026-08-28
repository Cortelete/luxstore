import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Instagram, ShoppingBag, MessageCircle, Star, Sparkles } from 'lucide-react';

import { CatalogModal } from './components/CatalogModal';
import { ContactModal } from './components/ContactModal';
import { RatingModal } from './components/RatingModal';
import { DeveloperModal } from './components/DeveloperModal';
import { AboutModal } from './components/AboutModal';

export default function App() {
  const [modals, setModals] = useState({
    catalog: false,
    contact: false,
    rating: false,
    developer: false,
    about: false,
  });
  
  const [isSpinning, setIsSpinning] = useState(false);
  const spinTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const handleLogoClick = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    
    if (spinTimeoutRef.current) {
      clearTimeout(spinTimeoutRef.current);
    }
    
    // Animation takes 1s, we open modal slightly before it finishes
    spinTimeoutRef.current = setTimeout(() => {
      setIsSpinning(false);
      openModal('about');
    }, 900);
  };

  const links = [
    {
      title: 'Instagram',
      icon: <Instagram size={20} />,
      action: () => window.open('https://www.instagram.com/luxstorebeauty', '_blank'),
    },
    {
      title: 'Contato',
      icon: <MessageCircle size={20} />,
      action: () => openModal('contact'),
    },
    {
      title: 'Avaliação',
      icon: <Star size={20} />,
      action: () => openModal('rating'),
    }
  ];

  return (
    <div className="bg-animated-gradient min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[360px] bg-card-glass p-6 text-center relative overflow-hidden flex flex-col items-center"
      >
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#bf953f]/20 rounded-full blur-[60px]" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#bf953f]/10 rounded-full blur-[60px]" />

        {/* Profile Section */}
        <div className="relative z-10 flex flex-col items-center w-full">
          <div 
            onClick={handleLogoClick}
            className={`cursor-pointer p-1 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-transform mb-4 ${isSpinning ? 'animate-coin-spin' : 'hover:scale-105'}`}
          >
            <div className="w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] flex items-center justify-center">
              <img src="/logo.png" alt="LuxStore" className="w-full h-full object-contain" />
            </div>
          </div>
          
          <div className="mb-6 px-2 w-full">
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">
              A escolha de quem transforma beleza em excelência
            </p>
          </div>
        </div>

        {/* Links Section */}
        <div className="w-full space-y-3 z-10 flex flex-col">
          {links.map((link, index) => (
            <motion.button
              key={link.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(212, 175, 55, 0.1)", borderColor: "#D4AF37", y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={link.action}
              className="w-full bg-black/40 border border-[#d4af37]/15 rounded-xl px-4 py-2.5 flex items-center transition-all shadow-gold-hover group"
            >
              <div className="flex-shrink-0 w-5 flex justify-center items-center opacity-80 text-white">
                {link.icon}
              </div>
              
              <span className="flex-grow text-center text-[13px] text-white tracking-[1px] uppercase font-semibold">
                {link.title}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Categories subtitle */}
        <div className="mt-4 mb-2 space-y-1 w-full z-10 text-center">
          <p className="text-[9px] text-gray-500 uppercase font-light">Lash & Brow Professional</p>
        </div>

        {/* Footer Section */}
        <div className="w-full mt-4 z-10 flex flex-col items-center justify-center">
          <button 
            onClick={() => openModal('developer')}
            className="flex items-center space-x-1 text-[10px] text-white/40 tracking-[0.5px] hover:text-[#D4AF37] transition-colors"
          >
            <span>Desenvolvido por InteligenciArte.IA ✨</span>
          </button>
        </div>
      </motion.div>

      {/* Modals */}
      <CatalogModal isOpen={modals.catalog} onClose={() => closeModal('catalog')} />
      <ContactModal isOpen={modals.contact} onClose={() => closeModal('contact')} />
      <RatingModal isOpen={modals.rating} onClose={() => closeModal('rating')} />
      <DeveloperModal isOpen={modals.developer} onClose={() => closeModal('developer')} />
      <AboutModal isOpen={modals.about} onClose={() => closeModal('about')} />
    </div>
  );
}

