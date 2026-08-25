import { useState, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { ArrowUpRight, Check, ChevronDown, Compass, Facebook, Instagram, Mail, Menu, Phone, School, Sparkles, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'Our School' },
  { href: '/academics', label: 'Academics' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/notices', label: 'Notices' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="focus-ring flex items-center gap-3" data-testid="link-brand-home">
      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border ${light ? 'border-white/20 bg-white/10 text-[hsl(var(--accent))]' : 'border-[hsl(var(--primary)/.12)] bg-[hsl(var(--primary))] text-[hsl(var(--accent))]'}`}>
        <School size={23} strokeWidth={1.8} />
      </span>
      <span className="leading-none">
        <span className={`block font-display text-[1.08rem] font-semibold tracking-tight ${light ? 'text-white' : 'text-[hsl(var(--primary))]'}`}>Paradise</span>
        <span className={`mt-1 block text-[.62rem] font-bold uppercase tracking-[.19em] ${light ? 'text-white/60' : 'text-[hsl(var(--muted-foreground))]'}`}>Public School</span>
      </span>
    </Link>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' | 'soft' | 'gold'; icon?: ReactNode };
export function Button({ variant = 'primary', icon, children, className = '', ...props }: ButtonProps) {
  const styles = {
    primary: 'bg-[hsl(var(--primary))] text-white hover:bg-[hsl(219_54%_22%)]',
    outline: 'border border-[hsl(var(--primary)/.18)] bg-transparent text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white',
    soft: 'bg-[hsl(var(--secondary)/.13)] text-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary)/.22)]',
    gold: 'bg-[hsl(var(--accent))] text-[hsl(var(--primary))] hover:bg-[hsl(43_87%_64%)]',
  };
  return <button type={props.type ?? 'button'} className={`focus-ring inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-colors duration-200 ${styles[variant]} ${className}`} {...props}>{children}{icon}</button>;
}

export function Card({ children, className = '', ...props }: { children: ReactNode; className?: string } & HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-2xl border border-[hsl(var(--border))] bg-white ${className}`} {...props}>{children}</div>;
}

export function SectionHeading({ eyebrow, title, body, light = false, align = 'left' }: { eyebrow: string; title: string; body?: string; light?: boolean; align?: 'left' | 'center' }) {
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-2xl`}>
      <div className={`eyebrow mb-5 flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''} ${light ? 'text-[hsl(var(--accent))]' : 'text-[hsl(var(--secondary))]'}`}>
        <span className="h-px w-7 bg-current" />{eyebrow}
      </div>
      <h2 className={`line-accent font-display text-4xl leading-[1.06] tracking-tight sm:text-5xl ${light ? 'text-white' : 'text-[hsl(var(--primary))]'} ${align === 'center' ? 'after:left-1/2 after:-translate-x-1/2' : ''}`}>{title}</h2>
      {body && <p className={`mt-7 text-base leading-7 ${light ? 'text-white/68' : 'text-[hsl(var(--muted-foreground))]'}`}>{body}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, body, accent = 'sky' }: { eyebrow: string; title: string; body: string; accent?: 'sky' | 'gold' }) {
  return (
    <section className="hero-grid relative overflow-hidden bg-[hsl(var(--primary))] py-20 sm:py-28">
      <div className="container-school relative">
        <div className={`absolute -right-10 -top-20 h-64 w-64 rounded-full blur-3xl ${accent === 'gold' ? 'bg-[hsl(var(--accent)/.18)]' : 'bg-[hsl(var(--secondary)/.18)]'}`} />
        <div className="max-w-3xl reveal">
          <div className={`eyebrow mb-6 flex items-center gap-3 ${accent === 'gold' ? 'text-[hsl(var(--accent))]' : 'text-[hsl(var(--secondary))]'}`}><span className="h-px w-8 bg-current" />{eyebrow}</div>
          <h1 className="font-display text-5xl leading-[.98] tracking-tight text-white sm:text-7xl">{title}</h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">{body}</p>
        </div>
      </div>
    </section>
  );
}

export function LoadingState() {
  return <div className="space-y-3 rounded-2xl border border-[hsl(var(--border))] bg-white p-7" data-testid="status-loading"><div className="h-3 w-28 animate-pulse rounded-full bg-[hsl(var(--muted))]" /><div className="h-7 w-3/4 animate-pulse rounded-lg bg-[hsl(var(--muted))]" /><div className="h-4 w-full animate-pulse rounded-full bg-[hsl(var(--muted))]" /></div>;
}

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return <div className="fixed bottom-5 left-1/2 z-[60] flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center gap-3 rounded-xl bg-[hsl(var(--primary))] px-4 py-3 text-sm font-semibold text-white shadow-2xl" role="status" data-testid="status-toast"><span className="grid h-7 w-7 place-items-center rounded-full bg-[hsl(var(--accent))] text-[hsl(var(--primary))]"><Check size={15} /></span><span className="flex-1">{message}</span><button onClick={onClose} className="focus-ring p-1 text-white/60 hover:text-white" aria-label="Dismiss notification" data-testid="button-dismiss-toast"><X size={16} /></button></div>;
}

export function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <header className="relative z-40 border-b border-[hsl(var(--border)/.7)] bg-[hsl(var(--background)/.94)] backdrop-blur-md">
      <div className="container-school flex h-[78px] items-center justify-between gap-4">
        <BrandMark />
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary navigation">
          {navItems.map((item) => <Link key={item.href} to={item.href} className={`focus-ring rounded-md px-1 py-2 text-[.78rem] font-bold transition-colors ${location.pathname === item.href ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]'}`} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</Link>)}
        </nav>
        <div className="hidden items-center gap-3 xl:flex">
          <Link to="/admin" className="focus-ring rounded-full px-3 py-2.5 text-xs font-bold text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]" data-testid="link-header-admin">Staff admin</Link>
          <Link to="/login" className="focus-ring rounded-full border border-[hsl(var(--primary)/.16)] px-4 py-2.5 text-xs font-bold text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white" data-testid="link-parent-login">Parent portal</Link>
          <Link to="/contact" className="focus-ring rounded-full bg-[hsl(var(--accent))] px-4 py-2.5 text-xs font-bold text-[hsl(var(--primary))] hover:bg-[hsl(43_87%_64%)]" data-testid="link-header-enquire">Enquire now <ArrowUpRight className="ml-1 inline" size={14} /></Link>
        </div>
        <button onClick={() => setOpen(!open)} className="focus-ring rounded-lg p-2 text-[hsl(var(--primary))] xl:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} data-testid="button-mobile-menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div className="border-t border-[hsl(var(--border))] bg-[hsl(var(--background))] px-5 py-4 xl:hidden"><nav className="container-school flex flex-col gap-1" aria-label="Mobile navigation">{navItems.map(item => <Link onClick={() => setOpen(false)} key={item.href} to={item.href} className="focus-ring rounded-lg px-3 py-3 text-sm font-bold text-[hsl(var(--primary))] hover:bg-[hsl(var(--muted))]" data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</Link>)}<Link onClick={() => setOpen(false)} to="/admin" className="rounded-lg px-3 py-3 text-sm font-bold text-[hsl(var(--secondary))] hover:bg-[hsl(var(--muted))]" data-testid="link-mobile-admin">Staff admin</Link><Link onClick={() => setOpen(false)} to="/login" className="mt-2 rounded-lg bg-[hsl(var(--primary))] px-3 py-3 text-sm font-bold text-white" data-testid="link-mobile-login">Parent portal</Link></nav></div>}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-[hsl(var(--primary))] text-white">
      <div className="container-school grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div><BrandMark light /><p className="mt-6 max-w-xs text-sm leading-6 text-white/58">A joyful, rigorous learning community helping young people find their voice and use it well.</p><div className="mt-7 flex gap-2"><a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="focus-ring grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/65 hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]" aria-label="Instagram" data-testid="link-footer-instagram"><Instagram size={16} /></a><a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="focus-ring grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/65 hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]" aria-label="Facebook" data-testid="link-footer-facebook"><Facebook size={16} /></a></div></div>
        <div><div className="eyebrow mb-5 text-[hsl(var(--accent))]">Explore</div><div className="flex flex-col gap-3 text-sm text-white/65">{navItems.slice(1, 5).map(item => <Link key={item.href} to={item.href} className="focus-ring hover:text-white" data-testid={`link-footer-${item.label.toLowerCase()}`}>{item.label}</Link>)}</div></div>
        <div><div className="eyebrow mb-5 text-[hsl(var(--accent))]">Community</div><div className="flex flex-col gap-3 text-sm text-white/65"><Link to="/events" className="focus-ring hover:text-white" data-testid="link-footer-events">School calendar</Link><Link to="/gallery" className="focus-ring hover:text-white" data-testid="link-footer-gallery">Campus life</Link><Link to="/contact" className="focus-ring hover:text-white" data-testid="link-footer-contact">Visit the campus</Link><Link to="/login" className="focus-ring hover:text-white" data-testid="link-footer-portal">Parent portal</Link></div></div>
        <div><div className="eyebrow mb-5 text-[hsl(var(--accent))]">Come say hello</div><p className="text-sm leading-6 text-white/65">18, Lakeview Road<br />Bengaluru, Karnataka 560102</p><a href="tel:+918012345678" className="focus-ring mt-5 flex items-center gap-2 text-sm font-semibold text-white hover:text-[hsl(var(--accent))]" data-testid="link-footer-phone"><Phone size={15} /> +91 80 1234 5678</a><a href="mailto:hello@paradisepublic.school" className="focus-ring mt-2 flex items-center gap-2 text-sm font-semibold text-white hover:text-[hsl(var(--accent))]" data-testid="link-footer-email"><Mail size={15} /> hello@paradisepublic.school</a></div>
      </div>
      <div className="border-t border-white/10"><div className="container-school flex flex-col justify-between gap-3 py-5 text-[.68rem] text-white/40 sm:flex-row"><span>© 2025 Paradise Public School. All rights reserved.</span><span>Knowledge <span className="text-[hsl(var(--accent))]">•</span> Character <span className="text-[hsl(var(--accent))]">•</span> Excellence</span></div></div>
    </footer>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return <div className="school-shell min-h-[100dvh] bg-[hsl(var(--background))]"><Navbar />{children}<Footer /></div>;
}

export function Stat({ value, label }: { value: string; label: string }) {
  return <div><div className="font-display text-4xl text-[hsl(var(--accent))]">{value}</div><div className="mt-1 text-xs font-bold uppercase tracking-[.12em] text-white/58">{label}</div></div>;
}

export function Tag({ children, color = 'sky' }: { children: ReactNode; color?: 'sky' | 'gold' | 'navy' }) {
  const styles = { sky: 'bg-[hsl(var(--secondary)/.13)] text-[hsl(199_65%_34%)]', gold: 'bg-[hsl(var(--accent)/.2)] text-[hsl(34_63%_29%)]', navy: 'bg-[hsl(var(--primary)/.08)] text-[hsl(var(--primary))]' };
  return <span className={`inline-flex rounded-full px-3 py-1 text-[.68rem] font-bold uppercase tracking-[.12em] ${styles[color]}`}>{children}</span>;
}