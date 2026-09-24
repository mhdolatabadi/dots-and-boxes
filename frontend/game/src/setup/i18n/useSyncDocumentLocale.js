import * as React from 'react'
import { useSelector } from 'react-redux'
import { localeView } from '../../scenes/_slice/locale.slice'

const HEAD = {
  fa: {
    title: 'نقطه‌بازی | بازی آنلاین دوز (Dots and Boxes) با دوستان',
    description:
      'نقطه‌بازی، بازی آنلاین دوز (Dots and Boxes) رایگان و بدون نیاز به ثبت‌نام. با یک لینک، دوستت رو به بازی دونفره آنلاین دعوت کن، یا با کامپیوتر و در حالت آزمایشی سه‌بعدی بازی کن.',
  },
  en: {
    title: 'Dots and Boxes | Free Online Multiplayer Game',
    description:
      'Play Dots and Boxes online for free, no signup required. Share a link to invite a friend to a 2-player match, or play against the computer and try the experimental 3D mode.',
  },
}

// public/index.html sets the initial (pre-JS) <html lang/dir>, <title>
// and meta description for Persian, the default locale. Once React
// takes over, keep them in sync with whatever locale is actually
// selected -- this matters for RTL/LTR layout and for what a search
// engine's renderer sees when it executes JS on a ?lang=en link.
export default function useSyncDocumentLocale() {
  const locale = useSelector(localeView)

  React.useEffect(() => {
    const head = HEAD[locale] || HEAD.fa
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr'
    document.title = head.title

    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', head.description)
  }, [locale])
}
