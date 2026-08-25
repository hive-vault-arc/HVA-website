import {Manrope, Newsreader, Noto_Naskh_Arabic} from 'next/font/google';

export const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  style: ['normal', 'italic'],
  axes: ['opsz'],
});

// Loaded with genuine Arabic weights so an RTL release never relies on
// synthesized Latin typography. The locale layout applies the variable only
// when Arabic is rendered.
export const arabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

