import React, { ReactNode, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, Star, ShieldCheck, Zap, CheckCircle,
  Trophy, Activity, X, Plus, Minus, Mail, LayoutGrid, 
  Smartphone, Infinity, Lock, Award, MessageCircle,
  ChevronDown, Play
} from "lucide-react";

// --- Components ---

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  onClick?: () => void;
  href?: string;
  target?: string;
}

const Button = ({ children, className = "", variant = "primary", onClick, href, target }: ButtonProps) => {
  const baseStyles = "w-full min-h-[58px] px-6 rounded-[12px] font-black text-[15px] uppercase tracking-tighter transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer relative overflow-hidden group active:scale-95 shadow-xl hover:shadow-[0_0_25px_rgba(255,46,46,0.4)]";
  
  const variants = {
    primary: "bg-[#FF2E2E] text-white hover:bg-[#FF4D4D] active:bg-[#CC2222] shadow-[0_10px_30px_rgba(255,46,46,0.25)] border-none",
    secondary: "bg-white text-black hover:bg-slate-100 active:bg-slate-200",
    outline: "bg-transparent border-2 border-[#FF2E2E] text-[#FF2E2E] hover:bg-[#FF2E2E]/10 active:bg-[#FF2E2E]/20 hover:text-[#FF2E2E]",
    ghost: "bg-transparent text-white/60 hover:text-white active:bg-white/5",
  };

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2 pointer-events-none">{children}</span>
      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 pointer-events-none"></div>
    </>
  );

  if (href) {
    const isHash = href.startsWith('#');
    
    // For external links, we want to be as "HTML-pure" as possible to avoid issues in some mobile browsers/webviews
    if (!isHash) {
      return (
        <a 
          href={href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className={`${baseStyles} ${variants[variant]} ${className}`}
        >
          {content}
        </a>
      );
    }

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
    <div 
      role="button"
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }} 
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          onClick?.();
        }
      }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {content}
    </div>
  );
};

const Section = ({ children, className = "", id, bgImage, overlayOpacity = 0.5, pattern = false }: { children: ReactNode, className?: string, id?: string, bgImage?: string, overlayOpacity?: number, pattern?: boolean }) => (
  <section 
    id={id} 
    className={`py-16 px-4 relative overflow-hidden border-b border-[#1F1F1F] ${className}`}
  >
    {bgImage && (
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${bgImage})`,
            opacity: overlayOpacity
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B] via-transparent to-[#0B0B0B]" />
      </div>
    )}
    {pattern && <div className="absolute inset-0 tatami-pattern opacity-5 z-0 pointer-events-none" />}
    <div className="max-w-[480px] mx-auto relative z-10 flex flex-col items-center text-center">
      {children}
    </div>
  </section>
);

const Badge = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
  <span className={`inline-flex items-center px-4 py-1.5 bg-[#FF2E2E]/10 border border-[#FF2E2E]/20 text-[10px] font-black uppercase tracking-[0.2em] text-[#FF2E2E] mb-6 rounded-full ${className}`}>
    <span className="w-1.5 h-1.5 bg-[#FF2E2E] mr-2 rounded-full animate-pulse shadow-[0_0_8px_rgba(255,46,46,0.8)]" />
    {children}
  </span>
);

const AccordionItem = ({ title, count, items, isOpen, onToggle }: { title: string, count: string, items: string[], isOpen: boolean, onToggle: () => void, key?: any }) => {
  return (
    <div className="bg-[#121212] border border-[#1F1F1F] rounded-[16px] mb-3 overflow-hidden shadow-lg transition-all duration-300 hover:border-[#FF2E2E]/20">
      <div 
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onToggle()}
        className="w-full p-6 flex justify-between items-center text-left group cursor-pointer"
      >
        <div className="flex flex-col">
          <span className="text-[18px] font-display font-black uppercase italic text-white tracking-tight leading-none mb-1">{title}</span>
          <span className="text-[11px] font-black uppercase tracking-widest text-[#FF2E2E]">{count}</span>
        </div>
        <div className={`p-2 rounded-full bg-[#1F1F1F] transition-all duration-500 ${isOpen ? 'bg-[#FF2E2E]/20 text-[#FF2E2E] rotate-180' : 'text-white/40'}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden bg-black/20"
          >
            <div className="px-6 pb-6 pt-2">
              <div className="grid grid-cols-1 gap-2">
                {items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-[#FF2E2E] rounded-full" />
                    <span className="text-[14px] text-white font-black uppercase italic tracking-tight">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-white/30 italic">+ dezenas de variações dentro</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-[#121212] border border-[#1F1F1F] rounded-[12px] mb-3 overflow-hidden shadow-sm">
      <div 
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(!isOpen);
          }
        }}
        className="w-full p-5 flex justify-between items-center text-left group cursor-pointer"
      >
        <span className="text-[15px] font-black uppercase tracking-tight group-hover:text-[#FF2E2E] transition-colors text-white">{question}</span>
        <div className={`p-1.5 rounded-full bg-[#1F1F1F] transition-all duration-300 ${isOpen ? 'bg-[#FF2E2E]/20 text-[#FF2E2E] rotate-180' : 'text-white/40'}`}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-[#BFBFBF] font-medium text-[13px] leading-relaxed italic">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Constants ---

const IMAGES = {
  hero: "https://i.ibb.co/LdKq9DsH/1.jpg",
  logo: "https://i.ibb.co/ZbHFFBJ/Logo.jpg",
  guarantee: "https://i.ibb.co/7JxbdY1L/Selo-de-Garantia-de-7-Dias-PNG-Transparente-Sem-Fundo-1.webp",
  belt: "https://i.ibb.co/Y4rDm0y4/3.jpg",
  testimonials: [
    "https://i.ibb.co/N6gxYPst/Depoimento-Bjj-System-1.jpg",
    "https://i.ibb.co/Ldz0xYmf/Depoimento-Bjj-System-2.jpg",
    "https://i.ibb.co/6R2wtsP5/Depoimento-Bjj-System-3.jpg",
    "https://i.ibb.co/bRq7FGKQ/Depoimento-Bjj-System-4.jpg"
  ],
  mockups: {
    bundle: "https://i.ibb.co/bjNBfdKf/Pacote-Completo-PNG.png",
    basic: "https://i.ibb.co/SwYr173J/Pacote-B-scio-PNG.png",
    checklist: "https://i.ibb.co/kVY7X6v0/BJJ-CHECKLIST-DE-TREINOS.png",
    competitor: "https://i.ibb.co/vC1w7RWb/BJJ-COMPETIDOR.png",
    guide: "https://i.ibb.co/WNxNzbrN/BJJ-GUIA-DE-TREINO.png",
    food: "https://i.ibb.co/pv2jpN92/BJJ-GUIA-DE-ALIMENTA-O.png",
    pack50: "https://i.ibb.co/27npcNm4/BJJ-PACK-50-AULAS.png",
  }
};

export default function Home() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ minutes: number; seconds: number }>({ minutes: 14, seconds: 59 });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMainVideoPlaying, setIsMainVideoPlaying] = useState(false);
  const [activeProductTab, setActiveProductTab] = useState(0);
  const timerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Tracking scroll position for mobile sticky bottom bar (Priority 2)
    const handleScroll = () => {
      const isMobile = window.innerWidth <= 768;
      // Show after scrolling past fold (~320px)
      setShowStickyCta(window.scrollY > 320);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial evaluation

    // Persistent Countdown Timer (Priority 4) - only runs when user has scrolled to it
    const startedStorageKey = "bjj_system_timer_started";
    const endStorageKey = "bjj_system_timer_end";
    
    let interval: NodeJS.Timeout | null = null;

    const startTimer = (endTimeStr: string) => {
      if (interval) clearInterval(interval);
      
      const updateTimer = () => {
        const remaining = parseInt(endTimeStr) - Date.now();
        if (remaining <= 0) {
          // Reset countdown smoothly for continuity
          const newEnd = Date.now() + 15 * 60 * 1000;
          localStorage.setItem(endStorageKey, newEnd.toString());
          endTimeStr = newEnd.toString();
        } else {
          const mins = Math.floor((remaining / 1000 / 60) % 60);
          const secs = Math.floor((remaining / 1000) % 60);
          setTimeLeft({ minutes: mins, seconds: secs });
        }
      };

      updateTimer(); // run once immediately
      interval = setInterval(updateTimer, 1000);
    };

    const hasStartedBefore = localStorage.getItem(startedStorageKey) === "true";
    let currentEndTime = localStorage.getItem(endStorageKey);

    if (hasStartedBefore && currentEndTime && parseInt(currentEndTime) > Date.now()) {
      // If it started before and is still valid, run it immediately (e.g. on page refresh after scroll)
      startTimer(currentEndTime);
    } else if (hasStartedBefore) {
      // If started before but expired, we can reset it and run immediately
      const newEnd = (Date.now() + 15 * 60 * 1000).toString();
      localStorage.setItem(endStorageKey, newEnd);
      startTimer(newEnd);
    }

    // Set up observer to start the timer when the element comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const hasStarted = localStorage.getItem(startedStorageKey) === "true";
            if (!hasStarted) {
              localStorage.setItem(startedStorageKey, "true");
              const newEnd = (Date.now() + 15 * 60 * 1000).toString();
              localStorage.setItem(endStorageKey, newEnd);
              startTimer(newEnd);
            }
            observer.disconnect(); // only need to trigger once
          }
        });
      },
      { threshold: 0.1 } // triggers when 10% of the timer is visible
    );

    if (timerRef.current) {
      observer.observe(timerRef.current);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (interval) clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  const positionalContent = [
    { title: "Guarda Ofensiva (A Armadilha)", count: "35 vídeos de dominância", items: ["Triângulo de Controle", "Omoplata Ajustado", "Arm-lock com Ajuste Fino"] },
    { title: "Controle Lateral & 100kg", count: "20 vídeos de pura pressão", items: ["Ezequiel de gola", "Kimuras Ajustadas", "Estrangulamento Norte-Sul"] },
    { title: "Controle e Ataques da Montada", count: "15 vídeos de pressão contínua", items: ["Triângulo de Mão Invisível", "S-Mount Arm-lock Cirúrgico", "Americana sob pressão"] },
    { title: "Sistema de Ataques das Costas", count: "18 vídeos de alta precisão", items: ["Mata-Leão Sem Espaço", "Arco e Flecha Perfeito", "Ezequiel de Costas Ajustado"] },
    { title: "Ataques de Lapela Modernos", count: "22 vídeos táticos", items: ["Estrangulamento Cruzado Liso", "Baseball Choke Surpresa", "Brabo Choke Justo"] },
    { title: "Arm-locks Cirúrgicos", count: "15 vídeos de alavanca e pressão", items: ["Belly Down Alavanca", "Chopper Justo", "Step over sem defesa"] },
    { title: "Leglocks & Finalizações de Pernas", count: "15 vídeos de pressão", items: ["Botinha de Pressão", "Chave de Calcanhar Justa", "Ataque de Panturrilha Surpresa"] },
    { title: "Ajustes Invisíveis de Mestre", count: "10 vídeos de Mestre", items: ["Alavancas de Alta Pressão", "Pontos de Alinhamento Corporal", "Timing de Encaixe e Ajuste"] }
  ];

  const productsList = [
    {
      tabTitle: "Sistema Completo",
      title: "150 Finalizações por Posição",
      tag: "SISTEMA COMPLETO",
      details: "O passo a passo com ajustes milimétricos em vídeo de cada submissão, do básico ao avançado, estruturado para que você nunca mais fique travado na hora de atacar.",
      img: IMAGES.mockups.basic,
      color: "#FF2E2E"
    },
    {
      tabTitle: "Checklist de Treinos",
      title: "BJJ Checklist de Treinos",
      tag: "MAPEAMENTO DIÁRIO DE PROGRESSO",
      details: "Uma ferramenta inteligente de mapeamento diário para organizar sua rotina de treinos, registrar sua evolução e otimizar a fixação dos seus drills de forma cirúrgica.",
      img: IMAGES.mockups.checklist,
      color: "#00C853"
    },
    {
      tabTitle: "Guia de Treino",
      title: "BJJ Guia de Treino de Alta Performance",
      tag: "ACELERE SUA GRADUAÇÃO",
      details: "O cronograma tático completo com segredos estratégicos de posicionamento e postura para acelerar sua passagem de faixa de forma inteligente.",
      img: IMAGES.mockups.guide,
      color: "#00C853"
    },
    {
      tabTitle: "Guia de Alimentação",
      title: "BJJ Guia de Alimentação e Explosão",
      tag: "GÁS DE FAIXA PRETA",
      details: "A nutrição e preparação física ideal para manter a explosão máxima e oxigenação muscular do início ao fim do treino, dominando qualquer adversário pesado.",
      img: IMAGES.mockups.food,
      color: "#00C853"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#BFBFBF] antialiased selection:bg-[#FF2E2E] selection:text-white">
      <div className="max-w-[480px] mx-auto bg-[#0B0B0B] min-h-screen shadow-2xl relative">
        
        {/* Frame 1 — Hero */}
        <section className="relative flex flex-col items-center pt-8 pb-10 overflow-hidden border-b border-[#1F1F1F]">
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center scale-110"
              style={{ backgroundImage: `url(${IMAGES.hero})`, opacity: 0.15, filter: 'grayscale(100%) brightness(0.5)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B] via-transparent to-[#0B0B0B]" />
          </div>

          <div className="px-5 relative z-10 w-full flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full flex flex-col items-center"
            >
              <Badge>OSS, GUERREIRO!</Badge>
              
              <h1 className="text-[24px] font-display font-black leading-[1.15] tracking-tighter uppercase italic mb-5 max-w-[380px] text-white text-balance mx-auto">
                O QUE FAZ SEU JOGO PARECER DE FAIXA PRETA NÃO É A FAIXA NA CINTURA. É A QUANTIDADE DE RESPOSTAS QUE VOCÊ TEM DENTRO DO TATAME.
              </h1>

              {/* VSL (Video Sales Letter) Vimeo Embed */}
              <div className="w-full max-w-[440px] px-2 mb-5">
                <div className="relative aspect-video rounded-[20px] bg-black border border-white/10 hover:border-[#FF2E2E]/40 transition-all shadow-2xl overflow-hidden group cursor-pointer">
                  {isMainVideoPlaying ? (
                    <iframe 
                      src="https://player.vimeo.com/video/1205562926?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0&vimeo_logo=0&logo=0&autoplay=1" 
                      frameBorder="0" 
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      className="absolute top-0 left-0 w-full h-full" 
                      title="VSL - BJJ SYSTEM"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div 
                      onClick={() => setIsMainVideoPlaying(true)}
                      className="w-full h-full flex flex-col items-center justify-center relative bg-cover bg-center transition-all duration-500 overflow-hidden"
                      style={{ 
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${IMAGES.hero})`,
                      }}
                    >
                      {/* Outer waves effect for play button */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent h-1/3" />
                      
                      {/* Play Button Icon */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FF2E2E] rounded-full flex items-center justify-center text-white shadow-[0_10px_35px_rgba(255,46,46,0.6)] group-hover:bg-[#FF4D4D] group-hover:scale-110 active:scale-95 transition-all duration-300 relative z-20">
                        <svg className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-1" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <span className="mt-4 text-[10px] sm:text-[11px] font-black tracking-[0.2em] uppercase text-white/80 group-hover:text-white transition-colors relative z-20 text-center px-4 leading-none">
                        CLIQUE PARA ASSISTIR
                      </span>
                      <span className="mt-2 text-[10px] text-white/40 italic font-medium relative z-20">
                        Apresentação do sistema • 4 min
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 pointer-events-none border-[6px] border-white/5 rounded-[20px]" />
                </div>
              </div>

              <div className="max-w-[400px] mx-auto mb-6">
                <p className="text-[14px] sm:text-[15px] text-white/70 font-medium leading-[1.6] text-center text-pretty">
                  Pare de ser o parceiro de treino previsível que todo mundo defende fácil. Domine as 150 RESPOSTAS TÁTICAS DE FAIXA PRETA e passe a impor respeito real em qualquer rola, da branca à preta, para você nunca mais ficar sem saber o que fazer dentro do rola.
                </p>
              </div>

              {/* Hero Mockup - Removed for speed optimization */}
              


              <div className="flex flex-col items-center gap-8 w-full px-2">
                <Button href="#oferta" variant="primary" className="shadow-[0_10px_40px_rgba(255,46,46,0.45)]">
                  QUERO COMANDAR O ROLA HOJE
                </Button>

                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 opacity-60 bg-black/20 py-3 px-6 rounded-full border border-white/5">
                  {[
                    { icon: <Zap className="w-3.5 h-3.5" />, text: "Acesso Imediato" },
                    { icon: <ShieldCheck className="w-3.5 h-3.5" />, text: "Garantia 7 Dias" },
                    { icon: <Lock className="w-3.5 h-3.5" />, text: "Seguro" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="text-[#FF2E2E]">{item.icon}</div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-white leading-none">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Frame 2 — Prova Social (Priority 3 - Recortado para cima após Hero para reter atenção) */}
        <Section className="!py-24">
          <Badge>MUDANÇA DE PATAMAR</Badge>
          <h2 className="text-[28px] sm:text-[32px] font-display font-black tracking-tight uppercase italic mb-8 leading-[1.1] max-w-[400px] mx-auto text-white text-balance text-center">
            IRMÃOS DE TATAME QUE PARARAM DE SER PREVISÍVEIS E DEIXARAM O JOGO CASCA GROSSA
          </h2>
          <p className="text-[15px] text-[#BFBFBF] font-medium italic mb-12 max-w-[340px] mx-auto leading-relaxed text-pretty text-center opacity-80">
            Antes: “Quase pegavam” e cansavam à toa no rola.<br/>
            Depois: Dominam a posição e o tapinha é questão de segundos.
          </p>

          <div className="grid grid-cols-2 gap-4 w-full mb-8 px-2">
            {IMAGES.testimonials.map((img, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="premium-card p-1 overflow-hidden shadow-2xl"
              >
                <img 
                  src={img} 
                  alt={`testimonial-${i}`} 
                  className="w-full h-auto object-cover rounded-[8px]"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 w-full mb-12 px-2">
            {[
              { 
                name: "Ricardo Mendes", 
                role: "Faixa Azul — Gracie Barra", 
                text: "Guerreiro, eu cansei de ser o parceiro que todo mundo passava a guarda e defendia fácil. No primeiro treino após estudar os ajustes invisíveis do BJJ System, encaixei um triângulo de mão na montada que foi cirúrgico. O respeito dos caras na academia mudou da noite pro dia. OSS!",
                avatar: "https://i.ibb.co/HLk82mHH/fp1.png"
              },
              { 
                name: "Felipe Souza", 
                role: "Faixa Branca — Alliance", 
                text: "Mestre, eu chegava nos 100kg e dava um branco, os caras sempre repunham a guarda. Agora com esse repertório, meu jogo parece fluir em câmera lenta. Os faixas azuis já evitam cair por baixo porque sabem que a pressão é monstra. Confiança máxima.",
                avatar: "https://i.ibb.co/KzbzdcqY/fp6.png"
              },
              { 
                name: "Bruno Oliveira", 
                role: "Faixa Roxa — Competidor", 
                text: "Sou competidor e essas técnicas de gola e lapela são relíquias. Até os faixas pretas da minha academia começaram a elogiar a postura e a redobrar a atenção quando chego na guarda. Fui campeão da copa regional finalizando quase todas as lutas.",
                avatar: "https://i.ibb.co/LzP2CPk0/fp5.png"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#121212] p-6 rounded-[20px] border border-[#1F1F1F] shadow-xl text-left hover:border-[#FF2E2E]/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#FF2E2E]/20">
                    <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-black uppercase text-white leading-none mb-1">{item.name}</h4>
                    <span className="text-[10px] font-bold text-[#FF2E2E] uppercase tracking-widest">{item.role}</span>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-[#FFD700] fill-[#FFD700]" />
                    ))}
                  </div>
                </div>
                <p className="text-[13px] text-[#BFBFBF] font-medium italic leading-relaxed text-pretty">
                  "{item.text}"
                </p>
              </motion.div>
            ))}
          </div>

          <div className="px-6 py-2.5 border border-[#FF2E2E]/30 bg-[#FF2E2E]/10 rounded-full shadow-lg">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FF2E2E] leading-none">
              +5.000 CASCA-GROSSAS JÁ MUDARAM DE PATAMAR
            </p>
          </div>
        </Section>

        {/* Ajuste 01 — Mais Opções */}
        <Section className="!py-24 bg-[#0D0D0D] border-b border-[#1F1F1F]" pattern>
          <Badge>A LEI DA MENTE TÁTICA</Badge>
          <h2 className="text-[28px] sm:text-[30px] font-display font-black tracking-tight uppercase italic mb-8 leading-[1.15] max-w-[440px] mx-auto text-white text-balance text-center">
            OS PRATICANTES MAIS RESPEITADOS NÃO SÃO OS MAIS FORTES. <br/>SÃO OS QUE POSSUEM <span className="text-[#FF2E2E]">MAIS RESPOSTAS</span>.
          </h2>
          
          <div className="text-center w-full space-y-6 max-w-[400px] mx-auto text-[15px] text-[#BFBFBF] leading-relaxed">
            <p className="text-pretty">
              OSS, guerreiro. Quando você começa a ter resposta para qualquer posição, seu jogo muda de patamar. Força bruta só serve para cansar você e te deixar travado. O guerreiro que manda no tatame não precisa ser forte, ele joga com inteligência.
            </p>
            <div className="flex flex-col items-center gap-1 my-4 py-3 bg-white/[0.02] border border-white/5 rounded-xl uppercase font-black text-xs tracking-widest text-[#FF2E2E] italic">
              <span>Mapear a Posição.</span>
              <span>Ajustar sem pressa.</span>
              <span>Forçar o tapinha.</span>
            </div>
            <p className="text-pretty">
              O maior erro do faixa branca e do faixa azul é teimar no mesmo ataque previsível até cansar. Quando você tem um arsenal com as transições certas, a força do oponente vira arma contra ele.
            </p>
            <p className="text-pretty">
              O segredo é a imprevisibilidade: para cada defesa que seu adversário tentar, você já deve ter novos ataques engatilhados na mente. É isso que separa os caras perigosos e respeitados do resto dos praticantes na academia.
            </p>
            <p className="text-[#FF2E2E] font-black uppercase italic tracking-tight text-[16px] pt-2">
              O BJJ System funciona exatamente assim:
            </p>
            <p className="text-white font-bold text-[15px] text-pretty">
              Dá a você a mente tática de um faixa preta para dominar qualquer posição no rola.
            </p>
          </div>
        </Section>

        {/* Strategic Video Section */}
        <Section className="bg-[#0B0B0B] !py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#FF2E2E]/5 blur-[120px] -z-10 rounded-full scale-150 opacity-30" />
          
          <Badge>VISÃO DE MESTRE</Badge>
          <h2 className="text-[28px] sm:text-[32px] font-display font-black tracking-tight mb-8 uppercase italic leading-[1.1] max-w-[400px] mx-auto text-white text-balance text-center">
            VEJA POR DENTRO OS <br/>AJUSTES INVISÍVEIS
          </h2>
          <p className="text-[15px] text-[#BFBFBF] font-medium italic mb-12 max-w-[340px] mx-auto leading-relaxed text-pretty text-center opacity-80">
            Assista ao vídeo e veja o detalhamento que vai te dar segurança para encaixar qualquer submissão no treino de hoje.
          </p>

          <div className="w-full px-2 mb-12 outline-mask shadow-[0_40px_80px_rgba(0,0,0,1)]">
            <div className="aspect-video bg-[#000000] rounded-[24px] border border-white/10 overflow-hidden relative group cursor-pointer">
              {isVideoPlaying ? (
                <iframe 
                  src="https://player.vimeo.com/video/1189179256?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0&autoplay=1" 
                  title="Demonstrativo OFC"
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              ) : (
                <div 
                  onClick={() => setIsVideoPlaying(true)}
                  className="w-full h-full flex flex-col items-center justify-center relative bg-cover bg-center transition-all duration-500 overflow-hidden"
                  style={{ 
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${IMAGES.hero})`,
                  }}
                >
                  {/* Outer waves effect for play button */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent h-1/3" />
                  
                  {/* Play Button Icon */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FF2E2E] rounded-full flex items-center justify-center text-white shadow-[0_10px_35px_rgba(255,46,46,0.6)] group-hover:bg-[#FF4D4D] group-hover:scale-110 active:scale-95 transition-all duration-300 relative z-20">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-1" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="mt-4 text-[10px] sm:text-[11px] font-black tracking-[0.2em] uppercase text-white/80 group-hover:text-white transition-colors relative z-20 text-center px-4 leading-none">
                    CLIQUE PARA ASSISTIR
                  </span>
                  <span className="mt-2 text-[10px] text-white/40 italic font-medium relative z-20">
                    Amostra de técnica • 1 min
                  </span>
                </div>
              )}
              <div className="absolute inset-0 pointer-events-none border-[6px] border-white/5 rounded-[24px]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full px-2 mb-10">
            {[
              "Ajuste Fino de Pressão",
              "Alavancas Anatômicas",
              "Mentalidade de Faixa Preta",
              "Execução Automática"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2 bg-[#121212] p-4 rounded-xl border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-[#00C853] shrink-0" />
                <span className="text-[11px] font-black uppercase tracking-tight text-white/80">{text}</span>
              </div>
            ))}
          </div>

          <Button href="#oferta" variant="primary">
            QUERO O ARSENAL DE FAIXA PRETA
          </Button>
        </Section>

        {/* Frame 3 — Comparação Sleek & Compacto (Substitui as múltiplas seções repetitivas) */}
        <Section className="bg-[#0D0D0D] !py-20 border-y border-[#1F1F1F]">
          <Badge>RAIO-X DO TATAME</Badge>
          <h2 className="text-[26px] sm:text-[30px] font-display font-black tracking-tight mb-4 uppercase italic leading-[1.1] max-w-[420px] mx-auto text-white text-balance text-center">
            MUDE A SUA REALIDADE JÁ NO PRÓXIMO TREINO
          </h2>
          <p className="text-[14px] text-[#BFBFBF] font-medium mb-10 italic max-w-[340px] mx-auto leading-relaxed text-pretty text-center opacity-80">
            Compare como é o seu rola hoje e como ele se tornará após carregar o arsenal certo.
          </p>

          <div className="grid grid-cols-1 gap-6 w-full max-w-[440px] mx-auto px-2">
            
            {/* SEU JOGO HOJE */}
            <div className="bg-[#121212]/50 p-6 rounded-[24px] border border-red-950/45 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-950/40 text-red-500 border-l border-b border-red-900/30 px-3 py-1 text-[9px] font-black uppercase tracking-wider rounded-bl-[12px]">
                FRUSTRAÇÃO
              </div>
              <h3 className="text-[16px] font-display font-black uppercase italic text-red-500 mb-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                SEU JOGO HOJE
              </h3>
              <div className="space-y-4 text-left">
                {[
                  "Faz força excessiva e desperdiça gás",
                  "Cansa rápido e vira alvo fácil",
                  "Trava na posição e não sabe o próximo passo",
                  "Tem jogo previsível que todos defendem",
                  "Serve de 'escada' para os outros evoluírem"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3.5 text-[13px] text-white/50 font-bold uppercase tracking-tight italic">
                    <span className="text-red-500 shrink-0 text-base leading-none">❌</span>
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SEU JOGO COM O BJJ SYSTEM */}
            <div className="bg-[#141F16]/40 p-6 rounded-[24px] border border-[#00C853]/20 relative overflow-hidden shadow-[0_10px_30px_rgba(0,200,83,0.05)]">
              <div className="absolute top-0 right-0 bg-[#00C853]/10 text-[#00C853] border-l border-b border-[#00C853]/20 px-3 py-1 text-[9px] font-black uppercase tracking-wider rounded-bl-[12px]">
                DOMÍNIO
              </div>
              <h3 className="text-[16px] font-display font-black uppercase italic text-[#00C853] mb-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00C853] animate-pulse" />
                COM O BJJ SYSTEM
              </h3>
              <div className="space-y-4 text-left">
                {[
                  "Economiza energia de forma inteligente",
                  "Tem respostas automáticas em segundos",
                  "Impõe pressão constante sem fazer força",
                  "Joga com a mente tática de um faixa preta",
                  "Ganha o respeito real de todas as graduações"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3.5 text-[13px] text-white font-black uppercase tracking-tight italic">
                    <span className="text-[#00C853] shrink-0 text-base leading-none">✔</span>
                    <span className="leading-snug text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </Section>

        {/* Frame Nova — Bloco de Status e Respeito */}
        <Section className="bg-[#0B0B0B] !py-24 border-b border-[#1F1F1F]">
          <Badge>TRANSFORMAÇÃO SOCIAL</Badge>
          <h2 className="text-[26px] sm:text-[30px] font-display font-black tracking-tight mb-4 uppercase italic leading-[1.15] max-w-[440px] mx-auto text-white text-balance text-center">
            TUDO MUDA QUANDO SEU JOGO COMEÇA A PARECER DE FAIXA PRETA
          </h2>
          <p className="text-[14px] text-[#BFBFBF] font-medium mb-10 italic max-w-[340px] mx-auto leading-relaxed text-pretty text-center opacity-80">
            No tatame, o respeito não é dado. É conquistado a cada rola quando o oponente sente que está em perigo constante.
          </p>

          <div className="grid grid-cols-1 gap-4 w-full max-w-[440px] mx-auto px-2 text-left">
            {[
              "O professor começa a observar você mais e notar sua evolução técnica.",
              "Os faixas brancas param de te escolher como 'treino fácil' para descansar.",
              "Os faixas azuis começam a respeitar sua guarda e pensar duas vezes antes de atacar.",
              "Os faixas roxas ficam muito mais atentos e redobram a segurança contra você.",
              "Você deixa de lutar apenas para sobreviver por baixo e começa a ditar as regras.",
              "Você começa a controlar o ritmo do rola e a decidir a hora exata do tapinha."
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4 bg-[#121212] p-5 rounded-[20px] border border-[#1F1F1F] hover:border-[#FF2E2E]/30 transition-all duration-300">
                <div className="w-6 h-6 rounded-full bg-[#FF2E2E]/10 flex items-center justify-center shrink-0 border border-[#FF2E2E]/20 text-[#FF2E2E] font-black text-xs">
                  ✔
                </div>
                <span className="text-[13.5px] font-bold text-white/95 leading-normal italic">{text}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Frame Nova — Autoridade Técnica (A Engenharia do BJJ System) */}
        <Section className="bg-[#0B0B0B] !py-24 relative overflow-hidden border-b border-[#1F1F1F]">
          <div className="absolute inset-0 bg-[#FF2E2E]/5 blur-[120px] -z-10 rounded-full scale-150 opacity-20" />
          <Badge>CONFIANÇA TÉCNICA</Badge>
          <h2 className="text-[26px] sm:text-[30px] font-display font-black tracking-tight mb-8 uppercase italic leading-[1.1] max-w-[400px] mx-auto text-white text-balance text-center">
            A ENGENHARIA <br/>DO BJJ SYSTEM
          </h2>
          
          <div className="bg-[#121212] p-8 rounded-[28px] border border-[#1F1F1F] max-w-[440px] mx-auto text-left relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#FF2E2E]" />
            <div className="text-[14px] text-white/95 leading-relaxed italic font-medium mb-6 space-y-4">
              <p>O BJJ System foi construído estudando milhares de horas de:</p>
              <ul className="space-y-1.5 pl-2 font-black uppercase tracking-tight text-white text-[12px] not-italic">
                <li className="text-white/90 flex items-center gap-2"><span className="text-[#00C853]">✓</span> treinos de academia;</li>
                <li className="text-white/90 flex items-center gap-2"><span className="text-[#00C853]">✓</span> campeonatos;</li>
                <li className="text-white/90 flex items-center gap-2"><span className="text-[#00C853]">✓</span> rolas pesados;</li>
                <li className="text-white/90 flex items-center gap-2"><span className="text-[#00C853]">✓</span> ajustes utilizados por praticantes experientes.</li>
              </ul>
              <p className="text-[#BFBFBF] text-[13px] pt-1">
                O objetivo nunca foi criar um catálogo bonito. Foi descobrir quais técnicas realmente fazem o adversário bater.
              </p>
            </div>

            <div className="space-y-4 mb-4">
              {[
                { title: "BIOMECÂNICA", desc: "Aproveitamento anatômico para gastar o mínimo de energia." },
                { title: "ALAVANCAS", desc: "Força mecânica simples para multiplicar sua pressão técnica." },
                { title: "PRESSÃO", desc: "Incomode o oponente até que ele entregue o pescoço ou braço." },
                { title: "EFICIÊNCIA", desc: "Movimentos milimétricos, sem rodeios ou floreios." },
                { title: "CONTROLE", desc: "Mande no ritmo do combate da branca à preta." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-1 border-l border-white/10 pl-4 py-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#FF2E2E] italic">{item.title}</span>
                  <span className="text-[13px] text-white/70 font-medium italic">{item.desc}</span>
                </div>
              ))}
            </div>

            <div className="h-px bg-white/5 my-6" />

            <p className="text-[13px] text-white/60 font-black uppercase tracking-tight leading-snug italic text-center">
              Sem movimentos acrobáticos. Sem posições de internet. <br/>
              <span className="text-white">Somente técnicas aplicáveis contra pessoas que querem te amassar.</span>
            </p>
          </div>
        </Section>

        {/* Nova Seção — Redução do Medo do Faixa Branca */}
        <Section className="bg-[#0D0D0D] !py-16 border-b border-[#1F1F1F]">
          <Badge>PARA QUALQUER GRADUAÇÃO</Badge>
          <h2 className="text-[24px] sm:text-[28px] font-display font-black tracking-tight mb-6 uppercase italic leading-[1.15] max-w-[400px] mx-auto text-white text-balance text-center">
            OSS, GUERREIRO.
          </h2>
          
          <div className="bg-[#121212]/80 border border-[#1F1F1F] p-8 rounded-[24px] max-w-[400px] mx-auto text-center relative overflow-hidden shadow-xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[3px] bg-[#00C853]" />
            
            <div className="space-y-4 mb-6">
              {[
                { label: "NÃO precisa ser forte", italic: "O método usa alavancas inteligentes." },
                { label: "NÃO precisa ser flexível", italic: "Posições simples e táticas." },
                { label: "NÃO precisa ser faixa azul", italic: "Perfeito para encurtar caminhos." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center justify-center">
                  <span className="text-[14px] font-black uppercase tracking-tight text-white flex items-center gap-2">
                    <span className="text-red-500 text-xs">❌</span> Você <span className="text-red-500 underline decoration-2">{item.label}</span>
                  </span>
                  <span className="text-[11.5px] text-[#BFBFBF]/75 italic font-medium mt-0.5">{item.italic}</span>
                </div>
              ))}
            </div>

            <div className="h-px bg-white/5 my-5" />

            <p className="text-[14px] text-white font-black uppercase italic tracking-tight leading-snug">
              Você só precisa saber <br/>
              <span className="text-[#00C853] text-[15px] not-italic font-black">QUAL RESPOSTA APLICAR NA HORA CERTA.</span>
            </p>
          </div>
        </Section>

        {/* Frame 4 — O que recebe (Arsenal) */}
        <Section id="recebe" className="!py-24">
          <Badge>CONTEÚDO PRINCIPAL</Badge>
          <h2 className="text-[28px] sm:text-[32px] font-display font-black mb-4 uppercase italic leading-[1.1] max-w-[400px] mx-auto text-white text-balance text-center">
            O QUE VOCÊ VAI DOMINAR
          </h2>
          <p className="text-[10px] sm:text-[11px] text-[#BFBFBF] font-black uppercase tracking-widest mb-12 opacity-40 text-center">150 RESPOSTAS TÁTICAS DE FAIXA PRETA PARA VOCÊ NUNCA MAIS FICAR SEM SABER O QUE FAZER DENTRO DO ROLA.</p>
          
          <div className="w-full px-2 mb-10 max-w-[440px] mx-auto text-left">
            {positionalContent.map((pos, idx) => (
              <AccordionItem 
                key={idx}
                title={pos.title}
                count={pos.count}
                items={pos.items}
                isOpen={openAccordion === idx}
                onToggle={() => { setOpenAccordion(openAccordion === idx ? null : idx); }}
              />
            ))}
          </div>

          <p className="text-[16px] text-white font-black uppercase italic mb-12 px-4 leading-[1.4] text-pretty text-center">
            NUNCA MAIS ENTRE EM UM ROLA SEM SABER EXATAMENTE COMO VAI FINALIZAR.
          </p>

          <div className="w-full mb-10 text-center">
            <span className="text-[#00C853] text-[11px] font-black uppercase tracking-[0.2em] italic">E ALÉM DISSO, VOCÊ TAMBÉM RECEBE:</span>
          </div>

          <div className="grid grid-cols-1 gap-4 w-full mb-16 px-2">
            {[
              { title: "Checklist de Treino de Alta Performance", subtitle: "(Otimize cada minuto do seu treino de rola)", img: IMAGES.mockups.checklist },
              { title: "Guia de Evolução Acelerada", subtitle: "(Acelere sua caminhada até a faixa preta)", img: IMAGES.mockups.guide },
              { title: "Manual de Nutrição do Atleta", subtitle: "(Mais gás para aguentar os treinos mais duros)", img: IMAGES.mockups.food }
            ].map((item, i) => (
              <div key={i} className="premium-card p-6 text-left flex items-center gap-5 hover:border-[#00C853]/40 transition-all shadow-xl group">
                <div className="w-16 h-16 bg-black/40 rounded-xl flex items-center justify-center shrink-0 border border-white/5 group-hover:scale-110 transition-transform overflow-hidden p-1 shadow-inner">
                  <img src={item.img} alt={item.title} className="w-full h-full object-contain" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-black uppercase italic text-white tracking-tight leading-none mb-1">{item.title}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#BFBFBF] opacity-60 leading-none">{item.subtitle}</span>
                </div>
              </div>
            ))}
          </div>

          <Button href="#oferta" variant="primary">
            QUERO O ARSENAL COMPLETO
          </Button>
        </Section>
        
        {/* Frame 5 — Como recebe */}
        <Section className="bg-[#0B0B0B] !py-24 border-y border-[#1F1F1F] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/30 via-transparent to-transparent pointer-events-none" />
          <Badge>ENTREGA NO TATAME</Badge>
          <h2 className="text-[28px] sm:text-[32px] font-display font-black uppercase italic mb-12 leading-[1.1] max-w-[440px] mx-auto text-white text-balance text-center">
            SEU ARSENAL <br/>LIBERADO EM SEGUNDOS
          </h2>
          
          <div className="grid grid-cols-2 gap-4 w-full mb-14 px-2">
            {[
              { icon: <MessageCircle className="w-6 h-6" />, title: "WhatsApp", desc: "Acesso tático direto no seu celular" },
              { icon: <Mail className="w-6 h-6" />, title: "Email", desc: "Link vitalício do Google Drive" },
              { icon: <Infinity className="w-6 h-6" />, title: "Imediato", desc: "Liberação imediata pós-pix" },
              { icon: <Smartphone className="w-6 h-6" />, title: "Secreto", desc: "Estude discreto antes do treino" }
            ].map((item, i) => (
              <div key={i} className="bg-[#121212] p-8 rounded-[24px] border border-[#1F1F1F] flex flex-col items-center text-center shadow-md hover:shadow-lg transition-all group hover:border-[#FF2E2E]/30 duration-300">
                <div className="w-14 h-14 bg-[#FF2E2E]/10 flex items-center justify-center mb-6 text-[#FF2E2E] border border-[#FF2E2E]/10 rounded-full shadow-inner group-hover:scale-110 transition-all">
                  {item.icon}
                </div>
                <h4 className="text-[13px] font-black uppercase text-white mb-2 tracking-widest leading-none">{item.title}</h4>
                <p className="text-[10px] text-white/50 leading-normal font-bold uppercase tracking-widest opacity-90">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="w-full flex flex-col items-center">
            <p className="text-[16px] text-[#BFBFBF] font-black uppercase italic px-4 leading-[1.4] text-pretty text-center max-w-[380px]">
              Acesso instantâneo. <br/> <span className="text-[#00C853]">Seu parceiro de treino não vai entender</span> de onde veio aquele estrangulamento.
            </p>
          </div>
        </Section>

        {/* Frame 6 — O que você recebe (Visual) */}
        <Section className="!py-24">
          <Badge>ARSENAL COMPLETO</Badge>
          <h2 className="text-[28px] sm:text-[32px] font-display font-black tracking-tight mb-10 uppercase italic leading-[1.1] max-w-[400px] mx-auto text-white text-balance text-center">
            O SEU ARSENAL COMPLETO DE ATAQUE:
          </h2>

          <div className="w-full px-2 max-w-[440px] mx-auto text-left">
            {/* Display Area for Active Product */}
            <div className="bg-[#121212] rounded-[24px] border border-[#1F1F1F] overflow-hidden shadow-2xl flex flex-col mb-6 min-h-[380px] justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProductTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full flex flex-col justify-between"
                >
                  {/* Product Image Container */}
                  <div className="w-full aspect-[4/3] overflow-hidden bg-black/40 flex items-center justify-center relative p-6">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 pointer-events-none" />
                    <img 
                      src={productsList[activeProductTab].img} 
                      alt={productsList[activeProductTab].title} 
                      className="max-h-[100%] max-w-[100%] object-contain transition-transform duration-500 hover:scale-105"
                      referrerPolicy="no-referrer" 
                      loading="lazy" 
                      decoding="async"
                    />
                  </div>
                  
                  {/* Product Metadata & Description with clean alignment */}
                  <div className="p-6 text-left border-l-4 border-l-[#FF2E2E] bg-gradient-to-r from-[#161616] to-[#121212] flex-grow">
                    <span className="text-[#FF2E2E] text-[10px] font-black tracking-[0.15em] mb-1.5 block uppercase leading-none">
                      {productsList[activeProductTab].tag}
                    </span>
                    <h3 className="text-[18px] font-display font-black uppercase italic text-white leading-tight mb-2">
                      {productsList[activeProductTab].title}
                    </h3>
                    <p className="text-[13px] text-[#BFBFBF] font-medium leading-relaxed italic opacity-85">
                      {productsList[activeProductTab].details}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Compact Selector Tabs / Switchers */}
            <div className="grid grid-cols-1 gap-2.5">
              {productsList.map((product, i) => (
                <button
                  key={i}
                  onClick={() => setActiveProductTab(i)}
                  className={`w-full text-left p-4 rounded-[16px] border transition-all duration-300 flex items-center gap-3.5 outline-none cursor-pointer ${
                    activeProductTab === i
                      ? "bg-[#FF2E2E]/10 border-[#FF2E2E]/50 shadow-[0_4px_20px_rgba(255,46,46,0.12)]"
                      : "bg-[#121212] border-[#1F1F1F] hover:border-white/10"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 transition-all ${
                    activeProductTab === i
                      ? "bg-[#FF2E2E] text-white"
                      : "bg-[#1C1C1C] text-[#BFBFBF] border border-white/5"
                  }`}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[12px] font-black uppercase tracking-wider truncate transition-colors ${
                      activeProductTab === i ? "text-white" : "text-white/60"
                    }`}>
                      {product.tabTitle}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Section>

        {/* Frame 7 — Bônus Exclusivos */}
        <Section className="bg-[#121212] !py-24">
          <Badge>BÔNUS ULTRA-EXCLUSIVOS</Badge>
          <h2 className="text-[28px] sm:text-[32px] font-display font-black tracking-tight mb-10 uppercase italic leading-[1.1] max-w-[400px] mx-auto text-white text-balance text-center">
            +2 BÔNUS DE ALTO IMPACTO
          </h2>
          
          <div className="space-y-8 w-full mb-12 px-2 max-w-[440px] mx-auto text-left">
            {[
              { 
                title: "Bjj Competidor Pro", 
                desc: "Mentalidade de Campeão no Tatame", 
                img: IMAGES.mockups.competitor,
                details: "Anule o jogo daquele cara chato e casca grossa da sua academia. Aprenda a controlar a adrenalina no campeonato e no rola sob pressão."
              },
              { 
                title: "Bjj Pack 50 Aulas Extras", 
                desc: "50 Ajustes e Detalhes Utilizados por Faixas Pretas", 
                img: IMAGES.mockups.pack50,
                details: "Ajustes invisíveis e transições escondidas para surpreender até os faixas pretas e deixar todo mundo de queixo caído no tatame."
              }
            ].map((item, i) => (
              <div key={i} className="bg-[#0B0B0B] rounded-[24px] border border-[#1F1F1F] overflow-hidden text-left relative group hover:border-[#FF2E2E]/30 transition-all shadow-xl flex flex-col">
                <div className="w-full aspect-video overflow-hidden bg-black/40 flex items-center justify-center">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
                </div>
                <div className="p-8 relative text-left">
                  <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#FF2E2E] opacity-50"></div>
                  <span className="text-[#FF2E2E] text-[11px] font-black tracking-widest mb-1 block uppercase leading-none">{item.desc}</span>
                  <h3 className="text-[20px] font-display font-black uppercase italic text-white leading-tight mb-3">{item.title}</h3>
                  <p className="text-[13px] text-white/55 leading-relaxed font-medium italic">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
          
          <Button href="#oferta" variant="primary">
            QUERO O ARSENAL COMPLETO
          </Button>
        </Section>

        {/* Ajuste 03 — Transformação */}
        <Section className="!py-24 bg-[#0B0B0B] border-b border-[#1F1F1F]">
          <Badge>PODER TÁTICO</Badge>
          <h2 className="text-[28px] sm:text-[32px] font-display font-black tracking-tight mb-8 uppercase italic leading-[1.1] max-w-[420px] mx-auto text-white text-balance text-center">
            O SEGREDO DO TATAME: QUEM TEM REPERTÓRIO, FINALIZA MAIS.
          </h2>

          <div className="text-center w-full space-y-6 max-w-[400px] mx-auto text-[15px] text-[#BFBFBF] leading-relaxed">
            <p className="text-pretty">
              Cada detalhe milimétrico adiciona uma nova armadilha que o oponente não consegue prever.
            </p>
            <p className="text-pretty font-semibold text-white">
              Cada alavanca anatômica anula a força bruta daquele cara pesado da academia.
            </p>
            <p className="text-pretty">
              Cada resposta imediata faz o outro cansar e dar o tapinha por puro desespero.
            </p>
            <div className="h-px bg-white/5 my-6 w-1/2 mx-auto" />
            <p className="text-[14px] text-white/50 italic leading-snug">
              Este arsenal não foi desenhado para ser bonito ou teórico.
            </p>
            <p className="text-[15px] text-[#FF2E2E] font-black uppercase italic tracking-tight pt-2">
              Este sistema foi testado na pele, em campeonatos e treinos duros, para construir sua reputação e respeito no tatame, treino após treino.
            </p>
          </div>
        </Section>

        {/* Ajuste 05 — Quem mais aproveita (Alteração 5) */}
        <Section className="!py-24 bg-[#0B0B0B] border-b border-[#1F1F1F]">
          <Badge>PARA QUEM É</Badge>
          <h2 className="text-[28px] sm:text-[32px] font-display font-black tracking-tight mb-4 uppercase italic leading-[1.1] max-w-[420px] mx-auto text-white text-balance text-center">
            ESTE SISTEMA É PARA VOCÊ?
          </h2>
          <p className="text-[15px] text-[#BFBFBF] font-medium mb-12 italic max-w-[360px] mx-auto leading-relaxed text-pretty text-center opacity-80">
            O BJJ System foi projetado para praticantes sérios que recusam ser meros figurantes nos rolas cotidianos.
          </p>

          <div className="grid grid-cols-1 gap-4 w-full mb-10 max-w-[400px] mx-auto text-left">
            {[
              "Faixas brancas que querem evoluir mais rápido e acelerar sua adaptação no tatame",
              "Faixas azuis e roxas que estão travados e querem desenvolver um jogo nível faixa preta",
              "Quem odeia chegar nos 100kg ou na montada e ficar sem saber o que fazer até o tempo acabar",
              "Quem sente que os parceiros de academia já decoraram todo o seu jogo",
              "Quem quer ouvir elogios do professor e ver o respeito de todas as graduações",
              "Quem quer o controle absoluto de mandar no rola, sem depender da sorte ou do gás"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-4 bg-[#121212] p-5 rounded-2xl border border-white/5 hover:border-[#FF2E2E]/30 transition-all duration-300">
                <CheckCircle2 className="w-5 h-5 text-[#00C853] shrink-0" />
                <span className="text-[13px] sm:text-[14px] font-black uppercase italic text-white/90 leading-tight">{text}</span>
              </div>
            ))}
          </div>

          <div className="text-center w-full max-w-[400px] mx-auto">
            <p className="text-[15px] text-[#FF2E2E] font-black uppercase italic tracking-tight leading-relaxed text-center">
              Se você quer parar de treinar sempre com as mesmas opções de hoje e começar a entrar no próximo rola com muito mais respostas, o seu lugar é aqui dentro. OSS.
            </p>
          </div>
        </Section>

        {/* Nova Seção — Respeito Social */}
        <Section className="bg-[#0B0B0B] !py-20 border-b border-[#1F1F1F]">
          <Badge>RESPEITO SOCIAL</Badge>
          <h2 className="text-[24px] sm:text-[28px] font-display font-black tracking-tight mb-4 uppercase italic leading-[1.15] max-w-[440px] mx-auto text-white text-balance text-center">
            O PRIMEIRO SINAL DE QUE SEU JOGO MUDOU NÃO É A FINALIZAÇÃO.
          </h2>
          <p className="text-[14px] text-[#BFBFBF] font-medium mb-10 italic max-w-[340px] mx-auto leading-relaxed text-pretty text-center opacity-80">
            A técnica silenciosa se impõe muito antes do bater de mão no tatame.
          </p>

          <div className="grid grid-cols-1 gap-4 w-full max-w-[440px] mx-auto px-2 text-left">
            {[
              "os faixas azuis começam a evitar sua guarda;",
              "os parceiros perguntam onde você aprendeu aquilo;",
              "o professor começa a observar mais seus treinos;",
              "os cascas-grossas deixam de te tratar como iniciante;",
              "você percebe que finalmente está impondo respeito."
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4 bg-[#121212] p-5 rounded-[20px] border border-[#1F1F1F] hover:border-[#FF2E2E]/30 transition-all duration-300">
                <div className="w-6 h-6 rounded-full bg-[#00C853]/10 flex items-center justify-center shrink-0 border border-[#00C853]/20 text-[#00C853] font-black text-xs">
                  ✔
                </div>
                <span className="text-[13.5px] font-bold text-white/95 leading-normal italic">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* Nova Seção — Gatilho do Amanhã no Treino */}
        <Section className="bg-[#0D0D0D] !py-20 border-b border-[#1F1F1F]">
          <Badge>DECISÃO CRUCIAL</Badge>
          <h2 className="text-[24px] sm:text-[28px] font-display font-black tracking-tight mb-4 uppercase italic leading-[1.15] max-w-[440px] mx-auto text-white text-balance text-center">
            OSS, GUERREIRO. <br/> AMANHÃ VOCÊ VAI ENTRAR NO TREINO DE UM DESTES DOIS JEITOS:
          </h2>
          
          <div className="grid grid-cols-1 gap-6 w-full max-w-[440px] mx-auto px-2 mt-8">
            
            {/* CARD 1: CONTINUAR TORCENDO */}
            <div className="bg-[#121212]/50 p-6 rounded-[24px] border border-red-950/45 relative overflow-hidden text-left">
              <span className="text-[11px] font-black uppercase tracking-wider text-red-500 italic block mb-3">OPÇÃO 01 • ESTAGNAÇÃO</span>
              <h3 className="text-[16px] font-display font-black uppercase italic text-white mb-4 leading-snug">
                CONTINUAR TORCENDO PARA CONSEGUIR UMA POSIÇÃO.
              </h3>
              <p className="text-[13px] text-white/50 font-medium italic leading-relaxed">
                Você vai continuar fazendo força excessiva, dependendo do gás, tomando os mesmos amassos e torcendo por uma chance de finalização que quase nunca vem.
              </p>
            </div>

            {/* CARD 2: ENTRAR SABENDO EXATAMENTE */}
            <div className="bg-[#141F16]/40 p-6 rounded-[24px] border border-[#00C853]/20 relative overflow-hidden shadow-[0_10px_30px_rgba(0,200,83,0.05)] text-left">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#00C853] italic block mb-3">OPÇÃO 02 • DOMÍNIO COMPLETO</span>
              <h3 className="text-[16px] font-display font-black uppercase italic text-white mb-4 leading-snug">
                ENTRAR SABENDO EXATAMENTE:
              </h3>
              <div className="space-y-3">
                {[
                  "qual posição buscar;",
                  "qual ataque iniciar;",
                  "qual resposta usar;",
                  "como forçar o tapinha."
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-[13px] text-white font-black uppercase tracking-tight italic">
                    <span className="text-[#00C853] shrink-0">✓</span>
                    <span className="leading-snug text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </Section>

        {/* Frame 7 — Planos */}
        <Section id="oferta" bgImage={IMAGES.belt} overlayOpacity={0.9} className="!py-24">
          <Badge>ESCOLHA SEU DESTINO</Badge>
          <h2 className="text-[32px] font-display font-black tracking-tight mb-8 uppercase italic leading-[1.1] max-w-[440px] mx-auto text-center text-white text-balance">
            ESCOLHA COMO VOCÊ VAI SE APRESENTAR NO TATAME AMANHÃ
          </h2>

          {/* Dynamic Countdown Timer Block (Priority 4) */}
          <div ref={timerRef} className="w-full bg-[#1A0F0F] border border-[#FF2E2E]/30 p-6 rounded-[24px] text-center shadow-lg max-w-[420px] mb-12 mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FF2E2E] animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF2E2E]">DESCONTO DE PARCEIRO DE TATAME</span>
            </div>
            <p className="text-[13px] text-white/80 font-black uppercase italic mb-4 leading-snug">
              Essa janela promocional vai fechar em:
            </p>
            <div className="flex items-center justify-center gap-3 font-mono text-[30px] font-black text-[#FF2E2E] leading-none tracking-tight">
              <div className="bg-black/40 px-3.5 py-2.5 rounded-xl border border-white/5 min-w-[65px]">
                {String(timeLeft.minutes).padStart(2, '0')}
                <span className="block text-[8px] font-black uppercase mt-1 tracking-widest text-white/40 font-sans">Min</span>
              </div>
              <span className="animate-pulse text-2xl">:</span>
              <div className="bg-black/40 px-3.5 py-2.5 rounded-xl border border-white/5 min-w-[65px]">
                {String(timeLeft.seconds).padStart(2, '0')}
                <span className="block text-[8px] font-black uppercase mt-1 tracking-widest text-white/40 font-sans">Seg</span>
              </div>
            </div>
            <p className="text-[11px] text-white/45 mt-3 italic font-medium leading-relaxed">
              Garanta as 150 respostas táticas de faixa preta hoje e mude seu status já no próximo rola.
            </p>
          </div>
          
          <div className="space-y-12 w-full px-2">
            {/* 1. PLANO BÁSICO (VERSÃO LIMITADA - JOGO INCOMPLETO) */}
            <div className="bg-[#121212]/40 p-8 rounded-[28px] border border-white/[0.02] flex flex-col shadow-xl max-w-[420px] mx-auto opacity-50 grayscale hover:opacity-80 transition-all duration-300">
              <div className="text-left mb-6">
                <h3 className="text-[18px] font-display font-black italic mb-2 uppercase tracking-tighter text-white/50 leading-none">VERSÃO LIMITADA</h3>
                <p className="text-[11px] font-black uppercase tracking-widest text-red-500/70 italic leading-none">⚠️ JOGO INCOMPLETO (Sem Refinamento)</p>
              </div>

              <div className="w-full mb-6">
                <img src={IMAGES.mockups.basic} alt="Plano Básico" className="w-[120px] mx-auto h-auto object-contain filter grayscale opacity-20 max-h-[120px]" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
              </div>
              
              <div className="flex items-baseline gap-2 mb-6 justify-start">
                <span className="text-[18px] font-bold text-white/30">R$</span>
                <span className="text-[48px] font-display font-black tracking-tighter text-white/40 leading-none">10</span>
                <span className="text-[14px] font-bold text-white/20">,00</span>
              </div>

              <div className="space-y-4 mb-8 text-left">
                {[
                  "Apenas vídeos brutos sem:",
                  "❌ Ajustes invisíveis",
                  "❌ Sequências automáticas",
                  "❌ Estratégias de faixa preta",
                  "❌ Bônus táticos de evolução",
                  "❌ Evolução acelerada",
                  "❌ Preparação competitiva",
                  "Acesso Vitalício"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[11.5px] font-black uppercase tracking-tight text-white/40">
                    <CheckCircle className="w-4 h-4 text-white/10 shrink-0" />
                    <span className={item.includes('❌') ? 'line-through opacity-30 text-red-500/50 leading-none font-medium' : 'leading-none'}>{item}</span>
                  </div>
                ))}
              </div>

              <Button href="https://ggcheckout.app/checkout/v5/pT8jvrhGHW91A6Ve5cJv" variant="outline" className="!h-[52px] !text-[11px] !rounded-[8px] opacity-50 hover:opacity-100 !border-white/10 !text-white/60 hover:!bg-white/5">
                QUERO ENTRAR INCOMPLETO (R$10)
              </Button>
            </div>

            {/* 2. 🔥 PLANO COMPLETO (ARSENAL COMPLETO DE GUERRA - DOMÍNIO TOTAL) */}
            <div className="bg-[#140D0D] p-10 rounded-[32px] flex flex-col relative overflow-hidden border-2 border-[#FF2E2E] shadow-[0_20px_50px_rgba(255,46,46,0.18)] scale-[1.03] z-10 max-w-[420px] mx-auto">
              <div className="absolute top-0 right-0 bg-[#FF2E2E] text-white px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] italic rounded-bl-[16px]">
                RECOMENDADO • DOMÍNIO TOTAL
              </div>
              
              <div className="text-left mb-8">
                <h3 className="text-[24px] font-display font-black italic mb-2 uppercase tracking-tighter text-white leading-none">ARSENAL COMPLETO</h3>
                <p className="text-[12px] font-black uppercase tracking-widest text-[#FF2E2E] italic leading-none">Sistema de Combate Completo + Todos os Bônus</p>
              </div>

              {/* Plan Mockup */}
              <div className="w-full mb-8">
                <img src={IMAGES.mockups.bundle} alt="Domínio Total" className="w-full h-auto object-contain drop-shadow-2xl" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
              </div>

              {/* Value strike-through (Priority 4) */}
              <div className="text-left mb-2">
                <span className="text-[11px] font-extrabold uppercase text-white/30 tracking-widest">
                  DE <span className="line-through decoration-[#FF2E2E] decoration-2">R$ 97,00</span> POR APENAS:
                </span>
              </div>
              
              <div className="flex items-baseline gap-2 mb-8 justify-start">
                <span className="text-[24px] font-bold text-white">R$</span>
                <span className="text-[84px] font-display font-black tracking-tighter text-white leading-none">27</span>
                <span className="text-[20px] font-bold text-white/40">,00</span>
              </div>

              <div className="mb-6 text-left border-y border-white/5 py-6">
                <div className="mb-6 space-y-3">
                  <p className="text-[14px] text-white font-black uppercase italic leading-tight">
                    ANULE OS MAIS FORTES DA SUA ACADEMIA.
                  </p>
                  <p className="text-[14px] text-[#FF2E2E] font-black uppercase italic leading-tight">
                    DESENVOLVA A MENTE TÁTICA DE UM FAIXA PRETA.
                  </p>
                  <p className="text-[12px] text-white/60 font-medium leading-relaxed">
                    Com este mapa tático, você sabe exatamente o que fazer de cada posição. Seu jogo flui por alavanca e pressão, sem fazer força física.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                  {[
                    "Guarda Imparável",
                    "Controle e Ataques da Montada",
                    "Controle e Ataques de Costas",
                    "Pressão nos 100kg",
                    "Arm-locks Cirúrgicos",
                    "Triângulos Sem Espaço",
                    "Estrangulamentos Justos",
                    "Ajustes Finos de Faixa Preta",
                    "Acesso Vitalício no Drive",
                    "Atualizações Gratuitas"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-1 text-[11px] font-black uppercase tracking-tight text-[#FF2E2E] italic">
                      <span className="shrink-0">✔</span>
                      <span className="text-white/80 leading-none">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-5 mb-12 flex-grow text-left">
                {[
                  "150 RESPOSTAS TÁTICAS DE FAIXA PRETA",
                  "BJJ Checklist de Drills",
                  "Guia de Evolução Acelerada",
                  "Manual de Nutrição e Gás",
                  "Atualizações livres para sempre",
                  "Acesso Vitalício no Drive",
                  "🎁 BÔNUS: BJJ Competidor Pro",
                  "🎁 BÔNUS: Pack 50 Aulas Extras"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-[13px] font-black uppercase tracking-tight text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-[#FF2E2E] shrink-0" />
                    <span className="leading-none">{item}</span>
                  </div>
                ))}
              </div>
              
              <Button href="https://ggcheckout.app/checkout/v5/SqHw200SWhnENdwkDiKo" variant="primary" className="!h-[74px] !text-[16px] shadow-2xl shadow-[#FF2E2E]/20 animate-pulse hover:animate-none">
                QUERO IMPOR RESPEITO NO PRÓXIMO ROLA
              </Button>
              
              <p className="mt-8 text-[11px] font-black uppercase tracking-widest text-white/30 text-center leading-none">
                PAGAMENTO ÚNICO • SEM MENSALIDADES • RISCO ZERO
              </p>
            </div>
          </div>

          <div className="mt-20 text-center">
            <p className="text-[13px] text-[#BFBFBF] font-black uppercase italic mb-8 tracking-widest">
              CONFIRME SEU PEDIDO AGORA.
            </p>
            <div className="p-6 border border-[#FF2E2E]/20 bg-[#FF2E2E]/5 rounded-[16px] backdrop-blur-md">
              <p className="text-[18px] font-display font-black uppercase italic tracking-tight text-white leading-tight">
                Se você fechar essa página agora… <br />
                <span className="text-[#FF2E2E]">você pode continuar treinando com o mesmo repertório de hoje. Ou pode entrar no próximo treino com muito mais respostas.</span>
              </p>
            </div>
          </div>
        </Section>

        {/* Frame 8 — Garantia */}
        <Section className="!py-24">
          <div className="bg-[#121212] p-12 rounded-[32px] border border-[#1F1F1F] text-center w-full shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#FF2E2E]/5 blur-3xl -z-10 rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#00C853]/5 blur-3xl -z-10 rounded-full"></div>
            
            <div className="flex flex-col items-center">
              <div className="w-[120px] h-[120px] bg-black/40 p-4 rounded-full border border-white/5 shadow-2xl mb-12 flex items-center justify-center">
                <img 
                  src={IMAGES.guarantee} 
                  alt="Garantia" 
                  className="w-full h-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <Badge>RISCO ABSOLUTAMENTE ZERO</Badge>
              <h2 className="text-[32px] font-display font-black tracking-tight uppercase italic mb-8 leading-[1] text-white text-balance text-center">
                7 DIAS DE TESTE DE TATAME (GARANTIA DO MESTRE).
              </h2>
              <p className="text-[15px] text-[#BFBFBF] font-medium leading-[1.6] mb-12 italic max-w-[90%] mx-auto text-pretty text-center">
                Entre no tatame, aplique o material, teste no rola. Se em até 7 dias após a compra você não notar que os caras começaram a respeitar seu jogo, eu devolvo cada centavo do seu dinheiro. Sem mimimi e sem burocracia. Acordo de cavalheiros, de parceiro de tatame para parceiro de tatame. OSS.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  "Acordo de Tatame",
                  "Reembolso Instantâneo",
                  "Risco Zero"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#00C853]" />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white leading-none">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Frame 9 — FAQ */}
        <Section className="bg-[#121212] !py-24 text-center">
          <Badge>RESPOSTAS TÁTICAS</Badge>
          <h2 className="text-[32px] font-display font-black uppercase italic tracking-tight mb-12 leading-[1] max-w-[440px] mx-auto text-white text-balance">
            DÚVIDAS <br/><span className="text-[#FF2E2E]">FREQUENTES DO TATAME</span>
          </h2>
          <div className="w-full px-2 text-left">
            <FAQItem 
              question="Como recebo o acesso ao material?" 
              answer="Imediatamente. Assim que o Pix é aprovado, você recebe o link no seu WhatsApp e E-mail. É clicar, abrir o Google Drive e começar a estudar escondido antes do treino." 
            />
            <FAQItem 
              question="O material serve para quem é faixa branca ou iniciante?" 
              answer="Com certeza. Na verdade, é melhor começar logo do jeito certo do que passar anos apanhando para descobrir as coisas sozinho. O material dá as respostas prontas que você precisa para encurtar caminho." 
            />
            <FAQItem 
              question="Preciso de parceiro para aproveitar as aulas?" 
              answer="Não precisa de parceiro para estudar. Os detalhes milimétricos são mostrados para você entender a mecânica da alavanca e da pressão sozinho. Quando você pisar no tatame, seu corpo vai se mover no piloto automático." 
            />
            <FAQItem 
              question="O acesso expira após algum tempo?" 
              answer="De jeito nenhum, irmão. O acesso é vitalício. Comprou uma vez, é seu para sempre. Pode consultar de onde quiser e quando quiser, inclusive todas as próximas atualizações gratuitas de novas finalizações." 
            />
          </div>
        </Section>

        {/* Ajuste 05 — Decisão Final */}
        <Section className="bg-[#0B0B0B] !py-24 border-t border-[#1F1F1F]" pattern>
          <Badge>A DECISÃO É SUA</Badge>
          <h2 className="text-[26px] sm:text-[30px] font-display font-black leading-[1.1] uppercase italic mb-8 text-white max-w-[440px] mx-auto text-center text-balance">
            CONTINUAR SENDO O CARA QUE OS OUTROS USAM PARA EVOLUIR...<br/>
            <span className="text-[#FF2E2E] mt-2 block">OU COMEÇAR A SER O GUERREIRO QUE FAZ OS OUTROS TOMAREM CUIDADO.</span>
          </h2>
          
          <div className="text-center w-full space-y-6 max-w-[400px] mx-auto text-[15px] text-[#BFBFBF] leading-relaxed mb-10">
            <p className="text-pretty">
              Não mude nada e os resultados continuarão exatamente os mesmos de sempre.
            </p>
            <div className="grid grid-cols-2 gap-3 max-w-[340px] mx-auto my-6 text-[11px] font-black uppercase tracking-wider text-white italic">
              <div className="bg-white/5 py-4 px-4 rounded-xl border border-white/5 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF2E2E]" />
                <span>Respeito das Faixas</span>
              </div>
              <div className="bg-[#121212] py-4 px-4 rounded-xl border border-white/5 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF2E2E]" />
                <span>Controle do Rola</span>
              </div>
              <div className="bg-white/5 py-4 px-4 rounded-xl border border-white/5 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF2E2E]" />
                <span>Ataques Imprevisíveis</span>
              </div>
              <div className="bg-[#121212] py-4 px-4 rounded-xl border border-white/5 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF2E2E]" />
                <span>Gás e Autoridade</span>
              </div>
            </div>
            <p className="text-[16px] text-white font-black uppercase italic tracking-tight">
              A escolha é óbvia. OSS.
            </p>
          </div>

          <Button href="#oferta" variant="primary" className="shadow-[0_10px_40px_rgba(255,46,46,0.45)]">
            QUERO MANDAR NO TATAME HOJE
          </Button>
        </Section>

        {/* Footer */}
        <footer className="py-12 border-t border-[#1F1F1F] bg-[#0B0B0B]">
          <div className="max-w-[480px] mx-auto px-6 text-center">
            <h3 className="text-white font-display font-black italic uppercase tracking-tighter text-[20px] mb-4">BJJ SYSTEM</h3>
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em] mb-8 leading-relaxed">
              &copy; {new Date().getFullYear()} BJJ System. Todos os direitos reservados.<br/>
              Desenvolvido para alta performance no tatame.
            </p>
            <div className="flex justify-center gap-4">
              <Award className="w-5 h-5 text-white/10" />
              <ShieldCheck className="w-5 h-5 text-white/10" />
              <CheckCircle className="w-5 h-5 text-white/10" />
            </div>
          </div>
        </footer>

        {/* Sticky Mobile Bottom CTA (Priority 2) */}
        <AnimatePresence>
          {showStickyCta && (
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-[#120D0D]/95 backdrop-blur-md px-4 py-3.5 border-t border-white/10 z-50 flex items-center justify-between gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]"
              style={{
                paddingBottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
              }}
            >
              <div className="flex flex-col text-left justify-center pl-1 leading-none shrink-0">
                <span className="text-[10px] font-extrabold uppercase text-[#FF2E2E] tracking-wider mb-1 leading-none">DOMÍNIO TOTAL</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-[11px] font-bold text-white/40 line-through">97</span>
                  <span className="text-[11px] font-bold text-white/40">Por</span>
                  <span className="text-[20px] font-black text-white leading-none">R$ 27</span>
                  <span className="text-[10px] font-semibold text-white/40">,00</span>
                </div>
              </div>
              <div className="w-[170px] shrink-0">
                <Button 
                  href="#oferta" 
                  variant="primary" 
                  className="!min-h-[44px] !h-[44px] !rounded-[10px] !text-[12px] !px-4 tracking-wider !font-black uppercase shadow-[0_5px_15px_rgba(255,46,46,0.3)] border-none"
                >
                  QUERO O ARSENAL
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
