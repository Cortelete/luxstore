import React, { useState } from 'react';
import { Modal } from './Modal';
import { motion } from 'motion/react';
import { Sparkles, MessageCircle } from 'lucide-react';

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeveloperModal({ isOpen, onClose }: DeveloperModalProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = '5541988710303';
    const message = `Olá, vi o link da LuxStore e quero um site igual! Meu nome é ${name}.`;
    
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Desenvolvedor">
      <div className="flex flex-col items-center mb-6">
        <Sparkles className="text-[#bf953f] w-12 h-12 mb-2 animate-pulse" />
        <h3 className="text-xl font-serif text-gradient text-center">InteligenciArte.IA</h3>
        <a 
          href="https://www.instagram.com/inteligenciarte.ia" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-gray-400 hover:text-[#bf953f] mt-2 transition-colors underline underline-offset-4"
        >
          @inteligenciarte.ia
        </a>
      </div>

      <div className="bg-black/40 border border-[#bf953f]/20 rounded-xl p-4 mb-6">
        <p className="text-sm text-gray-300 text-center italic">
          Esta é uma mensagem direta para o desenvolvedor do site.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Seu Nome</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/50 border border-[#bf953f]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#bf953f] transition-colors"
            placeholder="Como podemos te chamar?"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#bf953f] text-black font-semibold rounded-xl px-4 py-3 flex items-center justify-center space-x-2 shadow-gold-hover transition-all"
        >
          <MessageCircle size={20} />
          <span>Quer um site incrível como esse? Fale comigo! 🚀</span>
        </motion.button>
      </form>
    </Modal>
  );
}
