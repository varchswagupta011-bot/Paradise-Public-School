import { type ReactNode } from 'react';
import { BarChart3, BookOpen, ChevronRight, LayoutDashboard, LogOut, Shield, Users, UsersRound, X, type LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const adminNav = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/students', label: 'Students', icon: UsersRound },
  { href: '/admin/parents', label: 'Parents & guardians', icon: Users },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const pathname = location.pathname;
  const isActive = (href: string) => href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
  return (
    <div className="admin-shell min-h-[100dvh] text-[hsl(var(--admin-ink))]">
      <div className="mx-auto flex min-h-[100dvh] max-w-[1600px]">
        <aside className="admin-sidebar hidden w-[248px] shrink-0 flex-col p-5 text-white md:flex">
          <Link to="/" className="focus-ring flex items-center gap-3 rounded-xl p-2" data-testid="link-admin-brand-home">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[hsl(var(--accent))] font-display text-xl text-[hsl(var(--admin-ink))]">P</span>
            <span><span className="block font-display text-lg leading-none">Paradise</span><span className="mt-1 block font-mono-school text-[.55rem] uppercase tracking-[.18em] text-white/50">Office desk</span></span>
          </Link>
          <div className="mt-12 px-3 admin-eyebrow text-white/40">School operations</div>
          <nav className="mt-3 space-y-1" aria-label="Admin navigation">
            {adminNav.map(({ href, label, icon: Icon }) => <Link key={href} to={href} className={`focus-ring flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${isActive(href) ? 'bg-white/12 text-white' : 'text-white/58 hover:bg-white/7 hover:text-white'}`} data-testid={`link-admin-nav-${label.toLowerCase().replaceAll(' ', '-')}`}>
              <Icon size={17} strokeWidth={1.8} /><span className="flex-1">{label}</span>{isActive(href) && <ChevronRight size={14} className="text-[hsl(var(--accent))]" />}
            </Link>)}
          </nav>
          <div className="mt-auto">
            <div className="mb-4 rounded-xl border border-white/10 bg-white/6 p-4"><div className="flex items-center gap-2 text-xs font-semibold"><Shield size={15} className="text-[hsl(var(--accent))]" />Staff access</div><p className="mt-2 text-[.68rem] leading-5 text-white/45">Private workspace for the Paradise office team.</p></div>
            <Link to="/" className="focus-ring flex items-center gap-3 rounded-xl px-3 py-3 text-xs font-semibold text-white/55 hover:bg-white/7 hover:text-white" data-testid="link-admin-back-to-site"><LogOut size={16} />Back to public site</Link>
          </div>
        </aside>
        <div className="min-w-0 flex-1">
          <header className="flex min-h-[76px] items-center justify-between border-b border-[hsl(var(--admin-ink)/.09)] bg-[hsl(var(--admin-cream)/.86)] px-5 backdrop-blur-md sm:px-8">
            <div className="flex items-center gap-3 md:hidden">
              <Link to="/" className="grid h-9 w-9 place-items-center rounded-lg bg-[hsl(var(--admin-ink))] font-display text-lg text-[hsl(var(--accent))]" data-testid="link-admin-mobile-brand">P</Link>
              <span className="font-display text-lg">Office desk</span>
            </div>
            <div className="hidden items-center gap-2 text-xs text-[hsl(var(--admin-ink)/.55)] md:flex"><span className="h-2 w-2 rounded-full bg-[hsl(var(--admin-teal))]" />Academic year 2025–26 <span className="mx-1 text-[hsl(var(--admin-ink)/.2)]">/</span> Bengaluru campus</div>
            <div className="flex items-center gap-3">
              <Link to="/" className="focus-ring hidden rounded-full border border-[hsl(var(--admin-ink)/.14)] px-3 py-2 text-xs font-bold text-[hsl(var(--admin-ink))] hover:bg-white sm:inline-flex" data-testid="link-admin-view-site">View public site</Link>
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[hsl(var(--admin-teal))] font-mono-school text-xs font-bold text-white" data-testid="text-admin-user-avatar">AK</div>
              <div className="hidden text-left sm:block"><div className="text-xs font-bold">Anita Krishnan</div><div className="text-[.68rem] text-[hsl(var(--admin-ink)/.5)]">School office</div></div>
            </div>
          </header>
          <div className="border-b border-[hsl(var(--admin-ink)/.08)] bg-[hsl(var(--admin-cream))] px-5 py-3 md:hidden">
            <nav className="flex gap-2 overflow-x-auto" aria-label="Mobile admin navigation">{adminNav.map(({ href, label, icon: Icon }) => <Link key={href} to={href} className={`focus-ring inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-bold ${isActive(href) ? 'bg-[hsl(var(--admin-ink))] text-white' : 'bg-white/70 text-[hsl(var(--admin-ink)/.62)]'}`} data-testid={`link-admin-mobile-nav-${label.toLowerCase().replaceAll(' ', '-')}`}><Icon size={14} />{label}</Link>)}</nav>
          </div>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}

export function AdminPageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return <div className="flex flex-col justify-between gap-6 border-b border-[hsl(var(--admin-ink)/.1)] pb-8 lg:flex-row lg:items-end"><div className="admin-enter"><div className="admin-eyebrow">{eyebrow}</div><h1 className="mt-3 font-display text-4xl leading-[.98] tracking-tight text-[hsl(var(--admin-ink))] sm:text-5xl">{title}</h1><p className="mt-4 max-w-2xl text-sm leading-6 text-[hsl(var(--admin-ink)/.59)]">{description}</p></div>{action && <div className="admin-enter admin-delay-1 shrink-0">{action}</div>}</div>;
}

export function AdminButton({ children, onClick, type = 'button', variant = 'primary', disabled = false, icon }: { children: ReactNode; onClick?: () => void; type?: 'button' | 'submit'; variant?: 'primary' | 'quiet' | 'coral'; disabled?: boolean; icon?: ReactNode }) {
  const style = variant === 'primary' ? 'bg-[hsl(var(--admin-ink))] text-white hover:bg-[hsl(219_48%_24%)]' : variant === 'coral' ? 'bg-[hsl(var(--admin-coral))] text-white hover:bg-[hsl(12_67%_55%)]' : 'border border-[hsl(var(--admin-ink)/.14)] bg-white/65 text-[hsl(var(--admin-ink))] hover:bg-white';
  return <button type={type} onClick={onClick} disabled={disabled} className={`focus-ring inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${style}`} data-testid={`button-admin-${typeof children === 'string' ? children.toLowerCase().replaceAll(' ', '-') : 'action'}`}>{children}{icon}</button>;
}

export function AdminStat({ label, value, detail, icon: Icon, tone = 'teal' }: { label: string; value: string; detail: string; icon: LucideIcon; tone?: 'teal' | 'gold' | 'coral' | 'navy' }) {
  const colors = { teal: 'bg-[hsl(var(--admin-teal)/.12)] text-[hsl(var(--admin-teal))]', gold: 'bg-[hsl(var(--accent)/.2)] text-[hsl(34_63%_29%)]', coral: 'bg-[hsl(var(--admin-coral)/.14)] text-[hsl(var(--admin-coral))]', navy: 'bg-[hsl(var(--admin-ink)/.09)] text-[hsl(var(--admin-ink))]' };
  return <div className="admin-card admin-card-lift p-5" data-testid={`stat-admin-${label.toLowerCase().replaceAll(' ', '-')}`}><div className="flex items-start justify-between"><div className={`grid h-9 w-9 place-items-center rounded-lg ${colors[tone]}`}><Icon size={17} /></div><span className="admin-eyebrow text-[hsl(var(--admin-ink)/.43)]">Live</span></div><div className="mt-6 font-display text-3xl text-[hsl(var(--admin-ink))]">{value}</div><div className="mt-1 text-xs font-bold text-[hsl(var(--admin-ink)/.68)]">{label}</div><div className="mt-2 text-[.68rem] text-[hsl(var(--admin-ink)/.47)]">{detail}</div></div>;
}

export function AdminLoading() {
  return <div className="space-y-4" data-testid="status-admin-loading"><div className="h-20 animate-pulse rounded-2xl bg-[hsl(var(--admin-ink)/.07)]" /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[1, 2, 3, 4].map(item => <div key={item} className="h-36 animate-pulse rounded-2xl bg-[hsl(var(--admin-ink)/.07)]" />)}</div><div className="h-64 animate-pulse rounded-2xl bg-[hsl(var(--admin-ink)/.07)]" /></div>;
}

export function AdminError({ onRetry }: { onRetry: () => void }) {
  return <div className="admin-card p-10 text-center" data-testid="status-admin-error"><div className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-[hsl(var(--admin-coral)/.14)] text-[hsl(var(--admin-coral))]"><X size={19} /></div><h2 className="mt-4 font-display text-2xl">The office ledger is taking a moment.</h2><p className="mx-auto mt-2 max-w-sm text-sm text-[hsl(var(--admin-ink)/.58)]">We could not load this view. Your records are safe — try the connection again.</p><button onClick={onRetry} className="focus-ring mt-6 rounded-lg bg-[hsl(var(--admin-ink))] px-4 py-2.5 text-xs font-bold text-white" data-testid="button-admin-retry">Try again</button></div>;
}

export function EmptyState({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return <div className="admin-card p-12 text-center" data-testid="status-admin-empty"><div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[hsl(var(--admin-teal)/.13)] text-[hsl(var(--admin-teal))]"><BookOpen size={21} /></div><h2 className="mt-5 font-display text-2xl">{title}</h2><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[hsl(var(--admin-ink)/.57)]">{body}</p>{action && <div className="mt-6">{action}</div>}</div>;
}

export function formatCurrency(value: number | undefined) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value ?? 0);
}