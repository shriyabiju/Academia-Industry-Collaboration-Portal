'use client'
import React from 'react'
import Link from 'next/link'
import {
  ArrowRight, CheckCircle2, TrendingUp, Users, Building2,
  GraduationCap, BarChart3, Brain, Target, BookOpen, Zap,
  Shield, Globe, Sparkles, ChevronRight, Star,
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import AnimatedNumber from '@/components/ui/AnimatedNumber'

// ─── Loop steps ───────────────────────────────────────────────────────────────

const loopSteps = [
  { id: 1, label: 'Assess',        desc: 'Adaptive skill evaluation',          color: 'bg-indigo-600',  icon: '📋' },
  { id: 2, label: 'Identify Gaps', desc: 'AI-powered gap analysis',            color: 'bg-indigo-500',  icon: '🔍' },
  { id: 3, label: 'Match',         desc: 'Semantic opportunity matching',       color: 'bg-blue-600',    icon: '✅' },
  { id: 4, label: 'Learn',         desc: 'Personalised training path',         color: 'bg-blue-500',    icon: '📚' },
  { id: 5, label: 'Improve',       desc: 'Verified competency portfolio',      color: 'bg-indigo-500',  icon: '📈' },
  { id: 6, label: 'Reassess',      desc: 'Continuous re-evaluation',           color: 'bg-indigo-600',  icon: '🔄' },
]

// ─── Stats ────────────────────────────────────────────────────────────────────

const stats = [
  { value: 1842, suffix: '+', label: 'Students Assessed' },
  { value: 42,   suffix: '',  label: 'Industry Partners' },
  { value: 287,  suffix: '',  label: 'Active Opportunities' },
  { value: 68,   suffix: '%', label: 'Placement Rate' },
]

// ─── Benefits ────────────────────────────────────────────────────────────────

const benefits = [
  { icon: <Brain size={20} />,    title: 'Skill Intelligence',      desc: 'Continuous, data-driven competency profiling across technical and soft skills.' },
  { icon: <Target size={20} />,   title: 'Explainable Matching',    desc: 'Every opportunity match comes with a clear breakdown of why you qualify.' },
  { icon: <Shield size={20} />,   title: 'Verified Profiles',       desc: 'Assessment-backed skill profiles trusted by 40+ industry partners.' },
  { icon: <Globe size={20} />,    title: 'Closed-Loop Learning',    desc: 'Every skill gap has a clear closure path through curated resources.' },
  { icon: <BarChart3 size={20} />,title: 'Institutional Insights',  desc: 'Real-time analytics help institutions track placement readiness and curriculum gaps.' },
  { icon: <Users size={20} />,    title: 'Multi-Stakeholder',       desc: 'One platform connecting Students, Academicians, Industry and Institutions.' },
]

// ─── Dashboard Preview Card ───────────────────────────────────────────────────

function DashboardPreview() {
  const skills = [
    { name: 'Python',           score: 85, color: 'bg-indigo-500' },
    { name: 'Problem Solving',  score: 82, color: 'bg-blue-500' },
    { name: 'SQL',              score: 65, color: 'bg-indigo-400' },
    { name: 'React',            score: 35, color: 'bg-amber-400' },
    { name: 'Cloud Deployment', score: 25, color: 'bg-red-400' },
  ]

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Glow behind */}
      <div className="absolute -inset-4 bg-gradient-to-br from-indigo-200/40 via-blue-100/30 to-purple-100/20 rounded-3xl blur-2xl" />

      <div className="relative bg-white rounded-2xl border border-gray-100 shadow-card-lg overflow-hidden animate-fade-in-up">
        {/* Header bar */}
        <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-50 border-b border-gray-100">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="ml-2 text-xs text-gray-400 font-medium">Hire-X · Student Dashboard</span>
        </div>

        <div className="p-5 space-y-5">
          {/* Greeting */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">Good morning 👋</p>
              <p className="font-bold text-gray-900">Shriya Biju</p>
              <p className="text-xs text-gray-400">BITS Pilani · CSE · Year 3</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-extrabold text-indigo-600">72%</div>
              <div className="text-xs text-gray-400">Skill Readiness</div>
            </div>
          </div>

          {/* Skill bars */}
          <div className="space-y-2.5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Skill Profile</p>
            {skills.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-700 font-medium">{s.name}</span>
                  <span className="text-gray-400 tabular">{s.score}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${s.color} rounded-full transition-all duration-700`}
                    style={{ width: `${s.score}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Match cards */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
              <div className="text-xl font-bold text-emerald-600">84%</div>
              <div className="text-xs text-gray-600 font-medium">Software Intern</div>
              <div className="text-xs text-gray-400">TechCorp India</div>
            </div>
            <div className="bg-indigo-50 rounded-xl p-3 border border-indigo-100">
              <div className="text-xl font-bold text-indigo-600">76%</div>
              <div className="text-xs text-gray-600 font-medium">Data Analyst</div>
              <div className="text-xs text-gray-400">DataFlow Analytics</div>
            </div>
          </div>

          {/* Action */}
          <div className="bg-indigo-600 rounded-xl px-4 py-2.5 flex items-center justify-between">
            <span className="text-white text-xs font-medium">4 skill gaps to close</span>
            <span className="text-indigo-200 text-xs flex items-center gap-1">
              View <ChevronRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Portal card ──────────────────────────────────────────────────────────────

function PortalCard({
  icon, title, desc, color, href, features,
}: {
  icon: React.ReactNode
  title: string
  desc: string
  color: string
  href: string
  features: string[]
}) {
  return (
    <div className={`rounded-2xl p-6 border ${color} hover:shadow-card-md transition-all duration-200 hover:-translate-y-0.5 group`}>
      <div className="mb-4">{icon}</div>
      <h3 className="font-bold text-gray-900 text-lg mb-1">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-5">{desc}</p>
      <ul className="space-y-2 mb-6">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
            <CheckCircle2 size={14} className="text-indigo-500 mt-0.5 flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <Link href={href}>
        <button className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 group-hover:gap-2.5 transition-all">
          Get Started <ArrowRight size={15} />
        </button>
      </Link>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/60 to-blue-50 pt-16 pb-28">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 mb-6">
                <Sparkles size={13} className="text-indigo-500" />
                <span className="text-xs font-semibold text-indigo-700">Smart India Hackathon 2026</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                From Skills{' '}
                <span className="text-gradient-indigo">to Opportunities</span>
              </h1>

              <p className="mt-6 text-xl text-gray-600 leading-relaxed max-w-lg">
                Hire-X connects academic learning, competency assessment, and industry demand
                through a <strong className="text-gray-800">continuous skill intelligence loop</strong> — so every student,
                academician, and recruiter acts on real data.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login">
                  <Button size="lg" variant="primary" className="shadow-lg">
                    Get Started Free <ArrowRight size={17} />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button size="lg" variant="outline">
                    How It Works
                  </Button>
                </Link>
              </div>

              {/* Stats row */}
              <div className="mt-10 flex flex-wrap gap-6 pt-6 border-t border-gray-200/80">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-extrabold text-indigo-600 tabular">
                      <AnimatedNumber value={s.value} suffix={s.suffix} />
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Dashboard preview */}
            <div className="hidden lg:block">
              <DashboardPreview />
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 animate-fade-in-up">
            <Badge variant="indigo" className="mb-4">The Skill Intelligence Loop</Badge>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">How Hire-X Works</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Unlike a job board, Hire-X operates a continuous intelligence loop — keeping
              your competency profile current and opportunities relevant at every stage.
            </p>
          </div>

          {/* Loop steps — horizontal flow */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-10 left-[8.33%] right-[8.33%] h-px bg-gradient-to-r from-indigo-200 via-blue-200 to-indigo-200" />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {loopSteps.map((step, i) => (
                <div key={step.id} className="flex flex-col items-center text-center group">
                  <div className={`relative z-10 w-20 h-20 rounded-2xl ${step.color} flex flex-col items-center justify-center text-white mb-4 shadow-md group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-200`}>
                    <span className="text-2xl mb-0.5">{step.icon}</span>
                    <span className="text-[9px] font-bold tracking-wide opacity-70">{step.id}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{step.label}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* Loop back indicator */}
            <div className="flex items-center justify-center gap-3 mt-8 text-indigo-500 text-xs font-semibold">
              <div className="h-px w-16 bg-indigo-200" />
              <span className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1.5">
                <span>🔄</span> Continuous loop — never stops improving
              </span>
              <div className="h-px w-16 bg-indigo-200" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOR STUDENTS ──────────────────────────────────────────────────── */}
      <section id="students" className="py-24 bg-gradient-to-br from-indigo-50/50 to-blue-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="indigo" className="mb-4">For Students</Badge>
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight leading-tight">
                Know your skills.<br />Close your gaps.<br />Land the right role.
              </h2>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Stop guessing what companies want. Get assessed, see exactly where you stand,
                and match with opportunities that fit your <em>actual</em> skill profile — not just your resume.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Adaptive domain & soft-skills assessments',
                  'Visual skill intelligence profile with competency scores',
                  'Explainable opportunity matching with gap analysis',
                  'Personalised learning to close every skill gap',
                  'Continuous re-assessment to track improvement',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle2 size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/login" className="inline-block mt-8">
                <Button size="lg" variant="primary">Start Your Assessment <ArrowRight size={17} /></Button>
              </Link>
            </div>

            {/* Preview cards */}
            <div className="space-y-4">
              {/* Skill profile card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-semibold text-gray-900">Shriya Biju</p>
                    <p className="text-xs text-gray-400">BITS Pilani · B.Tech CSE · Year 3</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-extrabold text-indigo-600">72%</div>
                    <div className="text-xs text-gray-400">Overall</div>
                  </div>
                </div>
                {[
                  { skill: 'Python', score: 85 },
                  { skill: 'Problem Solving', score: 82 },
                  { skill: 'SQL', score: 65 },
                  { skill: 'React', score: 35 },
                ].map((s) => (
                  <div key={s.skill} className="mb-2.5">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-gray-700">{s.skill}</span>
                      <span className="text-gray-400 tabular">{s.score}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-700 ${s.score >= 70 ? 'bg-indigo-500' : s.score >= 45 ? 'bg-amber-400' : 'bg-red-400'}`}
                        style={{ width: `${s.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Match card */}
              <div className="bg-white rounded-2xl border border-emerald-100 shadow-card p-5 border-l-4 border-l-emerald-500">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex gap-2 mb-2">
                      <Badge variant="indigo" size="sm">Internship</Badge>
                      <Badge variant="success" size="sm" dot>Strong Match</Badge>
                    </div>
                    <p className="font-semibold text-gray-900">Software Engineering Intern</p>
                    <p className="text-sm text-gray-500 mt-0.5">TechCorp India · Bengaluru</p>
                    <p className="text-xs text-gray-500 mt-2 italic">
                      "Your assessed skill profile matches 84% of required competencies."
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-4 w-16 h-16 rounded-full ring-4 ring-emerald-200 flex flex-col items-center justify-center bg-white">
                    <span className="text-xl font-extrabold text-emerald-600">84%</span>
                    <span className="text-[9px] text-gray-400">match</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOR INDUSTRY ──────────────────────────────────────────────────── */}
      <section id="industry" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Stat grid */}
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
              {[
                { label: 'Student Matches',   value: 1124, suffix: '',  sub: 'across 42 partners',    color: 'indigo' },
                { label: 'Match Accuracy',    value: 78,   suffix: '%', sub: 'avg skill alignment',   color: 'green' },
                { label: 'Time to Hire',      value: 34,   suffix: '%', sub: 'faster shortlisting',   color: 'blue' },
                { label: 'Active Opps',       value: 287,  suffix: '',  sub: 'open right now',        color: 'purple' },
              ].map((stat) => (
                <div key={stat.label}
                  className={`bg-${stat.color}-50 border border-${stat.color}-100 rounded-2xl p-5 text-center`}>
                  <div className={`text-3xl font-extrabold text-${stat.color}-600 tabular`}>
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm font-semibold text-gray-800 mt-1">{stat.label}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{stat.sub}</div>
                </div>
              ))}
            </div>

            <div className="order-1 lg:order-2">
              <Badge variant="info" className="mb-4">For Industry</Badge>
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight leading-tight">
                Find talent that already fits your stack.
              </h2>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Define exact skill requirements per role. Our matching engine surfaces
                students whose <em>assessed competencies</em> align — with transparent, explainable gap analysis.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Define skill requirements by proficiency level',
                  'Auto-ranked student shortlists by match score',
                  "See each candidate's exact skill gaps upfront",
                  'Post internships, projects, training and full-time roles',
                  'Track applications and manage hiring pipeline',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle2 size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/login" className="inline-block mt-8">
                <Button size="lg" variant="primary">Partner With Us <ArrowRight size={17} /></Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOR ACADEMICIANS ──────────────────────────────────────────────── */}
      <section id="academicians" className="py-24 bg-gradient-to-br from-purple-50/50 to-indigo-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="purple" className="mb-4">For Academicians</Badge>
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight leading-tight">
                Bridge expertise with industry reality.
              </h2>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Discover faculty internships, FDPs, research collaborations and mentorship
                opportunities curated specifically for academic professionals.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { label: 'Faculty Internships',    icon: <GraduationCap size={15} /> },
                  { label: 'Industrial Training',    icon: <Building2 size={15} /> },
                  { label: 'FDP Programs',           icon: <BookOpen size={15} /> },
                  { label: 'Research Collaboration', icon: <Brain size={15} /> },
                  { label: 'Mentorship Programs',    icon: <Users size={15} /> },
                  { label: 'Workshops & Seminars',   icon: <Star size={15} /> },
                ].map((item) => (
                  <div key={item.label}
                    className="flex items-center gap-2.5 bg-white rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 border border-gray-100 shadow-card">
                    <span className="text-purple-500">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
              <Link href="/login" className="inline-block mt-8">
                <Button size="lg" variant="primary">Explore Programs <ArrowRight size={17} /></Button>
              </Link>
            </div>

            {/* Program preview list */}
            <div className="space-y-3">
              {[
                { type: 'Faculty Internship', title: 'AI/ML Research Internship',          org: 'Microsoft Research India',    badge: 'Open',         color: 'emerald' },
                { type: 'FDP',               title: 'Data Analytics Faculty Dev Program', org: 'IIT Delhi & NASSCOM',          badge: 'Closing Soon', color: 'amber' },
                { type: 'Research',          title: 'Sustainable Tech Collaboration',     org: 'TCS Research',                badge: 'Open',         color: 'emerald' },
              ].map((p) => (
                <div key={p.title}
                  className="bg-white rounded-2xl border border-gray-100 shadow-card p-4 flex items-start justify-between hover:shadow-card-md hover:-translate-y-0.5 transition-all duration-200">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Badge variant="purple" size="sm">{p.type}</Badge>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-${p.color}-50 text-${p.color}-700`}>
                        <span className={`w-1.5 h-1.5 rounded-full bg-${p.color}-500`} />
                        {p.badge}
                      </span>
                    </div>
                    <p className="font-semibold text-gray-900 text-sm">{p.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{p.org}</p>
                  </div>
                  <ArrowRight size={15} className="text-gray-300 mt-1 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOR INSTITUTIONS ──────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="success" className="mb-4">For Institutions</Badge>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
              Placement intelligence at your fingertips
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
              Track skill gaps, measure curriculum effectiveness, and monitor placement
              readiness across departments — all in real time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Users size={22} />,     value: 1842, suffix: '',  label: 'Students Assessed', sub: '77% coverage',        color: 'indigo' },
              { icon: <TrendingUp size={22} />, value: 68,   suffix: '%', label: 'Placement Rate',    sub: '↑ 6% YoY',            color: 'green' },
              { icon: <Target size={22} />,    value: 287,  suffix: '',  label: 'Active Internships', sub: 'across 42 partners',  color: 'blue' },
              { icon: <BarChart3 size={22} />, value: 7,    suffix: '',  label: 'Skill Gap Areas',   sub: 'curriculum insights', color: 'amber' },
            ].map((stat) => (
              <div key={stat.label}
                className="text-center bg-white rounded-2xl border border-gray-100 shadow-card p-6 hover:shadow-card-md hover:-translate-y-0.5 transition-all duration-200">
                <div className={`w-12 h-12 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mx-auto mb-3`}>
                  {stat.icon}
                </div>
                <div className={`text-3xl font-extrabold text-${stat.color}-600 tabular`}>
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-semibold text-gray-800 mt-1">{stat.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY HIRE-X ────────────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Why Hire-X?</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
              Not a job board. A continuous skill intelligence platform built for the India talent ecosystem.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b) => (
              <div key={b.title}
                className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 hover:shadow-card-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                  {b.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1.5">{b.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-r from-indigo-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">Start Today — Free</Badge>
          <h2 className="text-4xl font-bold text-white tracking-tight text-balance">
            Ready to close your skill gaps?
          </h2>
          <p className="mt-4 text-xl text-indigo-100 max-w-xl mx-auto leading-relaxed">
            Join thousands of students, academicians and industry partners already using
            Hire-X to build a smarter talent ecosystem.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50 shadow-lg font-semibold">
                Get Started Free <ArrowRight size={17} />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="lg" className="border-2 border-white/40 bg-transparent text-white hover:bg-white/10">
                See How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="bg-gray-950 text-gray-400 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center">
                  <Zap size={15} className="text-white" />
                </div>
                <span className="font-bold text-white text-lg">Hire-X</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-500">
                Academia–Industry Collaboration Portal powered by continuous skill intelligence.
              </p>
              <p className="text-xs mt-4 text-gray-600 font-medium">Smart India Hackathon 2026 Prototype</p>
            </div>
            {[
              {
                heading: 'Platform',
                links: ['How It Works', 'For Students', 'For Industry', 'For Academicians'],
              },
              {
                heading: 'Portals',
                links: ['Student Portal', 'Industry Portal', 'Academician Portal', 'Institution Admin'],
                href: '/login',
              },
              {
                heading: 'Tech Stack',
                links: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'FastAPI (planned)', 'PostgreSQL (planned)'],
              },
            ].map((col) => (
              <div key={col.heading}>
                <h4 className="font-semibold text-gray-200 mb-4 text-sm">{col.heading}</h4>
                <ul className="space-y-2.5 text-sm">
                  {col.links.map((l) => (
                    <li key={l}>
                      {col.href ? (
                        <Link href={col.href} className="hover:text-white transition-colors">{l}</Link>
                      ) : (
                        <a href="#" className="hover:text-white transition-colors">{l}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-600">
            <p>© 2026 Hire-X. Smart India Hackathon Prototype. All rights reserved.</p>
            <p>Built with Next.js · TypeScript · Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
