import React, { useState } from 'react';
import { Modal } from './Modal';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Send } from 'lucide-react';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RatingModal({ isOpen, onClose }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
    if (selectedRating === 5) {
      // Redirect to Google Review page (placeholder)
      alert('Em breve: Redirecionando para a página de avaliação do Google...');
      onClose();
    } else {
      setShowFeedbackForm(true);
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Use formsubmit placeholder
    const emailAction = `https://formsubmit.co/your-email@example.com`; // Will be replaced later
    
    // Simulating form submit for now
    alert('Obrigado pelo seu feedback! Vamos melhorar.');
    onClose();
    
    // Reset state after close delay
    setTimeout(() => {
      setRating(0);
      setShowFeedbackForm(false);
      setFeedback('');
    }, 500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Avalie nossa loja">
      <div className="flex flex-col items-center">
        {!showFeedbackForm ? (
          <div className="py-8">
            <p className="text-gray-300 text-center mb-6">
              Sua opinião é muito importante para nós. Como foi sua experiência?
            </p>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    size={40}
                    className={`transition-all duration-300 ${
                      (hoverRating || rating) >= star
                        ? 'fill-[#bf953f] text-[#bf953f] scale-110 drop-shadow-[0_0_8px_rgba(191,149,63,0.5)]'
                        : 'text-gray-600 hover:text-gray-400'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleFeedbackSubmit}
            className="w-full space-y-4"
          >
            <div className="text-center mb-4">
              <p className="text-gray-300">
                Notamos que você avaliou com {rating} estrela{rating > 1 ? 's' : ''}.
              </p>
              <p className="text-[#bf953f] font-medium mt-1">
                Como podemos melhorar?
              </p>
            </div>
            
            <textarea
              required
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              className="w-full bg-black/50 border border-[#bf953f]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#bf953f] transition-colors resize-none"
              placeholder="Conte-nos o que houve..."
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#bf953f] text-black font-semibold rounded-xl px-4 py-3 flex items-center justify-center space-x-2 shadow-gold-hover transition-all"
            >
              <Send size={20} />
              <span>Enviar Feedback</span>
            </motion.button>
          </motion.form>
        )}
      </div>
    </Modal>
  );
}
