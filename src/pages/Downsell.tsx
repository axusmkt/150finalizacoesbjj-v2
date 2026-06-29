import React, { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, ShieldCheck, Zap, CheckCircle,
  Activity, ChevronDown, Lock, Award, X, Mail, LayoutGrid, Infinity
} from "lucide-react";

// --- Components ---

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success';
  onClick?: () => void;
  href?: string;
}

const Button = ({ children, className = "", variant = "primary", onClick, href }: ButtonProps) => {
  const baseStyles = "w-full min-h-[64px] px-8 rounded-[12px] font-black text-[16px] uppercase tracking-tighter transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer relative overflow-hidden group shadow-2xl active:scale-95 outline-none focus:ring-2 focus:ring-[#FF2E2E]/50";
  
  const variants = {
    primary: "bg-[#FF2E2E] text-white hover:bg-[#ff4d4d] active:bg-[#FF2E2E]/90 shadow-[0_0_30px_rgba(255,46,46,0.3)]",
    success: "bg-[#00C853] text-white hover:bg-[#00E676] active:bg-[#00C853]/90 shadow-[0_0_30px_rgba(0,200,83,0.3)]",
    secondary: "bg-white text-black hover:bg-slate-100 active:bg-slate-200",
    outline: "bg-transparent border-2 border-white/20 text-white hover:border-white/40 hover:bg-white/5 active:bg-white/10",
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
    className={`py-20 px-5 relative overflow-hidden ${className}`}
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
    {glow && (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#FF2E2E]/10 blur-[120px] rounded-full pointer-events-none -z-10" />
    )}
    <div className="max-w-[480px] mx-auto relative z-10 flex flex-col items-center text-center">
      {children}
    </div>
  </section>
);

const Badge = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
  <span className={`inline-flex items-center px-5 py-2 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-[#FF2E2E] mb-8 rounded-full ${className}`}>
    <span className="w-1.5 h-1.5 bg-[#FF2E2E] mr-2 rounded-full animate-pulse shadow-[0_0_10px_#FF2E2E]" />
    {children}
  </span>
);

const AccordionItem = ({ title, sub, desc, items, isOpen, onToggle }: { title: string, sub: string, desc: string, items: string[], isOpen: boolean, onToggle: () => void, key?: any }) => {
  return (
    <div className="bg-[#121212] border border-white/5 rounded-[20px] mb-4 overflow-hidden shadow-2xl transition-all duration-300 hover:border-[#FF2E2E]/20">
      <div 
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onToggle()}
        className="w-full p-6 flex justify-between items-center text-left group cursor-pointer outline-none"
      >
        <div className="flex flex-col pr-4">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#FF2E2E] mb-1">{sub}</span>
          <span className="text-[18px] font-display font-black uppercase text-white tracking-tight leading-none mb-1 group-hover:text-[#FF2E2E] transition-colors">{title}</span>
          <span className="text-[11px] font-medium text-white/30 italic leading-tight">{desc}</span>
        </div>
        <div className={`p-2.5 rounded-full bg-white/5 transition-all duration-500 shrink-0 ${isOpen ? 'bg-[#FF2E2E]/10 text-[#FF2E2E] rotate-180' : 'text-white/20'}`}>
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
            className="overflow-hidden bg-white/[0.02]"
          >
            <div className="px-6 pb-6 pt-2">
              <div className="h-px w-full bg-white/5 mb-6" />
              <div className="grid grid-cols-1 gap-3">
                {items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-[#FF2E2E] rounded-full shadow-[0_0_8px_#FF2E2E]" />
                    <span className="text-[13px] text-white/80 font-bold uppercase tracking-tight">{item}</span>
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

export default function Downsell() {
  const [openCard, setOpenCard] = useState<number | null>(null);

  const modules = [
    { 
      title: "ESCAPES DA MONTADA", 
      sub: "20 VÍDEO AULAS ORGANIZADAS",
      desc: "Aprenda como sobreviver na pior posição do Jiu-Jítsu sem entrar em desespero.",
      items: ["Upa escape", "Elbow escape", "Recuperação de guarda", "Reposição de quadril", "Defesa sob pressão"] 
    },
    { 
      title: "ESCAPES DAS COSTAS", 
      sub: "15 VÍDEO AULAS ORGANIZADAS",
      desc: "Sobreviva ao domínio das costas e aprenda como neutralizar o mata-leão.",
      items: ["Defesa de mata-leão", "Controle de mãos", "Saída para guarda", "Rotação defensiva", "Reposição segura"] 
    },
    { 
      title: "DEFESA DE ARM-LOCK", 
      sub: "15 VÍDEO AULAS ORGANIZADAS",
      desc: "Aprenda a fechar os espaços e salvar seu braço mesmo quando o golpe parece encaixado.",
      items: ["Postura correta", "Defesa antecipada", "Retirada de braço", "Empilhamento", "Saídas técnicas"] 
    },
    { 
      title: "DEFESA DE TRIÂNGULO", 
      sub: "10 VÍDEO AULAS ORGANIZADAS",
      desc: "Saiba como manter a postura e escapar do triângulo antes do fechamento do cadeado.",
      items: ["Postura anti-triângulo", "Controle de quadril", "Abertura de espaço", "Defesa rápida", "Reação segura"] 
    },
    { 
      title: "ESCAPES DOS 100KG", 
      sub: "10 VÍDEO AULAS ORGANIZADAS",
      desc: "Reponha a guarda com eficiência e pare de aceitar a pressão lateral.",
      items: ["Criação de espaço", "Recuperação de guarda", "Inversões defensivas", "Controle de braço", "Timing defensivo"] 
    },
    { 
      title: "BÔNUS PDF", 
      sub: "3 PDFs ESTRATÉGICOS",
      desc: "Checklist anti-finalização e mapas de sobrevivência rápida.",
      items: ["Checklist anti-finalização", "Mapa de defesa rápida", "Guia de sobrevivência no rola"] 
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white/90 antialiased selection:bg-[#FF2E2E] selection:text-white font-sans">
      <div className="max-w-[480px] mx-auto bg-[#0B0B0B] min-h-screen shadow-2xl relative overflow-hidden">
        
        {/* Frame 1 — Hero */}
        <Section className="!pt-24 !pb-20" glow>
          <Badge>PACOTE DE DEFESA</Badge>
          
          <h1 className="text-[34px] sm:text-[38px] font-display font-black leading-[1.05] tracking-tighter uppercase italic mb-6 text-white text-balance max-w-[440px] mx-auto text-center">
            VOCÊ PODE ATÉ SABER FINALIZAR…<br/>
            <span className="text-[#FF2E2E]">MAS SE NÃO SOUBER ESCAPAR, VAI CONTINUAR BATENDO NO ROLA.</span>
          </h1>
          
          <p className="text-[15px] text-white/50 font-medium leading-relaxed mb-10 text-pretty max-w-[360px] mx-auto text-center">
            Aprenda defesas, escapes e reações para sobreviver nas posições mais perigosas do Jiu-Jítsu.
          </p>

          {/* Product Mockup */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full mb-8 relative flex justify-center"
          >
             <img 
              src="https://i.ibb.co/hF8B05XZ/1-Aq-Mm-removebg-preview.png" 
              alt="Jiu-Jítsu Defensivo" 
              className="w-full h-auto drop-shadow-[0_20px_50px_rgba(255,46,46,0.15)]"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </motion.div>

          <div className="grid grid-cols-2 gap-3 w-full mb-10">
            {[
              "Escapes da montada", "Defesa de arm-lock", 
              "Saídas das costas", "Escapes dos 100kg", 
              "Defesa de triângulo", "Reações rápidas"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/5 py-3 px-4 rounded-xl border border-white/[0.03]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00C853] shrink-0" />
                <span className="text-[10px] font-black uppercase tracking-tight text-white/80 leading-tight text-left">{text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {[
              { icon: <CheckCircle className="w-3 h-3" />, text: "Acesso Imediato" },
              { icon: <LayoutGrid className="w-3 h-3" />, text: "Google Drive" },
              { icon: <Infinity className="w-3 h-3" />, text: "Vitalício" },
              { icon: <ShieldCheck className="w-3 h-3" />, text: "Aulas Organizadas" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="text-[#FF2E2E]">{item.icon}</div>
                <span className="text-[9px] font-black uppercase tracking-widest text-white/40">{item.text}</span>
              </div>
            ))}
          </div>

          <Button href="#oferta" variant="success" className="!h-[74px] shadow-[0_15px_40px_rgba(0,200,83,0.25)]">
            QUERO ME DEFENDER MELHOR
          </Button>
        </Section>

        {/* Frame 2 — Dor */}
        <Section className="bg-[#0D0D0D] !py-24 border-y border-white/[0.05]">
          <Badge>FIM DO DESESPERO</Badge>
          <h2 className="text-[28px] sm:text-[32px] font-display font-black leading-[1.1] uppercase italic mb-8 text-white text-balance max-w-[400px] mx-auto text-center">
            O PIOR NÃO É TOMAR O TAP.<br/>
            <span className="text-[#FF2E2E]">É NÃO SABER COMO ESCAPAR.</span>
          </h2>
          
          <div className="text-center w-full space-y-6 max-w-[400px] mx-auto">
            <p className="text-[15px] text-white/60 leading-relaxed text-pretty">
              Tem lutador que trava quando fica por baixo. Entrega o braço. Perde a postura. Entra em desespero. E bate sem entender o erro.
            </p>
            <p className="text-[15px] text-white/80 font-black uppercase italic tracking-tight">
              Você sente a pressão. <br/> O braço preso. <br/> O ar sumindo. <br/> E bate antes mesmo de tentar escapar.
            </p>
            <p className="text-[15px] text-[#FF2E2E] font-black uppercase italic tracking-tight pt-2">
              O problema não é força. <br/> É não saber o que fazer sob pressão.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-10">
              {[
                "Montada", "Costas", "Arm-lock", "100kg"
              ].map((pos, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl flex flex-col items-center">
                  <ShieldCheck className="w-6 h-6 text-[#FF2E2E]/40 mb-2" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-white/60">{pos}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Frame 3 — O que recebe */}
        <Section className="!py-24">
          <Badge>SISTEMA DEFENSIVO</Badge>
          <h2 className="text-[28px] sm:text-[32px] font-display font-black leading-[1.1] uppercase italic mb-12 text-white text-balance max-w-[400px] mx-auto text-center">
            O QUE VOCÊ VAI RECEBER
          </h2>

          <div className="w-full text-left max-w-[440px] mx-auto">
            {modules.map((m, i) => (
              <AccordionItem 
                key={i}
                title={m.title}
                sub={m.sub}
                desc={m.desc}
                items={m.items}
                isOpen={openCard === i}
                onToggle={() => setOpenCard(openCard === i ? null : i)}
              />
            ))}
          </div>
        </Section>

        {/* Frame 4 — Benefícios */}
        <Section className="bg-[#0D0D0D] !py-24 border-y border-white/[0.05]">
          <Badge>EVOLUÇÃO REAL</Badge>
          <h2 className="text-[28px] sm:text-[32px] font-display font-black leading-[1.1] uppercase italic mb-10 text-white text-balance max-w-[400px] mx-auto text-center">
            PARE DE BATER SEM REAGIR.
          </h2>
          
          <div className="grid grid-cols-1 gap-3 w-full mb-12 max-w-[400px] mx-auto">
            {[
              "Saiba exatamente como escapar",
              "Pare de entrar em pânico",
              "Reaja com calma sob pressão",
              "Crie espaço mesmo nas posições ruins",
              "Sobreviva mais tempo no rola",
              "Volte para o jogo antes do tap"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-4 bg-[#121212] p-5 rounded-2xl border border-white/5 hover:border-[#FF2E2E]/30 transition-all duration-300">
                <CheckCircle2 className="w-5 h-5 text-[#00C853] shrink-0" />
                <span className="text-[13px] sm:text-[14px] font-black uppercase italic text-white/90 leading-none text-left">{text}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Frame 5 — Oferta */}
        <Section id="oferta" className="!py-24" glow>
          <div className="bg-[#121212] p-8 sm:p-12 rounded-[40px] border-2 border-[#FF2E2E] w-full relative shadow-[0_40px_80px_rgba(0,0,0,0.8)] max-w-[440px] mx-auto">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#FF2E2E] text-white px-8 py-3 rounded-full font-black text-[12px] italic uppercase tracking-[0.2em] shadow-2xl text-nowrap">
              RECUPERAÇÃO DE VENDA
            </div>

            <Badge className="mt-4 mb-6 bg-[#FF2E2E]/10 border-transparent">JIU-JÍTSU DEFENSIVO</Badge>
            
            <div className="mb-8 relative flex justify-center">
               <img 
                src="https://i.ibb.co/hF8B05XZ/1-Aq-Mm-removebg-preview.png" 
                alt="Jiu-Jítsu Defensivo" 
                className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                referrerPolicy="no-referrer"
              />
            </div>

            <h2 className="text-[24px] sm:text-[28px] font-display font-black leading-tight uppercase italic mb-4 text-white text-balance text-center">
              ACESSO IMEDIATO AO JIU-JÍTSU DEFENSIVO
            </h2>

            <p className="text-[13px] text-white/40 italic mb-8 text-center px-4 leading-snug">
              Mais de 70 vídeo aulas organizadas + PDFs defensivos estratégicos.
            </p>

            <div className="flex flex-col items-center mb-10">
              <p className="text-[10px] font-black uppercase text-[#FF2E2E] mb-4 bg-[#FF2E2E]/10 px-4 py-1 rounded-full">OFERTA DE RECUPERAÇÃO DISPONÍVEL SOMENTE AGORA</p>
              <span className="text-[15px] text-white/30 line-through font-bold mb-1 tracking-tight">De R$ 27,00</span>
              <div className="flex items-baseline gap-2">
                <span className="text-[24px] font-bold text-white">R$</span>
                <span className="text-[64px] sm:text-[72px] font-display font-black tracking-tighter text-white leading-none">10</span>
                <span className="text-[24px] font-bold text-white/50">,00</span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FF2E2E] mt-3">PAGAMENTO ÚNICO • SEM MENSALIDADE</span>
            </div>

            <div className="space-y-4 mb-10 text-left bg-white/[0.02] p-6 rounded-[24px] border border-white/5">
              {[
                "70+ vídeo aulas defensivas",
                "Escapes organizados por posição",
                "PDFs estratégicos",
                "Acesso vitalício",
                "Google Drive",
                "Atualizações futuras",
                "Suporte"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-3.5 h-3.5 text-[#00C853] shrink-0" />
                  <span className="text-[12px] font-black uppercase tracking-tight text-white/80 leading-none">{item}</span>
                </div>
              ))}
            </div>

            <Button href="https://ggcheckout.app/checkout/v5/V6QDpRpW6DwrgnkB5l1L" variant="success" className="!h-[74px] !text-[17px]">
              QUERO O JIU-JÍTSU DEFENSIVO
            </Button>

            <p className="text-[10px] text-white/20 mt-4 text-center font-bold uppercase tracking-widest">
              Acesso enviado automaticamente após o pagamento.
            </p>
          </div>
        </Section>

        {/* Frame 6 — Garantia */}
        <Section className="!py-24">
          <Badge>RISCO ZERO</Badge>
          <h2 className="text-[34px] sm:text-[38px] font-display font-black leading-tight uppercase italic mb-8 text-white text-balance max-w-[340px] mx-auto text-center">
            RISCO <span className="text-[#FF2E2E]">ZERO.</span>
          </h2>
          <p className="text-[15px] text-white/50 leading-relaxed italic max-w-[320px] mx-auto text-pretty text-center mb-10">
            Teste o conteúdo por 7 dias. Se não sentir mais segurança defensiva nos treinos, devolvemos 100% do valor.
          </p>
          
          <div className="flex gap-4 opacity-30 grayscale contrast-125 justify-center">
            <ShieldCheck className="w-10 h-10" />
            <Lock className="w-10 h-10" />
            <Award className="w-10 h-10" />
          </div>
        </Section>

        {/* Frame 7 — CTA Final */}
        <Section className="bg-[#0D0D0D] !py-28 border-t border-white/5 text-center">
          <Badge>OPORTUNIDADE FINAL</Badge>
          <h2 className="text-[28px] sm:text-[32px] font-display font-black leading-[1.05] uppercase italic mb-6 text-white text-balance max-w-[420px] mx-auto text-center">
            VOCÊ JÁ APRENDEU COMO FINALIZAR.<br/>
            <span className="text-[#FF2E2E]">AGORA APRENDA COMO SOBREVIVER.</span>
          </h2>
          <p className="text-[14px] text-white/40 mb-12 px-8 text-pretty max-w-[340px] mx-auto text-center">
            Pare de travar nas posições ruins e aprenda a escapar antes do tap.
          </p>
          <Button href="#oferta" variant="success" className="!h-[74px] shadow-[0_15px_40px_rgba(0,200,83,0.25)] max-w-[380px] mx-auto">
            QUERO ME DEFENDER MELHOR
          </Button>
        </Section>

        {/* Footer */}
        <footer className="py-16 border-t border-white/5 bg-[#0B0B0B] text-center">
          <div className="flex flex-col items-center px-6">
            <h3 className="text-[22px] font-display font-black italic uppercase tracking-tighter text-white mb-4">BJJ DEFESA</h3>
            <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.3em] mb-12 leading-relaxed">
              &copy; {new Date().getFullYear()} Jiu-Jítsu Defensivo. Todos os direitos reservados.
            </p>
            <nav className="flex gap-6 mb-12">
              {["Termos", "Privacidade", "Suporte"].map((item, i) => (
                <a key={i} href="#" className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors">{item}</a>
              ))}
            </nav>
            <div className="flex gap-6 opacity-10">
              <ShieldCheck className="w-6 h-6" />
              <Award className="w-6 h-6" />
              <Lock className="w-6 h-6" />
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
