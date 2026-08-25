import { ArrowRight, BarChart3, CircleDollarSign, GraduationCap, UsersRound } from 'lucide-react';
import { useGetAdminSummary, useListParents, useListStudents } from '@workspace/api-client-react';
import { Link } from 'react-router-dom';
import { AdminError, AdminLoading, AdminPageHeader, AdminStat, EmptyState, formatCurrency } from '@/components/admin';

export default function AdminOverview() {
  const summaryQuery = useGetAdminSummary();
  const studentsQuery = useListStudents();
  const parentsQuery = useListParents();
  if (summaryQuery.isLoading) return <div className="p-5 sm:p-8"><AdminLoading /></div>;
  if (summaryQuery.isError || !summaryQuery.data) return <div className="p-5 sm:p-8"><AdminError onRetry={() => summaryQuery.refetch()} /></div>;
  const summary = summaryQuery.data;
  const students = studentsQuery.data ?? [];
  const parents = parentsQuery.data ?? [];
  return <div className="p-5 sm:p-8 lg:p-10">
    <AdminPageHeader eyebrow="Monday, 16 June 2025 · office desk" title="Good morning, Anita." description="A clear view of the people, patterns and follow-ups that keep Paradise moving." action={<Link to="/admin/students" className="focus-ring inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--admin-ink))] px-4 py-2.5 text-xs font-bold text-white hover:bg-[hsl(219_48%_24%)]" data-testid="link-admin-overview-students">Open student register <ArrowRight size={15} /></Link>} />
    <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <AdminStat label="Students on register" value={summary.totalStudents.toLocaleString('en-IN')} detail={`${summary.activeStudents} currently active`} icon={GraduationCap} tone="navy" />
      <AdminStat label="Family relationships" value={summary.totalParents.toLocaleString('en-IN')} detail="Parents and guardians linked" icon={UsersRound} tone="teal" />
      <AdminStat label="Fees collected" value={formatCurrency(summary.feesCollected)} detail={`${formatCurrency(summary.feesDue)} still due`} icon={CircleDollarSign} tone="gold" />
      <AdminStat label="Attendance this term" value={`${summary.attendanceRate}%`} detail="Across active students" icon={BarChart3} tone="coral" />
    </section>
    <section className="mt-8 grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
      <div className="admin-card p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4"><div><div className="admin-eyebrow">Relationship-aware queue</div><h2 className="mt-2 font-display text-2xl">Who needs your attention?</h2></div><Link to="/admin/parents" className="focus-ring text-xs font-bold text-[hsl(var(--admin-teal))] hover:underline" data-testid="link-admin-overview-parents">View families <ArrowRight size={13} className="ml-1 inline" /></Link></div>
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {students.slice(0, 4).map(student => <Link to={`/admin/students/${student.id}`} key={student.id} className="admin-card-lift flex items-center gap-3 rounded-xl border border-[hsl(var(--admin-ink)/.08)] bg-white/45 p-3" data-testid={`link-admin-attention-${student.id}`}><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[hsl(var(--admin-teal)/.14)] font-mono-school text-[.62rem] font-bold text-[hsl(var(--admin-teal))]">{student.firstName.slice(0, 1)}{student.lastName.slice(0, 1)}</span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold">{student.firstName} {student.lastName}</span><span className="mt-1 block text-[.68rem] text-[hsl(var(--admin-ink)/.5)]">{student.className} · {student.section} <span className="mx-1">·</span> {formatCurrency(student.fees.due)} due</span></span><ArrowRight size={14} className="text-[hsl(var(--admin-ink)/.35)]" /></Link>)}
          {!studentsQuery.isLoading && !students.length && <EmptyState title="A quiet register" body="Students will appear here once the register has records." action={<Link to="/admin/students" className="text-xs font-bold text-[hsl(var(--admin-teal))]" data-testid="link-admin-overview-empty-students">Go to students</Link>} />}
        </div>
      </div>
      <div className="rounded-[1.1rem] bg-[hsl(var(--admin-ink))] p-6 text-white sm:p-7">
        <div className="admin-eyebrow text-[hsl(var(--accent))]">A small pulse check</div><h2 className="mt-3 font-display text-3xl">The human<br />behind the number.</h2>
        <div className="mt-10 border-t border-white/12 pt-5"><div className="flex items-end justify-between"><span className="text-xs text-white/55">Active register</span><span className="font-mono-school text-sm text-[hsl(var(--accent))]">{summary.totalStudents ? Math.round(summary.activeStudents / summary.totalStudents * 100) : 0}%</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[hsl(var(--accent))]" style={{ width: `${summary.totalStudents ? Math.round(summary.activeStudents / summary.totalStudents * 100) : 0}%` }} /></div></div>
        <p className="mt-7 text-sm leading-6 text-white/58">{parents.length ? `${parents.length} family records are ready to connect the next conversation to the right child.` : 'Family records will make the next conversation easier to place.'}</p>
        <Link to="/admin/parents" className="focus-ring mt-7 inline-flex items-center gap-2 text-xs font-bold text-[hsl(var(--accent))] hover:text-white" data-testid="link-admin-overview-family-records">Browse family records <ArrowRight size={14} /></Link>
      </div>
    </section>
    <section className="mt-8 grid gap-4 md:grid-cols-3">
      {[{href: '/admin/students', icon: GraduationCap, title: 'Student register', text: 'Find a learner, update assignments or open the complete record.'}, {href: '/admin/parents', icon: UsersRound, title: 'Family directory', text: 'Keep guardians, contact details and sibling links in one place.'}, {href: '/admin/students', icon: CircleDollarSign, title: 'Fee follow-ups', text: `${formatCurrency(summary.feesDue)} is currently due across the register.`}].map(({ href, icon: Icon, title, text }) => <Link to={href} key={title} className="admin-card admin-card-lift flex items-start gap-4 p-5" data-testid={`link-admin-quick-${title.toLowerCase().replaceAll(' ', '-')}`}><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[hsl(var(--admin-coral)/.13)] text-[hsl(var(--admin-coral))]"><Icon size={17} /></span><span><span className="block font-bold">{title}</span><span className="mt-1 block text-xs leading-5 text-[hsl(var(--admin-ink)/.55)]">{text}</span></span><ArrowRight size={15} className="ml-auto mt-1 text-[hsl(var(--admin-ink)/.3)]" /></Link>)}
    </section>
  </div>;
}