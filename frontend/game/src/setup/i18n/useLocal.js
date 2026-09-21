import { useSelector } from 'react-redux'
import { localeView } from '../../scenes/_slice/locale.slice'

// dict looks like { fa: {...}, en: {...} }; components keep using the
// result exactly like the old single-language `t` object.
export default function useLocal(dict) {
  const locale = useSelector(localeView)
  return dict[locale] || dict.fa
}
