'use client'
import React from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900">Institution Settings</h1>
      <Card>
        <h2 className="text-base font-semibold text-gray-900 mb-4">Institution Details</h2>
        <div className="space-y-4">
          {[
            { label: 'Institution Name', value: 'BITS Pilani' },
            { label: 'Location', value: 'Pilani, Rajasthan' },
            { label: 'Type', value: 'Deemed University' },
            { label: 'NAAC Grade', value: 'A+' },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-xs font-medium text-gray-600 block mb-1">{f.label}</label>
              <input defaultValue={f.value} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
            </div>
          ))}
        </div>
        <Button variant="primary" className="mt-5">Save Changes</Button>
      </Card>
    </div>
  )
}
