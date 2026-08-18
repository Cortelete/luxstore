import React, { useState } from 'react';
import { Modal } from './Modal';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('lash');
  const [messageText, setMessageText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = '5542998714997';
    
    let subjectText = '';
    if (subject === 'lash') subjectText = 'Produtos Lash';
    else if (subject === 'brow') subjectText = 'Produtos Brow Design';
    else subjectText = 'Outro Assunto';

    const message = `Olá! Meu nome é *${name}*.\n\nAssunto: *${subjectText}*\n\nMensagem:\n${messageText}`;
    
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Entre em Contato">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Nome</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/50 border border-[#bf953f]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#bf953f] transition-colors"
            placeholder="Seu nome"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Assunto</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-black/50 border border-[#bf953f]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#bf953f] transition-colors appearance-none"
          >
            <option value="lash" className="bg-[#1a1a1a]">Produtos Lash</option>
            <option value="brow" className="bg-[#1a1a1a]">Produtos Brow Design</option>
            <option value="outro" className="bg-[#1a1a1a]">Outro Assunto</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">O que procura?</label>
          <textarea
            required
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            rows={3}
            className="w-full bg-black/50 border border-[#bf953f]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#bf953f] transition-colors resize-none"
            placeholder="Escreva sua mensagem aqui..."
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#bf953f] text-black font-semibold rounded-xl px-4 py-3 flex items-center justify-center space-x-2 shadow-gold-hover transition-all"
        >
          <MessageCircle size={20} />
          <span>Enviar para WhatsApp</span>
        </motion.button>
      </form>
    </Modal>
  );
}
