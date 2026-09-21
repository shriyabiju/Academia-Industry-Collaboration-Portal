import React from 'react'
import clsx from 'clsx'

const steps = [
  { id: 1, label: 'ASSESS', color: 'bg-indigo-600 text-white', connector: true },
  { id: 2, label: 'IDENTIFY GAPS', color: 'bg-indigo-500 text-white', connector: true },
  { id: 3, label: 'MATCH', color: 'bg-blue-600 text-white', connector: true },
  { id: 4, label: 'LEARN', color: 'bg-blue-500 text-white', connector: true },
  { id: 5, label: 'IMPROVE', color: 'bg-indigo-400 text-white', connector: true },
  { id: 6, label: 'REASSESS', color: 'bg-indigo-600 text-white', connector: false },
]

interface SkillLoopProps {
  activeStep?: number
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md'
}

export default function SkillLoop({ activeStep, orientation = 'horizontal', size = 'md' }: SkillLoopProps) {
  if (orientation === 'vertical') {
    return (
      <div className="flex flex-col items-start gap-0">
        {steps.map((step, i) => (
          <div key={step.id} className="flex flex-col items-start">
            <div
              className={clsx(
                'flex items-center gap-2 rounded-lg font-semibold tracking-wide transition-all',
                size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm',
                activeStep === step.id
                  ? step.color + ' shadow-md scale-105'
                  : activeStep && activeStep > step.id
                  ? 'bg-indigo-100 text-indigo-700'
                  : activeStep
                  ? 'bg-gray-100 text-gray-400'
                  : step.color,
              )}
            >
              <span
                className={clsx(
                  'flex-shrink-0 rounded-full flex items-center justify-center font-bold',
                  size === 'sm' ? 'w-4 h-4 text-xs' : 'w-5 h-5 text-xs',
                  activeStep === step.id ? 'bg-white/30' : 'bg-white/20',
                )}
              >
                {activeStep && activeStep > step.id ? '✓' : step.id}
              </span>
              {step.label}
            </div>
            {i < steps.length - 1 && (
              <div className={clsx('ml-4 bg-indigo-200', size === 'sm' ? 'w-0.5 h-4' : 'w-0.5 h-5')} />
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center flex-wrap gap-0">
      {steps.map((step, i) => (
        <React.Fragment key={step.id}>
          <div
            className={clsx(
              'rounded-lg font-semibold tracking-wide text-center transition-all',
              size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-4 py-2 text-sm',
              activeStep === step.id
                ? step.color + ' shadow-md'
                : activeStep && activeStep > step.id
                ? 'bg-indigo-100 text-indigo-600'
                : activeStep
                ? 'bg-gray-100 text-gray-400'
                : step.color,
            )}
          >
            {step.label}
          </div>
          {i < steps.length - 1 && (
            <div className="flex items-center mx-1">
              <div className="w-5 h-0.5 bg-indigo-300" />
              <div className="border-t-2 border-r-2 border-indigo-300 w-2 h-2 rotate-45 -ml-1.5" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
