'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2 } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

const levels = ['Beginner', 'Intermediate', 'Advanced']
const types = ['Internship', 'Project', 'Training', 'Full-time', 'Part-time']

export default function PostOpportunityPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [skills, setSkills] = useState([{ name: 'Python', level: 'Intermediate' }])
  const [newSkill, setNewSkill] = useState('')
  const [newLevel, setNewLevel] = useState('Intermediate')

  const addSkill = () => {
    if (!newSkill.trim()) return
    setSkills((p) => [...p, { name: newSkill.trim(), level: newLevel }])
    setNewSkill('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    router.push('/industry/opportunities')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Post an Opportunity</h1>
        <p className="text-sm text-gray-500 mt-1">Fill in the details — our matching engine will surface relevant student profiles automatically.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <h2 className="text-base font-semibold text-gray-900 mb-4">Basic Details</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Opportunity Title *</label>
              <input required defaultValue="Software Engineering Intern" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Type *</label>
                <select required className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
                  {types.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Duration *</label>
                <input required defaultValue="6 months" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Description *</label>
              <textarea required rows={4} defaultValue="Work with our core product team on backend services and React frontend..." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Location</label>
                <input defaultValue="Bengaluru, Karnataka" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Stipend / Salary</label>
                <input defaultValue="₹25,000/month" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Eligibility</label>
              <input defaultValue="B.Tech 3rd or 4th year, CGPA ≥ 7.0" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-base font-semibold text-gray-900 mb-4">Required Skills</h2>
          <p className="text-xs text-gray-500 mb-4">Defining precise skill requirements improves matching accuracy. Students will be ranked by how closely their assessed profile matches these.</p>

          <div className="space-y-2 mb-4">
            {skills.map((sk, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-900 flex-1">{sk.name}</span>
                <div className="flex gap-1">
                  {levels.map((l) => (
                    <button
                      type="button"
                      key={l}
                      onClick={() => setSkills((p) => p.map((s, i) => i === idx ? { ...s, level: l } : s))}
                      className={`px-2 py-0.5 rounded text-xs font-medium border transition-colors ${sk.level === l ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-500 border-gray-200 hover:border-indigo-300'}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
                <button type="button" onClick={() => setSkills((p) => p.filter((_, i) => i !== idx))} className="text-gray-300 hover:text-red-400">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add skill..."
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            />
            <select value={newLevel} onChange={(e) => setNewLevel(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
              {levels.map((l) => <option key={l}>{l}</option>)}
            </select>
            <Button type="button" variant="outline" onClick={addSkill}><Plus size={14} /></Button>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button type="submit" variant="primary" loading={loading} size="lg" className="flex-1">
            Post Opportunity
          </Button>
          <Button type="button" variant="outline" size="lg" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
