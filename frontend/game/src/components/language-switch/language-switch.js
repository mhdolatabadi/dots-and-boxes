import * as React from 'react'
import { useSelector } from 'react-redux'
import useStyle from './language-switch.style'
import { dispatchLocale, localeView } from '../../scenes/_slice/locale.slice'

const OPTIONS = [
  { code: 'fa', label: 'فارسی' },
  { code: 'en', label: 'English' },
]

export default function LanguageSwitch() {
  const classes = useStyle()
  const locale = useSelector(localeView)

  return (
    <div className={classes.root}>
      {OPTIONS.map(({ code, label }) => (
        <button
          key={code}
          className={`${classes.option} ${
            code === locale ? classes.optionSelected : ''
          }`}
          onClick={() => dispatchLocale(code)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
