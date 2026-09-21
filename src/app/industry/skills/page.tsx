'use client'
import React, { useState } from 'react'
import { Plus, Trash2, Target } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { mockIndustryPartners } from '@/data/industry'
import clsx from 'clsx'

const levels = ['Beginner', 'Intermediate', 'Advanced']

export default function IndustrySkillsPage() {
  const partner = mockIndustryPartners[0]
  const [skills, setSkills] = useState(partner.skillRequirements)
  const [newSkill, setNewSkill] = useState('')
  const [newLevel, setNewLevel] = useState('Intermediate')

  const addSkill = () => {
    if (!newSkill.trim()) return
    setSkills((prev) => [...prev, { skill: newSkill.trim(), level: newLevel, demand: 'Medium' as const }])
    setNewSkill('')
  }

  const removeSkill = (idx: number) => setSkills((prev) => prev.filter((_, i) => i !== idx))

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Define Skill Requirements</h1>
        <p className="text-sm text-gray-500 mt-1">Set the skill competencies you require across your roles. These power the student matching engine.</p>
      </div>

      <Card>
        <div className="flex items-center gap-2 mb-5">
          <Target size={18} className="text-indigo-600" />
          <h2 className="text-base font-semibold text-gray-900">Current Requirements</h2>
        </div>
        <div className="space-y-3">
          {skills.map((req, idx) => (
            <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 border border-gray-100">
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{req.skill}</p>
              </div>
              <div className="flex gap-2">
                {levels.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSkills((prev) => prev.map((s, i) => i === idx ? { ...s, level: lvl } : s))}
                    className={clsx(
                      'px-2.5 py-1 rounded-md text-xs font-medium border transition-colors',
                      req.level === lvl
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-gray-500 border-gray-200 hover:border-indigo-300',
                    )}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
              <Badge variant={req.demand === 'High' ? 'danger' : req.demand === 'Medium' ? 'warning' : 'default'} size="sm">
                {req.demand}
              </Badge>
              <button onClick={() => removeSkill(idx)} className="text-gray-300 hover:text-red-500 transition-colors">
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>

        {/* Add new */}
        <div className="mt-5 flex items-center gap-3 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add skill (e.g. TypeScript)"
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
            onKeyDown={(e) => e.key === 'Enter' && addSkill()}
          />
          <select
            value={newLevel}
            onChange={(e) => setNewLevel(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
          >
            {levels.map((l) => <option key={l}>{l}</option>)}
          </select>
          <Button variant="primary" onClick={addSkill}>
            <Plus size={15} /> Add
          </Button>
        </div>

        <Button variant="primary" className="mt-5">Save Requirements</Button>
      </Card>
    </div>
  )
}
