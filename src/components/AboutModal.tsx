import { Modal } from './Modal';
import { motion } from 'motion/react';
import { Crown, Sparkles, Gem } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quem Somos">
      <div className="space-y-6 text-gray-300">
        
        <div className="flex flex-col items-center justify-center mb-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-36 h-36 mb-4 drop-shadow-[0_0_15px_rgba(191,149,63,0.3)] flex items-center justify-center"
          >
            <img src="/logo.png" alt="LuxStore Logo" className="w-full h-full object-contain" />
          </motion.div>
          <p className="text-sm text-[#bf953f] mt-1">Beleza em Excelência</p>
        </div>

        <p className="leading-relaxed text-sm text-center">
          Bem-vinda à <strong>LuxStore</strong>, o seu destino premium para produtos profissionais de Lash e Brow Design.
        </p>

        <div className="space-y-4 mt-6">
          <div className="bg-black/40 border border-[#bf953f]/20 rounded-xl p-4 flex items-start space-x-3">
            <Crown className="text-[#bf953f] w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-white mb-1 text-sm">Qualidade Superior</h4>
              <p className="text-xs text-gray-400">Selecionamos apenas os melhores produtos do mercado para garantir resultados impecáveis.</p>
            </div>
          </div>
          
          <div className="bg-black/40 border border-[#bf953f]/20 rounded-xl p-4 flex items-start space-x-3">
            <Gem className="text-[#bf953f] w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-white mb-1 text-sm">Sofisticação</h4>
              <p className="text-xs text-gray-400">Cada detalhe é pensado para elevar o padrão do seu atendimento.</p>
            </div>
          </div>

          <div className="bg-black/40 border border-[#bf953f]/20 rounded-xl p-4 flex items-start space-x-3">
            <Sparkles className="text-[#bf953f] w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-white mb-1 text-sm">Resultados</h4>
              <p className="text-xs text-gray-400">Produtos que transformam beleza em excelência e fidelizam suas clientes.</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
