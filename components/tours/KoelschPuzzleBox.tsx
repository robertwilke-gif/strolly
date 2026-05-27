'use client'

// Page-local puzzle box for the Köln/Kölsch tour. Three-letter solution,
// reveal a hidden destination on success.

import { useState, type FormEvent } from 'react'
import { CheckCircle2, ExternalLink, KeyRound, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const SOLUTION = 'TIM'
const DESTINATION_NAME = 'Brauerei zur Malzmühle'
const DESTINATION_URL =
  'https://www.google.com/maps/dir/?api=1&destination=Brauerei+zur+Malzm%C3%BChle+K%C3%B6ln'

type GuessState = 'idle' | 'solved' | 'wrong'

export function KoelschPuzzleBox() {
  const [input, setInput] = useState('')
  const [state, setState] = useState<GuessState>('idle')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (input.trim().toUpperCase() === SOLUTION) {
      setState('solved')
    } else {
      setState('wrong')
    }
  }

  function handleChange(value: string) {
    setInput(value.toUpperCase().slice(0, 3))
    if (state !== 'idle') setState('idle')
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 max-w-[640px] mx-auto">
      <div className="inline-flex items-center gap-2 bg-teal-light text-teal-dark px-3 py-1 rounded-full font-head font-semibold text-[12px] tracking-wide mb-4">
        <KeyRound size={14} />
        Geheimes Ziel
      </div>
      <h2 className="font-head font-bold text-navy text-[24px] leading-tight mb-2">
        Drei Buchstaben. Ein Brauhaus.
      </h2>
      <p className="text-text-soft text-[15px] leading-relaxed mb-5">
        Du kennst das Lösungswort? Tipp die drei Buchstaben ein – und wir verraten dir,
        wo das CMT-Team heute Abend landet.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <label className="sr-only" htmlFor="koelsch-puzzle-input">
          Lösungswort (3 Buchstaben)
        </label>
        <input
          id="koelsch-puzzle-input"
          type="text"
          inputMode="text"
          autoComplete="off"
          maxLength={3}
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="—"
          aria-invalid={state === 'wrong'}
          className="flex-1 font-head font-bold text-navy text-[28px] tracking-[0.5em] text-center uppercase rounded-pill border-[1.5px] border-gray-200 px-5 py-3 focus:outline-none focus:border-teal focus-visible:ring-2 focus-visible:ring-teal/40"
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={input.length !== 3}
        >
          <KeyRound size={16} />
          Lösen
        </Button>
      </form>

      {state === 'solved' && (
        <div
          role="status"
          className="mt-5 rounded-md border border-success/30 bg-success-bg p-4"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 size={20} className="text-success shrink-0 mt-0.5" />
            <div className="min-w-0">
              <div className="font-head font-semibold text-success text-[12px] tracking-wider uppercase mb-1">
                Treffer. Prost.
              </div>
              <h3 className="font-head font-bold text-navy text-[20px] leading-tight mb-1">
                {DESTINATION_NAME}
              </h3>
              <p className="text-text text-[14px] leading-relaxed mb-3">
                Mühlen Kölsch direkt vom Fass, Heumarkt, Köbes mit Geduld. Hier landet
                das CMT-Team – los geht’s.
              </p>
              <a
                href={DESTINATION_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-head font-semibold text-teal-dark text-[14px] hover:text-teal transition-colors"
              >
                <ExternalLink size={14} />
                Route in Google Maps öffnen
              </a>
            </div>
          </div>
        </div>
      )}

      {state === 'wrong' && (
        <div
          role="alert"
          className="mt-5 rounded-md border border-error/30 bg-error-bg p-4"
        >
          <div className="flex items-start gap-3">
            <XCircle size={20} className="text-error shrink-0 mt-0.5" />
            <p className="text-text text-[14px] leading-relaxed">
              Leider falsch – vielleicht doch ein Kölsch zu viel getrunken? Versuchs nochmal.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
