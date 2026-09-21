'use client'
import React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Users,
  Building2,
  GraduationCap,
  BarChart3,
  Brain,
  Target,
  BookOpen,
  Zap,
  Star,
  Shield,
  Globe,
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'

const loopSteps = [
  { id: 1, label: 'ASSESS', desc: 'Evaluate domain knowledge and soft skills via adaptive assessments', icon: <ClipboardIcon />, color: 'bg-indigo-600' },
  { id: 2, label: 'IDENTIFY GAPS', desc: 'AI-powered skill gap analysis against industry requirements', icon: <GapIcon />, color: 'bg-indigo-500' },
  { id: 3, label: 'MATCH', desc: 'Semantic matching with real industry opportunities', icon: <MatchIcon />, color: 'bg-blue-600' },
  { id: 4, label: 'LEARN', desc: 'Personalized training, certifications and industry programs', icon: <BookIcon />, color: 'bg-blue-500' },
  { id: 5, label: 'IMPROVE', desc: 'Track progress and build a verified competency portfolio', icon: <TrendIcon />, color: 'bg-indigo-400' },
  { id: 6, label: 'REASSESS', desc: 'Continuous re-evaluation keeps your profile current', icon: <RefreshIcon />, color: 'bg-indigo-600' },
]

function ClipboardIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" /><path d="M9 12h6M9 16h4" /></svg> }
function GapIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg> }
function MatchIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M9 12l2 2 4-4" /><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> }
function BookIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg> }
function TrendIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg> }
function RefreshIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" /></svg> }

const benefits = [
  { icon: <Brain size={20} />, title: 'Skill Intelligence', desc: 'Continuous, data-driven competency profiling across technical and soft skills' },
  { icon: <Target size={20} />, title: 'Explainable Matching', desc: 'Every opportunity match comes with a clear explanation of why you qualify' },
  { icon: <Shield size={20} />, title: 'Verified Profiles', desc: 'Assessment-backed skill profiles trusted by 40+ industry partners' },
  { icon: <Globe size={20} />, title: 'Closed Loop Learning', desc: 'Gap-to-learning pipeline ensures every skill gap has a clear closure path' },
  { icon: <BarChart3 size={20} />, title: 'Institutional Insights', desc: 'Real-time analytics help institutions track placement readiness and curriculum gaps' },
  { icon: <Users size={20} />, title: 'Multi-Stakeholder', desc: 'One platform connecting Students, Academicians, Industry and Institutions' },
]

const stats = [
  { value: '1,842', label: 'Students Assessed' },
  { value: '42', label: 'Industry Partners' },
  { value: '287', label: 'Active Opportunities' },
  { value: '68%', label: 'Placement Rate' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50 pt-16 pb-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="indigo" className="mb-6">
                Smart India Hackathon 2026
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
                From Skills to{' '}
                <span className="text-indigo-600">Opportunities</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 leading-relaxed max-w-lg">
                Hire-X connects academic learning, competency assessment,
                skill development and industry opportunities through a{' '}
                <strong className="text-gray-800">continuous skill intelligence loop</strong>.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login">
                  <Button size="lg" variant="primary" className="shadow-md">
                    Get Started Free
                    <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link href="/#how-it-works">
                  <Button size="lg" variant="outline">
                    How It Works
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 flex-wrap">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-bold text-indigo-600">{s.value}</div>
                    <div className="text-xs text-gray-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Loop Visual */}
            <div className="hidden lg:flex flex-col items-center justify-center">
              <div className="relative w-full max-w-sm">
                <div className="flex flex-col items-center gap-0">
                  {loopSteps.map((step, i) => (
                    <div key={step.id} className="flex flex-col items-center w-full">
                      <div className={`${step.color} text-white w-full rounded-xl px-5 py-3.5 flex items-center gap-4 shadow-sm`}>
                        <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                          {step.icon}
                        </div>
                        <div>
                          <div className="font-bold text-sm tracking-wide">{step.label}</div>
                          <div className="text-xs text-white/80 leading-tight mt-0.5">{step.desc}</div>
                        </div>
                        <div className="ml-auto font-bold text-lg text-white/40">{step.id}</div>
                      </div>
                      {i < loopSteps.length - 1 && (
                        <div className="flex flex-col items-center py-1">
                          <div className="w-0.5 h-3 bg-indigo-300" />
                          <div className="text-indigo-400 text-xs">↓</div>
                        </div>
                      )}
                    </div>
                  ))}
                  {/* Loop back arrow */}
                  <div className="mt-3 flex items-center gap-2 text-indigo-500 text-xs font-semibold">
                    <div className="w-12 h-0.5 bg-indigo-300" />
                    <RefreshIcon />
                    <span>Loop continues</span>
                    <div className="w-12 h-0.5 bg-indigo-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge variant="indigo" className="mb-4">The Skill Intelligence Loop</Badge>
            <h2 className="text-4xl font-bold text-gray-900">How Hire-X Works</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Unlike a simple job board, Hire-X operates a continuous intelligence loop that
              keeps your competency profile current and opportunities relevant.
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {loopSteps.map((step, i) => (
              <div key={step.id} className="relative flex flex-col items-center text-center group">
                <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center text-white mb-3 shadow-sm group-hover:scale-105 transition-transform`}>
                  {step.icon}
                </div>
                <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center mb-2">
                  {step.id}
                </div>
                <h3 className="font-bold text-gray-900 text-sm">{step.label}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{step.desc}</p>
                {i < loopSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(100%-8px)] text-gray-300 text-lg">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR STUDENTS ── */}
      <section id="students" className="py-24 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="indigo" className="mb-4">For Students</Badge>
              <h2 className="text-4xl font-bold text-gray-900">Know your skills. Close your gaps. Land the right opportunity.</h2>
              <p className="mt-4 text-lg text-gray-600">
                Stop guessing what companies want. Get assessed, see exactly where you stand,
                and get matched with opportunities that fit your current skill profile.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Adaptive domain and soft skills assessments',
                  'Visual skill intelligence profile with competency scores',
                  'Explainable opportunity matching with gap analysis',
                  'Personalized learning recommendations to close gaps',
                  'Continuous reassessment to track improvement',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle2 size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/login" className="inline-block mt-8">
                <Button size="lg" variant="primary">
                  Start Your Assessment
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              <Card className="border-l-4 border-l-indigo-500">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">Shriya Biju</p>
                    <p className="text-xs text-gray-500">BITS Pilani · B.Tech CSE</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-indigo-600">72%</div>
                    <div className="text-xs text-gray-400">Overall Competency</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { skill: 'Python', score: 85 },
                    { skill: 'Problem Solving', score: 82 },
                    { skill: 'SQL', score: 65 },
                    { skill: 'React', score: 35 },
                  ].map((s) => (
                    <div key={s.skill}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-gray-700">{s.skill}</span>
                        <span className="text-gray-500">{s.score}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full">
                        <div
                          className={`h-full rounded-full ${s.score >= 70 ? 'bg-indigo-500' : s.score >= 45 ? 'bg-amber-400' : 'bg-red-400'}`}
                          style={{ width: `${s.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="border-l-4 border-l-green-500">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="indigo" className="mb-2">Internship · Software Dev</Badge>
                    <p className="font-semibold text-gray-900">Software Engineering Intern</p>
                    <p className="text-sm text-gray-500">TechCorp India · Bengaluru</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <div className="text-2xl font-bold text-green-600">84%</div>
                    <div className="text-xs text-gray-400">Match</div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                  "Your assessed skill profile matches 84% of required competencies."
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOR INDUSTRY ── */}
      <section id="industry" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
              {[
                { label: 'Student Matches', value: '1,124', sub: 'across 42 partners', color: 'indigo' },
                { label: 'Skill Match Quality', value: '78%', sub: 'avg match accuracy', color: 'green' },
                { label: 'Time to Hire', value: '−34%', sub: 'faster shortlisting', color: 'blue' },
                { label: 'Active Opportunities', value: '287', sub: 'open right now', color: 'purple' },
              ].map((stat) => (
                <Card key={stat.label} className="text-center">
                  <div className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</div>
                  <div className="text-sm font-semibold text-gray-800 mt-1">{stat.label}</div>
                  <div className="text-xs text-gray-400">{stat.sub}</div>
                </Card>
              ))}
            </div>
            <div className="order-1 lg:order-2">
              <Badge variant="info" className="mb-4">For Industry</Badge>
              <h2 className="text-4xl font-bold text-gray-900">Find talent that already fits your stack.</h2>
              <p className="mt-4 text-lg text-gray-600">
                Define the exact skill requirements for each role. Our matching engine surfaces
                students whose assessed competencies align — with transparent gap analysis.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Define skill requirements by proficiency level',
                  'Get automatically ranked student shortlists',
                  'See each candidate\'s exact skill gaps upfront',
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
                <Button size="lg" variant="primary">
                  Partner With Us
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOR ACADEMICIANS ── */}
      <section id="academicians" className="py-24 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="purple" className="mb-4">For Academicians</Badge>
              <h2 className="text-4xl font-bold text-gray-900">Bridge your expertise with industry reality.</h2>
              <p className="mt-4 text-lg text-gray-600">
                Discover faculty internships, FDPs, industry training programs, research collaborations
                and mentorship opportunities curated specifically for academic professionals.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { label: 'Faculty Internships', icon: <GraduationCap size={16} /> },
                  { label: 'Industrial Training', icon: <Building2 size={16} /> },
                  { label: 'FDP Programs', icon: <BookOpen size={16} /> },
                  { label: 'Research Collaboration', icon: <Brain size={16} /> },
                  { label: 'Mentorship Programs', icon: <Users size={16} /> },
                  { label: 'Workshops', icon: <Star size={16} /> },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 text-sm font-medium text-gray-700 border border-gray-100">
                    <span className="text-purple-500">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
              <Link href="/login" className="inline-block mt-8">
                <Button size="lg" variant="primary">
                  Explore Programs
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { type: 'Faculty Internship', title: 'AI/ML Research Internship', org: 'Microsoft Research India', badge: 'Open', color: 'success' as const },
                { type: 'FDP', title: 'Data Analytics Faculty Dev Program', org: 'IIT Delhi & NASSCOM', badge: 'Closing Soon', color: 'warning' as const },
                { type: 'Research', title: 'Sustainable Tech Collaboration', org: 'TCS Research', badge: 'Open', color: 'success' as const },
              ].map((p) => (
                <Card key={p.title} hover>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="purple" size="sm">{p.type}</Badge>
                        <Badge variant={p.color} size="sm" dot>{p.badge}</Badge>
                      </div>
                      <p className="font-semibold text-gray-900 text-sm">{p.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{p.org}</p>
                    </div>
                    <ArrowRight size={16} className="text-gray-300 mt-1 flex-shrink-0" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INSTITUTIONAL INSIGHTS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="success" className="mb-4">For Institutions</Badge>
            <h2 className="text-4xl font-bold text-gray-900">Placement intelligence at your fingertips</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
              Track skill gaps, measure curriculum effectiveness, and monitor placement readiness across departments in real time.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Users size={20} />, value: '1,842', label: 'Students Assessed', sub: '77% coverage', color: 'indigo' },
              { icon: <TrendingUp size={20} />, value: '68%', label: 'Placement Rate', sub: '↑ 6% YoY', color: 'green' },
              { icon: <Target size={20} />, value: '287', label: 'Active Internships', sub: 'across 42 partners', color: 'blue' },
              { icon: <BarChart3 size={20} />, value: '7', label: 'Skill Gap Areas', sub: 'curriculum insights', color: 'amber' },
            ].map((stat) => (
              <Card key={stat.label} className="text-center">
                <div className={`w-12 h-12 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mx-auto mb-3`}>
                  {stat.icon}
                </div>
                <div className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</div>
                <div className="text-sm font-semibold text-gray-800 mt-1">{stat.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{stat.sub}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── KEY BENEFITS ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Why Hire-X?</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
              Built different from day one — not a job board, but a continuous skill intelligence platform.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <Card key={b.title} hover>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                  {b.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{b.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-gradient-to-r from-indigo-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white">Ready to close your skill gaps?</h2>
          <p className="mt-4 text-xl text-indigo-100 max-w-xl mx-auto">
            Join thousands of students, academicians and industry partners already using Hire-X to
            build a smarter talent ecosystem.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50 shadow-lg font-semibold">
                Get Started Free
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/#how-it-works">
              <Button size="lg" className="border-2 border-white/50 bg-transparent text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <Zap size={14} className="text-white" />
                </div>
                <span className="font-bold text-white">Hire-X</span>
              </div>
              <p className="text-sm leading-relaxed">
                Academia–Industry Collaboration Portal powered by continuous skill intelligence.
              </p>
              <p className="text-xs mt-3 text-gray-600">Smart India Hackathon 2024 Prototype</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm">Platform</h4>
              <ul className="space-y-2 text-sm">
                {['How It Works', 'For Students', 'For Industry', 'For Academicians'].map((l) => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm">Portals</h4>
              <ul className="space-y-2 text-sm">
                {['Student Portal', 'Industry Portal', 'Academician Portal', 'Institution Admin'].map((l) => (
                  <li key={l}><Link href="/login" className="hover:text-white transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm">Technology</h4>
              <ul className="space-y-2 text-sm">
                {['Next.js Frontend', 'FastAPI Backend (planned)', 'Sentence Transformers (planned)', 'PostgreSQL (planned)'].map((l) => (
                  <li key={l} className="text-gray-500">{l}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs">© 2024 Hire-X. Smart India Hackathon Prototype. All rights reserved.</p>
            <p className="text-xs">Built with Next.js · TypeScript · Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
