import React, { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, Star, ShieldCheck, Zap, CheckCircle,
  X, Infinity, Lock, Award, MessageCircle,
  ChevronDown, AlertTriangle, Play, Flame, Target
} from "lucide-react";

// --- Custom Components ---

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success';
  onClick?: () => void;
  href?: string;
}

const Button = ({ children, className = "", variant = "primary", onClick, href }: ButtonProps) => {
  const baseStyles = "w-full min-h-[68px] px-8 rounded-[16px] font-display font-black text-[15px] uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer relative overflow-hidden group shadow-2xl active:scale-95";
  
  const variants = {
    primary: "bg-[#FF2E2E] text-white hover:bg-[#ff4d4d] shadow-[0_10px_30px_rgba(255,46,46,0.3)]",
    success: "bg-[#00C853] text-white hover:bg-[#00E676] shadow-[0_12px_40px_rgba(0,200,83,0.35)]",
    secondary: "bg-white text-black hover:bg-slate-100",
    outline: "bg-transparent border-2 border-white/20 text-white hover:border-white/40 hover:bg-white/5",
    ghost: "bg-transparent text-white/40 hover:text-white/70",
  };

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2.5 pointer-events-none">{children}</span>
      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 pointer-events-none"></div>
    </>
  );

  if (href) {
    const isHash = href.startsWith('#');
    
    if (isHash) {
      return (
        <a 
          href={href}
          onClick={(e) => {
            e.preventDefault();
            const id = href.substring(1);
            const element = document.getElementById(id);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            onClick?.();
          }}
          className={`${baseStyles} ${variants[variant]} ${className}`}
        >
          {content}
        </a>
      );
    }

    return (
      <a 
        href={href}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {content}
      </a>
    );
  }
  
  return (
    <div 
      role="button"
      tabIndex={0}
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {content}
    </div>
  );
};

const Section = ({ children, className = "", id, bgImage, overlayOpacity = 0.5, glow = false }: { children: ReactNode, className?: string, id?: string, bgImage?: string, overlayOpacity?: number, glow?: boolean }) => (
  <section 
    id={id} 
    className={`py-16 px-6 relative overflow-hidden ${className}`}
  >
    {bgImage && (
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center animate-[pulse_6s_infinite_alternate]"
          style={{ 
            backgroundImage: `url(${bgImage})`,
            opacity: overlayOpacity
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      </div>
    )}
    {glow && (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-[#FF2E2E]/8 blur-[100px] rounded-full pointer-events-none -z-10" />
    )}
    <div className="max-w-[440px] mx-auto relative z-10 flex flex-col items-center text-center">
      {children}
    </div>
  </section>
);

const Badge = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
  <span className={`inline-flex items-center px-4 py-1.5 bg-[#FF2E2E]/10 border border-[#FF2E2E]/20 text-[10px] font-black uppercase tracking-[0.15em] text-[#FF2E2E] mb-6 rounded-md ${className}`}>
    <span className="w-1.5 h-1.5 bg-[#FF2E2E] mr-2 rounded-full animate-ping" />
    {children}
  </span>
);

const AccordionItem = ({ title, desc, items, isOpen, onToggle }: { title: string, desc: string, items: string[], isOpen: boolean, onToggle: () => void, key?: any }) => {
  return (
    <div className="bg-[#0A0A0A] border border-white/5 rounded-[20px] mb-3.5 overflow-hidden shadow-xl transition-all duration-300 hover:border-[#FF2E2E]/30">
      <div 
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onToggle()}
        className="w-full p-5 flex justify-between items-center text-left group cursor-pointer"
      >
        <div className="flex flex-col pr-4">
          <span className="text-[16px] font-display font-black uppercase text-white tracking-tight leading-none mb-1.5 group-hover:text-[#FF2E2E] transition-colors">{title}</span>
          <span className="text-[11px] font-semibold text-white/50 leading-tight">{desc}</span>
        </div>
        <div className={`p-2 rounded-full bg-white/5 transition-all duration-300 shrink-0 ${isOpen ? 'bg-[#FF2E2E]/10 text-[#FF2E2E] rotate-180' : 'text-white/20'}`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-white/[0.01]"
          >
            <div className="px-5 pb-5 pt-1">
              <div className="h-px w-full bg-white/5 mb-4" />
              <div className="grid grid-cols-1 gap-2">
                {items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-1 h-1 bg-[#FF2E2E] rounded-full shadow-[0_0_6px_#FF2E2E]" />
                    <span className="text-[12px] text-white/70 font-bold uppercase tracking-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Page Component ---

export default function Upsell() {
  const [openCard, setOpenCard] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDecline = () => {
    setIsModalOpen(true);
  };

  const handleFullDecline = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    navigate("/downsell");
  };

  const modules = [
    { 
      title: "PARE DE TRAVAR NO ROLA", 
      desc: "Drills Solo para automatizar a movimentação",
      items: ["Inversões de quadril sem pensar", "Recuperação explosiva automática", "Granby Roll para escapes de pressão", "Base inabalável contra passadores pesados"] 
    },
    { 
      title: "SINCRONIZE SEUS ATAQUES", 
      desc: "Drills em Dupla para antecipar reações",
      items: ["Preencher espaço na saída da montada", "Transições conectadas com armlock", "Substituição de pegadas sem folga", "Antecipação de postura do adversário"] 
    },
    { 
      title: "SUBA SEM FORÇA BRUTA", 
      desc: "Raspagens Organizadas focadas em alavanca",
      items: ["Deep Half Guard ultra blindada", "Desequilíbrios na Single Leg X", "X-Guard para passar direto", "Inversões com controle de distância"] 
    },
    { 
      title: "CHEGUE NA MONTADA SEM DAR ESPAÇO", 
      desc: "Passagens de Guarda de alta pressão",
      items: ["Knee Slide esmagador no quadril", "Torreando colado para as costas", "Smash Pass com distribuição de peso", "Bloqueio preventivo de reposição"] 
    },
    { 
      title: "FAÇA ELE CARREGAR SEU PESO ATÉ DESISTIR", 
      desc: "Controle Posicional e estabilização de elite",
      items: ["Distribuição de massa no 100kg", "Pressão asfixiante de joelho na barriga", "Estabilização definitiva de montada", "Trava de quadril nas costas"] 
    },
    { 
      title: "RECONECTE A GUARDA EM SEGUNDOS", 
      desc: "Flexibilidade e Mobilidade aplicada ao combate",
      items: ["Ativações dinâmicas de quadril", "Mobilidade de ombros para travar chaves", "Estiramento pré-rola defensivo", "Recuperação acelerada pós-tatame"] 
    }
  ];

  const testimonials = [
    { 
      name: "Carlos Mendes (Faixa Azul)", 
      avatar: "https://i.ibb.co/TD32HXk7/53633a73078eed99f0126379bd8f3f93.jpg",
      text: "Eu já sabia um monte de finalizações, mas no rola eu travava e nunca conseguia encaixar porque perdia a posição no caminho. O Fluxo de Combate me ensinou a construir o caminho até o golpe. Agora eu chego nas costas e na montada sabendo exatamente como amarrar o adversário. Virou outra coisa."
    },
    { 
      name: "Thiago Rocha (Faixa Roxa)", 
      avatar: "https://i.ibb.co/NnnrWD8g/3c79629089e2c5bde883d3376e985576.jpg",
      text: "As 150 finalizações são absurdas, mas sem o Fluxo de Combate elas ficam soltas porque você não consegue chegar nelas contra quem defende bem. O segredo está na transição e na pressão. Com os drills deste sistema, meus adversários carregam meu peso até bater por pura exaustão."
    },
    { 
      name: "Marlon Azevedo (Faixa Preta)", 
      avatar: "https://i.ibb.co/cWqdrcQ/a6e4dc3801abe29b9e6fed5783ef0469.jpg",
      text: "Recomendo para todos os meus alunos. Não adianta nada saber armlock de todos os ângulos se você não consegue passar a guarda ou estabilizar a posição por cima. Esse sistema preenche perfeitamente a lacuna entre o início do combate e o tap final."
    }
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white/90 antialiased selection:bg-[#FF2E2E] selection:text-white font-sans">
      <div className="max-w-[480px] mx-auto bg-[#000000] min-h-screen shadow-2xl relative overflow-hidden border-x border-white/5">
        
        {/* BLOCO 1: HEADLINE DE INTERRUPÇÃO */}
        <section className="pt-10 pb-5 px-6 text-center bg-[#070707] border-b border-white/5">
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <CheckCircle2 className="w-5 h-5 text-[#00C853]" />
            <span className="text-[13px] font-black uppercase text-white leading-none tracking-tight">Compra confirmada!</span>
          </div>
          <p className="text-[11px] text-white/40 leading-normal max-w-[320px] mx-auto text-pretty">
            Seu acesso às 150 Finalizações já foi enviado com sucesso para seu E-mail e WhatsApp cadastrados.
          </p>
        </section>

        <Section className="!pt-12 !pb-16" bgImage="https://i.ibb.co/Y4rDm0y4/3.jpg" overlayOpacity={0.15} glow>
          <Badge>PARE E LEIA ISSO AGORA 🥋</Badge>
          
          <h1 className="text-[32px] sm:text-[36px] font-display font-black leading-[1.05] tracking-tighter uppercase italic mb-8 text-white text-balance max-w-[420px] mx-auto">
            Você acabou de comprar as <span className="text-white bg-white/10 px-1 py-0.5 rounded">150 Finalizações.</span><br/>
            <span className="text-[#FF2E2E] mt-2 block">Mas existe um motivo pelo qual a maioria continua sem finalizar.</span>
          </h1>

          <p className="text-[14px] text-white/80 font-medium leading-relaxed mb-8 text-pretty max-w-[380px] mx-auto">
            Não importa se você sabe a finalização perfeita se você <strong className="text-white underline decoration-[#FF2E2E] decoration-2">nunca consegue chegar na posição para encaixar o golpe.</strong>
          </p>

          <div className="w-full bg-[#0A0A0A] p-5 rounded-[20px] border border-white/5 mb-10 text-left">
            <div className="flex items-center gap-2.5 mb-3">
              <Flame className="w-4 h-4 text-[#FF2E2E]" />
              <span className="text-[11px] font-black uppercase tracking-wider text-white">O FATO DURO DO TATAME:</span>
            </div>
            <p className="text-[12.5px] text-white/60 leading-relaxed font-medium">
              Saber finalizar é como ter balas na agulha, mas não saber se aproximar do alvo. O jogo fica incompleto. Você trava na guarda, cansa rápido e bate de frustração.
            </p>
          </div>

          {/* Product Mockup */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full mb-10 relative flex justify-center"
          >
             <img 
              src="https://i.ibb.co/1YVNQ34Q/bjj-fluxo-de-combate-mock-up.png" 
              alt="BJJ Fluxo de Combate" 
              className="w-full h-auto drop-shadow-[0_15px_40px_rgba(255,46,46,0.2)]"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Direct scroll anchor */}
          <Button href="#oferta" variant="success" className="!h-[74px] shadow-[0_15px_35px_rgba(0,200,83,0.3)] hover:scale-[1.02] active:scale-95">
            QUERO COMPLETAR MEU SISTEMA
          </Button>

          <button 
            onClick={handleDecline}
            className="mt-6 text-[12px] text-white/30 font-black uppercase tracking-wider hover:text-white/50 transition-colors mx-auto block cursor-pointer"
          >
            NÃO, QUERO FICAR COM O SISTEMA INCOMPLETO
          </button>
        </Section>

        {/* BLOCO 2: QUEBRA DE CRENÇA */}
        <Section className="bg-[#050505] !py-20 border-y border-white/[0.05]">
          <Badge>O VERDADEIRO PROBLEMA</Badge>
          <h2 className="text-[28px] sm:text-[32px] font-display font-black tracking-tight leading-[1.1] uppercase italic mb-8 text-white text-balance max-w-[400px] mx-auto">
            O problema não é a finalização.<br/>
            <span className="text-[#FF2E2E]">É tudo o que acontece antes dela.</span>
          </h2>
          
          <div className="text-left w-full space-y-3.5 max-w-[400px] mx-auto">
            <p className="text-[13px] text-white/50 font-black uppercase tracking-wider mb-2">Identifique se isso acontece no seu rola:</p>
            <div className="space-y-2.5">
              {[
                { title: "Você passa a guarda...", highlight: "e perde a posição logo em seguida." },
                { title: "Você raspa com esforço...", highlight: "mas não estabiliza por cima." },
                { title: "Você pega as costas...", highlight: "e o adversário escapa facilmente." },
                { title: "Você sabe o golpe exato...", highlight: "mas não sabe construir o caminho até ele." }
              ].map((item, i) => (
                <div key={i} className="bg-black/80 p-4 rounded-xl border border-white/5 flex flex-col gap-1">
                  <span className="text-[13px] font-black uppercase text-white/60">{item.title}</span>
                  <span className="text-[12.5px] font-bold uppercase tracking-tight text-[#FF2E2E] italic">{item.highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* BLOCO 3: MECANISMO */}
        <Section className="!py-20">
          <Badge>MECANISMO DE CONEXÃO</Badge>
          <h2 className="text-[28px] sm:text-[32px] font-display font-black leading-[1.1] uppercase italic mb-6 text-white text-balance max-w-[400px] mx-auto">
            É exatamente por isso que existe o <span className="text-[#FF2E2E]">BJJ Fluxo de Combate.</span>
          </h2>
          <p className="text-[13.5px] text-white/60 mb-10 leading-relaxed text-pretty max-w-[360px] mx-auto">
            Um sistema criado exclusivamente para conectar todas as etapas do jogo de forma automática e sem travar.
          </p>

          {/* Timeline Visual - Conectores do jogo */}
          <div className="w-full relative px-2 mb-10 text-left">
            <div className="space-y-3.5">
              {[
                { step: "01", label: "Movimentação", desc: "Se mover com economia absoluta de gás." },
                { step: "02", label: "Raspagem", desc: "Inverter o jogo usando física ao invés de força." },
                { step: "03", label: "Passagem", desc: "Chegar na montada ou lateral sem entregar espaços." },
                { step: "04", label: "Controle & Pressão", desc: "Fazer o adversário se cansar carregando seu peso." },
                { step: "05", label: "Finalização", desc: "Encaixar as 150 finalizações sem chance de fuga." }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-[#080808] p-4 rounded-xl border border-white/5 group hover:border-[#FF2E2E]/20 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-[#FF2E2E]/10 border border-[#FF2E2E]/20 flex items-center justify-center text-[#FF2E2E] font-display font-black text-sm shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-[13px] font-display font-black uppercase tracking-tight text-white leading-none mb-1">{item.label}</h4>
                    <p className="text-[11px] text-white/50 leading-none">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-[12px] font-black uppercase italic text-[#FF2E2E] tracking-wider">
            TRANSFORME AÇÕES ISOLADAS EM UM JOGO TOTALMENTE CONECTADO.
          </p>
        </Section>

        {/* BLOCO 4: BENEFÍCIOS (EMOCIONAIS) */}
        <Section className="bg-[#050505] !py-20 border-b border-white/[0.05]">
          <Badge>O COMBATE NO SEU CONTROLE</Badge>
          <h2 className="text-[28px] sm:text-[32px] font-display font-black leading-[1.1] uppercase italic mb-10 text-white text-balance max-w-[400px] mx-auto">
            TROQUE O DESESPERO PELO <span className="text-[#FF2E2E]">FLUXO CONTÍNUO</span>
          </h2>

          <div className="w-full space-y-3.5 text-left max-w-[400px] mx-auto mb-8">
            {[
              { before: "Drills Solo", after: "Pare de travar durante o rola.", text: "Seu corpo se movimenta no automático para a posição certa." },
              { before: "Controle Posicional", after: "Faça o adversário carregar seu peso até desistir.", text: "Estabilize com pressão asfixiante que mina as forças dele." },
              { before: "Passagens", after: "Chegue na montada sem entregar espaço.", text: "Bloqueie reposições de guarda e acabe com escapes fáceis." },
              { before: "Raspagens", after: "Suba para os 100kg sem força bruta.", text: "Use alavancas para inverter até adversários bem mais pesados." }
            ].map((item, i) => (
              <div key={i} className="bg-[#0A0A0A] p-5 rounded-[20px] border border-white/5">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#FF2E2E] block mb-1">DE {item.before} PARA:</span>
                <h4 className="text-[15px] font-display font-black uppercase text-white leading-tight mb-1.5">{item.after}</h4>
                <p className="text-[11px] text-white/55 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="w-full text-left max-w-[440px] mx-auto mt-8">
            <h3 className="text-[13px] font-black uppercase tracking-wider text-white/50 mb-4 text-center">DETALHES DA ESTRUTURA COMPLETA:</h3>
            {modules.map((m, i) => (
              <AccordionItem 
                key={i}
                title={m.title}
                desc={m.desc}
                items={m.items}
                isOpen={openCard === i}
                onToggle={() => setOpenCard(openCard === i ? null : i)}
              />
            ))}
          </div>
        </Section>

        {/* BLOCO 9: PROVAS (DEPOIMENTOS DIRETOS) */}
        <Section className="!py-20 bg-black">
          <Badge>DEPOIMENTOS REAIS DE ALUNOS</Badge>
          <h2 className="text-[28px] sm:text-[32px] font-display font-black leading-[1.1] uppercase italic mb-8 text-white text-balance max-w-[400px] mx-auto">
            Quem destravou as posições manda o papo reto:
          </h2>
          <div className="w-full space-y-5">
            {testimonials.map((t, i) => (
              <div 
                key={i}
                className="bg-[#080808] p-6 rounded-[24px] border border-white/5 text-left relative shadow-xl hover:border-[#FF2E2E]/25 transition-all duration-300"
              >
                <div className="flex items-center gap-3.5 mb-4">
                  <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full border border-white/10 p-0.5 object-cover" referrerPolicy="no-referrer" loading="lazy" />
                  <div>
                    <h4 className="text-[13px] font-black uppercase text-white leading-none mb-1">{t.name}</h4>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-[#FF2E2E] fill-[#FF2E2E]" />)}
                    </div>
                  </div>
                </div>
                <p className="text-[13px] text-white/70 leading-relaxed italic">"{t.text}"</p>
                <div className="absolute top-5 right-6 text-[#FF2E2E]/5 pointer-events-none">
                  <MessageCircle className="w-8 h-8" />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* BLOCO 7: URGÊNCIA PSICOLÓGICA */}
        <Section className="bg-[#050505] !py-12 border-y border-[#FF2E2E]/20">
          <div className="w-full bg-[#0F0404] border border-[#FF2E2E]/30 p-6 rounded-[24px] text-center max-w-[420px] mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#FF2E2E]/5 blur-2xl rounded-full" />
            <div className="flex items-center justify-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-[#FF2E2E] animate-bounce animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FF2E2E]">ATENÇÃO IMPORTANTE</span>
            </div>
            <p className="text-[13.5px] text-white font-black uppercase italic mb-3 leading-tight text-center">
              ESTA CONDIÇÃO ESPECIAL SÓ APARECE NESTA PÁGINA.
            </p>
            <p className="text-[12px] text-white/60 leading-relaxed font-medium">
              Ao fechar ou atualizar esta oferta, o desconto exclusivo de lançamento será removido permanentemente e você não terá outra oportunidade de garantir este valor promocional.
            </p>
          </div>
        </Section>

        {/* BLOCO 5 & 6: NOVA OFERTA & STACK VISUAL */}
        <Section id="oferta" className="!py-20" bgImage="https://i.ibb.co/Y4rDm0y4/3.jpg" overlayOpacity={0.15} glow>
          <div className="bg-[#080808]/95 p-6 sm:p-10 rounded-[32px] border-2 border-[#FF2E2E] w-full relative shadow-[0_30px_70px_rgba(0,0,0,0.9)] max-w-[440px] mx-auto">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#FF2E2E] text-white px-7 py-2.5 rounded-md font-black text-[11px] italic uppercase tracking-[0.15em] shadow-2xl text-nowrap">
              OFERTA EXCLUSIVA DE LANÇAMENTO
            </div>

            <div className="mt-4 mb-6 text-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded">COMBO COMPLETO DE ALTO IMPACTO</span>
            </div>
            
            <div className="mb-6 relative flex justify-center">
               <img 
                src="https://i.ibb.co/1YVNQ34Q/bjj-fluxo-de-combate-mock-up.png" 
                alt="BJJ Fluxo de Combate" 
                className="w-[260px] h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>

            <h2 className="text-[25px] sm:text-[28px] font-display font-black leading-tight uppercase italic mb-3.5 text-white text-balance text-center">
              COMPLETE O SISTEMA QUE FAZ O ADVERSÁRIO BATER.
            </h2>

            <p className="text-[12.5px] text-white/60 italic mb-8 text-center px-2 leading-relaxed">
              As <span className="text-white font-black underline decoration-[#FF2E2E]">150 Finalizações</span> mostram <strong className="text-white uppercase font-black">como</strong> finalizar. <br className="hidden sm:block"/>
              O <span className="text-[#FF2E2E] font-black">Fluxo de Combate</span> mostra <strong className="text-white uppercase font-black">como chegar lá</strong> sem perder posição no caminho.
            </p>

            <div className="flex flex-col items-center mb-8 bg-black/65 p-4 rounded-xl border border-white/5">
              <span className="text-[12px] text-white/30 line-through font-extrabold mb-1 tracking-widest uppercase">De R$ 97,00 por apenas:</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[22px] font-bold text-white">R$</span>
                <span className="text-[64px] font-display font-black tracking-tighter text-white leading-none">27</span>
                <span className="text-[20px] font-bold text-white/40">,00</span>
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-[#FF2E2E] mt-2">PAGAMENTO ÚNICO • ACESSO VITALÍCIO</span>
            </div>

            {/* STACK VISUAL - BLOCO 6 */}
            <div className="space-y-2.5 mb-8 text-left bg-white/[0.02] p-5 rounded-[20px] border border-white/5">
              {[
                { label: "+200 Aulas Práticas", sub: "Passo a passo definitivo" },
                { label: "Drills Solo & Drills Dupla", sub: "Sincronize sua resposta corporal" },
                { label: "Mecanismo de Passagem & Raspagem", sub: "Alavancas de alta pressão" },
                { label: "Controle Posicional & Mobilidade", sub: "Zere as fugas do oponente" },
                { label: "Atualizações Inclusas", sub: "Novas técnicas sem taxa extra" },
                { label: "Acesso Vitalício", sub: "Assista quando e onde quiser" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#00C853] shrink-0 mt-0.5" />
                  <div className="leading-tight">
                    <span className="text-[12px] font-black uppercase tracking-tight text-white/90 block leading-none">{item.label}</span>
                    <span className="text-[10px] text-white/40 leading-none">{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* BLOCO 8: CTA VERDE RESPLANDECENTE */}
            <Button href="https://ggcheckout.app/checkout/v5/yswhzfpYG2iIkuW2uv2p" variant="success" className="!h-[76px] !text-[15px] shadow-[0_15px_40px_rgba(0,200,83,0.3)] animate-pulse hover:animate-none">
              QUERO CHEGAR NAS POSIÇÕES E FINALIZAR MAIS
            </Button>

            <button 
              onClick={handleDecline}
              className="mt-6 text-[12px] text-white/30 font-black uppercase tracking-wider hover:text-white/50 transition-colors mx-auto block cursor-pointer"
            >
              NÃO, QUERO CONTINUAR COM O SISTEMA INCOMPLETO
            </button>

            <img 
              src="https://i.ibb.co/7JxbdY1L/Selo-de-Garantia-de-7-Dias-PNG-Transparente-Sem-Fundo-1.webp" 
              className="w-16 h-auto mx-auto mt-8 opacity-25 grayscale hover:opacity-40 transition-opacity"
              alt="Garantia"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
        </Section>

        {/* GARANTIA */}
        <Section className="!py-16">
          <Badge>RISCO TOTALMENTE ZERO</Badge>
          <h2 className="text-[28px] sm:text-[32px] font-display font-black leading-tight uppercase italic mb-6 text-white text-balance max-w-[340px] mx-auto text-center">
            7 DIAS DE GARANTIA INCONDICIONAL
          </h2>
          <p className="text-[13px] text-white/50 leading-relaxed italic max-w-[320px] mx-auto text-pretty text-center">
            Se em 7 dias você achar que o Fluxo de Combate não acelerou seu tempo de reação e não deixou mais fácil o encaixe das finalizações, mande uma mensagem e devolvemos cada centavo do seu investimento.
          </p>
        </Section>

        {/* CTA FINAL DE CONTINUAÇÃO */}
        <Section className="bg-[#050505] !py-20 border-t border-white/5 text-center">
          <Badge>A ÚLTIMA DECISÃO</Badge>
          <h2 className="text-[26px] sm:text-[30px] font-display font-black leading-[1.1] uppercase italic mb-4 text-white text-balance max-w-[400px] mx-auto">
            Você já tem as finalizações.<br/>
            <span className="text-[#FF2E2E]">Agora falta aprender a chegar nelas.</span>
          </h2>
          <p className="text-[13px] text-white/40 mb-10 px-4 text-pretty max-w-[320px] mx-auto">
            Não desperdice o investimento que você acabou de fazer. Complete seu arsenal de combate e domine o rola.
          </p>
          <Button href="#oferta" variant="success" className="!h-[74px] shadow-[0_15px_35px_rgba(0,200,83,0.25)] max-w-[380px] mx-auto">
            QUERO COMPLETAR MEU SISTEMA
          </Button>

          <button 
            onClick={handleDecline}
            className="mt-8 text-[12px] text-white/30 font-black uppercase tracking-wider hover:text-white/50 transition-colors mx-auto block cursor-pointer"
          >
            NÃO, QUERO FICAR COM AS FINALIZAÇÕES INCOMPLETAS
          </button>
        </Section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/5 bg-[#000000] text-center">
          <div className="flex flex-col items-center px-6">
            <h3 className="text-[20px] font-display font-black italic uppercase tracking-tighter text-white mb-3">BJJ FLUXO DE COMBATE</h3>
            <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.25em] mb-10 leading-relaxed">
              &copy; {new Date().getFullYear()} Fluxo de Combate. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 opacity-15">
              <ShieldCheck className="w-5 h-5" />
              <Award className="w-5 h-5" />
              <Lock className="w-5 h-5" />
            </div>
          </div>
        </footer>

      </div>

      {/* Downsell Modal - Updated for same high converting style */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden pt-4 pb-12 px-4 flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/95 backdrop-blur-xl cursor-pointer"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-[420px] bg-[#000000] border-2 border-[#FF2E2E]/40 rounded-[32px] shadow-[0_0_80px_rgba(255,46,46,0.15)] z-10 overflow-hidden"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors z-20 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-5 sm:p-8 flex flex-col items-center text-center">
                <Badge className="mb-4">OPORTUNIDADE DE SAÍDA 🥋</Badge>
                
                <h3 className="text-[20px] sm:text-[23px] font-display font-black leading-tight uppercase italic mb-3 text-[#FF2E2E] pr-6">
                  ESPERE… NÃO SAI DE MÃOS VAZIAS.
                </h3>
                
                <p className="text-[12px] sm:text-[13px] text-white/60 font-medium leading-relaxed mb-5 text-pretty">
                  Se o problema é o valor cheio, facilitamos para você conectar seu jogo agora sem desculpas.
                </p>

                <div className="w-full space-y-2 mb-5 text-left bg-white/[0.02] p-4 rounded-[20px] border border-white/5">
                  {[
                    "Drills Solo de alta movimentação",
                    "Como estabilizar posições sem esforço",
                    "Reconexão de guarda asfixiante",
                    "Acesso Completo Vitalício"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#00C853] shrink-0" />
                      <span className="text-[11px] font-black uppercase tracking-tight text-white/80">{text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col items-center mb-6 w-full pt-4 border-t border-white/5">
                  <span className="text-[11px] text-white/30 line-through font-extrabold mb-1 tracking-widest uppercase">De R$ 97,00 por apenas:</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[16px] font-bold text-white">R$</span>
                    <span className="text-[44px] font-display font-black tracking-tighter text-white leading-none">16</span>
                    <span className="text-[16px] font-bold text-white/50">,00</span>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/30 mt-2.5 italic">CONDIÇÃO ÚNICA PARA NÃO SE ARREPENDER</span>
                </div>

                <div className="w-full space-y-3">
                  <Button 
                    href="https://ggcheckout.app/checkout/v5/qQvvVcZn0OpubKNGyCif" 
                    variant="success" 
                    className="!h-[68px] !text-[13.5px] shadow-[0_12px_30px_rgba(0,200,83,0.25)]"
                  >
                    QUERO COMPLETAR MEU SISTEMA POR R$ 16
                  </Button>
                  
                  <button 
                    onClick={handleFullDecline}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleFullDecline(e as any)}
                    className="w-full py-1 text-[10px] text-white/20 font-black uppercase tracking-[0.2em] hover:text-white/40 transition-colors cursor-pointer outline-none focus:text-white/40"
                  >
                    Recusar e ir para o suporte
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
