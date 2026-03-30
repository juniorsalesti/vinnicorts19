/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { Scissors, MapPin, Clock, Instagram, Phone, Star, Award, ShieldCheck, Zap, Menu, X, ArrowRight, ChevronRight, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    // Hero Entrance
    const tl = gsap.timeline();
    tl.from('.hero-line', {
      y: 120,
      opacity: 0,
      duration: 1.5,
      ease: 'power4.out',
      stagger: 0.1
    })
    .from('.hero-img', {
      scale: 1.2,
      opacity: 0,
      duration: 2,
      ease: 'power2.out'
    }, 0)
    .from('.hero-meta', {
      x: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=1');

    // Section Reveals
    const reveals = gsap.utils.toArray('.reveal');
    reveals.forEach((el: any) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      });
    });

    // Parallax Images
    gsap.utils.toArray('.parallax-img').forEach((img: any) => {
      gsap.to(img, {
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        y: -100,
        ease: 'none'
      });
    });

    // Bento Stagger
    gsap.from('.bento-card', {
      scrollTrigger: {
        trigger: '.bento-grid',
        start: 'top 80%'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out'
    });

  }, { scope: containerRef });

  const services = [
    { name: 'Corte de Elite', price: 'R$ 60', desc: 'Visagismo avançado e finalização premium.', img: 'https://images.unsplash.com/photo-1621605815841-aa89740b028e?auto=format&fit=crop&q=80&w=800' },
    { name: 'Barba Terapia', price: 'R$ 50', desc: 'Toalha quente, óleos essenciais e relaxamento.', img: 'https://images.unsplash.com/photo-1512690196252-741ef2c7a30b?auto=format&fit=crop&q=80&w=800' },
    { name: 'Combo Vinni', price: 'R$ 100', desc: 'Corte + Barba + Lavagem especial.', img: 'https://images.unsplash.com/photo-1599351431247-f5793384797d?auto=format&fit=crop&q=80&w=800' },
    { name: 'Pigmentação', price: 'R$ 40', desc: 'Definição milimétrica para sua barba.', img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-ink text-white selection:bg-white selection:text-black">
      
      {/* NAVIGATION */}
      <nav className={`fixed top-0 left-0 w-full z-[100] px-6 md:px-12 flex justify-between items-center transition-all duration-500 ${scrolled ? 'bg-black/90 py-4 border-b border-white/10 backdrop-blur-md' : 'py-8 mix-blend-difference'}`}>
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
            <Scissors className="w-5 h-5" />
          </div>
          <span className="font-display text-xl font-bold tracking-tighter uppercase">Vinni Corts019</span>
        </div>
        
        <div className="hidden md:flex items-center gap-12">
          {['Início', 'Serviços', 'Diferenciais', 'Localização'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-[10px] uppercase font-bold tracking-[0.3em] hover:text-white/50 transition-colors"
            >
              {item}
            </a>
          ))}
          <button className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">
            Agendar
          </button>
        </div>

        <button 
          className="md:hidden w-10 h-10 flex items-center justify-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-[90] bg-black transition-transform duration-700 ease-expo ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} flex flex-col items-center justify-center gap-8`}>
        {['Início', 'Serviços', 'Diferenciais', 'Localização'].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`} 
            className="font-display text-5xl font-bold hover:italic transition-all"
            onClick={() => setIsMenuOpen(false)}
          >
            {item}
          </a>
        ))}
      </div>

      {/* HERO SECTION */}
      <section id="início" className="relative h-screen flex flex-col md:flex-row overflow-hidden border-b border-white/5">
        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 pt-24 relative z-10">
          <div className="hero-meta mb-8 flex items-center gap-4">
            <div className="h-[1px] w-12 bg-white/20"></div>
            <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-white/40">Premium Barbershop</span>
          </div>
          
          <h1 className="font-display text-[15vw] md:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase mb-12">
            <div className="overflow-hidden"><div className="hero-line">Onde o</div></div>
            <div className="overflow-hidden"><div className="hero-line text-stroke">Estilo</div></div>
            <div className="overflow-hidden"><div className="hero-line italic text-white/90">É Lei.</div></div>
          </h1>

          <div className="hero-meta flex flex-col md:flex-row items-start md:items-center gap-12">
            <button className="group flex items-center gap-6 bg-white text-black px-10 py-6 rounded-full font-black text-sm uppercase tracking-widest hover:pr-14 transition-all">
              Reservar Agora <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            <p className="max-w-[280px] text-xs text-white/40 leading-relaxed font-medium uppercase tracking-widest">
              Redefinindo a estética masculina com precisão cirúrgica e atendimento de elite.
            </p>
          </div>
        </div>

        <div className="flex-1 h-[50vh] md:h-full relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=2000" 
            alt="Vinni Corts019" 
            className="hero-img w-full h-full object-cover grayscale brightness-75"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink to-transparent md:hidden"></div>
          <div className="absolute bottom-12 right-12 hidden md:block">
            <div className="glass p-8 rounded-2xl max-w-[240px]">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-white text-white" />)}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                "A melhor experiência de barbearia que já tive. O Vinni é um verdadeiro artista."
              </p>
              <div className="mt-4 h-[1px] w-full bg-white/10"></div>
              <span className="mt-4 block text-[8px] uppercase tracking-[0.3em] text-white/40">Ricardo S. — Cliente VIP</span>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="py-6 border-b border-white/5 bg-white text-black overflow-hidden">
        <div className="marquee">
          <div className="marquee-content">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-8 text-xl md:text-3xl font-display font-black uppercase italic tracking-tighter">
                <span>Vinni Corts019</span>
                <Scissors className="w-6 h-6" />
                <span>Corte de Elite</span>
                <Scissors className="w-6 h-6" />
                <span>Barba Premium</span>
                <Scissors className="w-6 h-6" />
                <span>Experiência Única</span>
                <Scissors className="w-6 h-6" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MANIFESTO */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="font-display text-5xl md:text-8xl font-bold leading-[0.9] tracking-tighter uppercase mb-12">
              Não é Apenas <br /><span className="italic text-white/30">Um Corte.</span>
            </h2>
            <div className="flex items-center gap-8">
              <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center">
                <Award className="w-8 h-8 text-white/40" />
              </div>
              <p className="text-white/60 text-lg leading-relaxed max-w-sm">
                Somos o santuário do homem moderno. Um espaço onde a tradição da navalha encontra a precisão do visagismo contemporâneo.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=1000" 
              className="parallax-img absolute inset-0 w-full h-full object-cover grayscale"
              alt="Barber Shop Interior"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="serviços" className="py-32 bg-white text-black">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="reveal flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <div className="max-w-2xl">
              <span className="text-black/40 font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Menu de Excelência</span>
              <h2 className="font-display text-6xl md:text-9xl font-black leading-[0.8] tracking-tighter uppercase">
                Nossos <br /><span className="italic opacity-30">Serviços.</span>
              </h2>
            </div>
            <div className="md:pb-4">
              <p className="text-black/60 max-w-[240px] text-xs font-bold uppercase tracking-widest leading-relaxed border-l-2 border-black/10 pl-8">
                Cada serviço é uma obra de arte personalizada para o seu rosto e estilo de vida.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, idx) => (
              <div key={idx} className="reveal service-card group relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-black">
                <img 
                  src={service.img} 
                  alt={service.name} 
                  className="service-img w-full h-full object-cover grayscale opacity-60 group-hover:opacity-40 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="service-overlay absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-40 transition-opacity"></div>
                
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="bg-white text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{service.price}</span>
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-white text-2xl font-bold uppercase tracking-tighter mb-2">{service.name}</h3>
                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest leading-relaxed opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENTO GRID - DIFERENCIAIS */}
      <section id="diferenciais" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="reveal mb-24 text-center">
          <span className="text-white/40 font-bold uppercase tracking-[0.5em] text-[10px] mb-6 block">Por que nos escolher</span>
          <h2 className="font-display text-5xl md:text-8xl font-bold tracking-tighter uppercase">Diferenciais <span className="italic text-white/30">de Elite.</span></h2>
        </div>

        <div className="bento-grid grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bento-card md:col-span-2 md:row-span-2 glass p-12 rounded-[3rem] flex flex-col justify-between min-h-[500px] group overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
            <div className="relative z-10">
              <Award className="w-12 h-12 text-white mb-8" />
              <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.9] mb-8">Mestria em <br />Cada Detalhe.</h3>
              <p className="text-white/40 text-sm leading-relaxed max-w-sm uppercase tracking-widest font-medium">
                Especialistas em visagismo masculino, dominando desde o clássico até as tendências vanguardistas.
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] group-hover:gap-6 transition-all">
              Nossa Técnica <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div className="bento-card md:col-span-2 glass p-10 rounded-[3rem] flex items-center gap-8 group">
            <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <div>
              <h4 className="text-xl font-bold uppercase tracking-tighter mb-2">Biossegurança</h4>
              <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Materiais 100% descartáveis e esterilização hospitalar.</p>
            </div>
          </div>

          <div className="bento-card md:col-span-1 glass p-10 rounded-[3rem] flex flex-col justify-between group">
            <Zap className="w-8 h-8 text-white/40 group-hover:text-white transition-colors" />
            <div>
              <h4 className="text-xl font-bold uppercase tracking-tighter mb-2">VIP Lounge</h4>
              <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Bar exclusivo e café gourmet.</p>
            </div>
          </div>

          <div className="bento-card md:col-span-1 glass p-10 rounded-[3rem] flex flex-col justify-between group">
            <Clock className="w-8 h-8 text-white/40 group-hover:text-white transition-colors" />
            <div>
              <h4 className="text-xl font-bold uppercase tracking-tighter mb-2">Pontualidade</h4>
              <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Respeito total ao seu tempo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="localização" className="py-32 bg-white text-black">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-black/40 font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Visite-nos</span>
              <h2 className="font-display text-6xl md:text-8xl font-black leading-[0.8] tracking-tighter uppercase mb-12">
                No Coração <br /><span className="italic opacity-30">Da Cidade.</span>
              </h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <MapPin className="w-6 h-6 mt-1" />
                  <div>
                    <h4 className="font-bold uppercase tracking-tighter">Endereço</h4>
                    <p className="text-black/60 text-sm font-medium">Rua Ernesto Alves filho, 189 - Jd Campos Elíseos</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <Clock className="w-6 h-6 mt-1" />
                  <div>
                    <h4 className="font-bold uppercase tracking-tighter">Horário</h4>
                    <p className="text-black/60 text-sm font-medium">Terça — Sábado: 09h às 20h</p>
                  </div>
                </div>
              </div>
              <button className="mt-12 group flex items-center gap-4 text-black font-black text-xs uppercase tracking-[0.3em] border-b-2 border-black/10 pb-2 hover:border-black transition-all">
                Abrir no Google Maps <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
            
            <div className="h-[500px] rounded-[4rem] overflow-hidden border border-black/5 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.023247470659!2d-47.11210862468894!3d-22.91251997925089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c7047716960d%3A0x89e6717f938d873d!2sR.%20Ernesto%20Alves%20Filho%2C%20189%20-%20Jardim%20Campos%20Eliseos%2C%20Campinas%20-%20SP%2C%2013060-043!5e0!3m2!1spt-BR!2sbr!4v1711810700000!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(1) contrast(1.2) brightness(0.9)' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 md:px-12">
        <div className="reveal max-w-5xl mx-auto text-center">
          <h2 className="font-display text-[12vw] md:text-[8vw] font-black leading-[0.8] tracking-tighter uppercase mb-16">
            Sua Melhor <br /><span className="text-stroke">Versão</span> <br /><span className="italic">Começa Aqui.</span>
          </h2>
          <button className="bg-white text-black px-16 py-8 rounded-full font-black text-xl uppercase tracking-widest hover:scale-110 transition-transform shadow-[0_0_80px_rgba(255,255,255,0.2)]">
            Agendar via WhatsApp
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-white/5">
        <div className="px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-8">
              <Scissors className="w-6 h-6" />
              <span className="font-display text-2xl font-bold tracking-tighter uppercase">Vinni Corts019</span>
            </div>
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
              Elevando o padrão da barbearia brasileira através da excelência técnica e atendimento personalizado.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
            <div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-white/40">Navegação</h5>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest">
                <li><a href="#início" className="hover:text-white/50">Início</a></li>
                <li><a href="#serviços" className="hover:text-white/50">Serviços</a></li>
                <li><a href="#diferenciais" className="hover:text-white/50">Diferenciais</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-white/40">Social</h5>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest">
                <li><a href="#" className="hover:text-white/50">Instagram</a></li>
                <li><a href="#" className="hover:text-white/50">WhatsApp</a></li>
                <li><a href="#" className="hover:text-white/50">Facebook</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h5 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-white/40">Contato</h5>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-4">Campinas, SP</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">(19) 99999-9999</p>
            </div>
          </div>
        </div>
        <div className="mt-20 px-6 md:px-12 max-w-7xl mx-auto pt-10 border-t border-white/5 flex justify-between items-center">
          <p className="text-[8px] font-bold uppercase tracking-[0.5em] text-white/20">© 2026 Vinni Corts019</p>
          <p className="text-[8px] font-bold uppercase tracking-[0.5em] text-white/20 italic">Handcrafted for Elite</p>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a 
        href="https://wa.me/5519999999999" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 group"
      >
        <MessageCircle className="w-8 h-8 group-hover:rotate-12 transition-transform" />
        <span className="absolute right-full mr-4 bg-white text-black px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
          Falar com Vinni
        </span>
      </a>
    </div>
  );
}
