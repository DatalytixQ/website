import 'server-only'
 
import en from './en.json'
import es from './es.json'

const dictionaries = { en, es }

export const getDictionary = async (locale: string) => {
  const cleanLocale = locale?.replace(/["']/g, '') || 'es';
  return dictionaries[cleanLocale as keyof typeof dictionaries] || dictionaries.es;
}
