'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = useCallback((newLocale: string) => {
    // pathname might be something like '/es/about' or '/en/about'
    // we want to replace the current locale with the new one
    if (!pathname) return
    const currentPathWithoutLocale = pathname.replace(`/${currentLang}`, '') || '/'
    router.push(`/${newLocale}${currentPathWithoutLocale === '/' ? '' : currentPathWithoutLocale}`)
  }, [currentLang, pathname, router])

  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      <button 
        onClick={() => switchLanguage('es')}
        className={`flex items-center gap-1 transition-colors ${currentLang === 'es' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-primary/70'}`}
      >
        <span>🇪🇸</span> ES
      </button>
      <span className="text-border">|</span>
      <button 
        onClick={() => switchLanguage('en')}
        className={`flex items-center gap-1 transition-colors ${currentLang === 'en' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-primary/70'}`}
      >
        <span>🇺🇸</span> EN
      </button>
    </div>
  )
}
