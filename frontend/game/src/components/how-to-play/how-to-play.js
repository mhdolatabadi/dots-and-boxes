import * as React from 'react'
import useStyle from './how-to-play.style'
import useLocal from '../../setup/i18n/useLocal'

// Kept always in the DOM (via <details>, not conditional rendering) so
// search engines can index it without simulating a click. Keep the
// Persian text in sync with the FAQPage JSON-LD in public/index.html.
const DICT = {
  fa: {
    summary: 'راهنما و سوالات متداول',
    faq: [
      {
        question: 'قوانین نقطه‌بازی چیست؟',
        answer:
          'بازیکن‌ها به نوبت یک خط بین دو نقطه‌ی مجاور می‌کشند. هر کس با کشیدن ضلع چهارم یک مربع، اون جعبه رو برای خودش می‌بره و یک نوبت اضافه می‌گیره. وقتی همه‌ی خط‌ها کشیده شد، برنده کسیه که جعبه‌ی بیشتری برده باشه.',
      },
      {
        question: 'نقطه‌بازی با بازی دوز چه فرقی دارد؟',
        answer:
          'نقطه‌بازی همون Dots and Boxes است: خط کشیدن بین نقطه‌ها برای ساختن جعبه. واژه‌ی «دوز» در فارسی معمولاً به بازی‌های دیگه‌ای مثل دوز سه‌تایی (XO) یا دوز نه‌تایی (آسیاب) اشاره داره که بازی‌های متفاوتی هستن.',
      },
      {
        question: 'آیا نقطه‌بازی نیاز به نصب یا ثبت‌نام دارد؟',
        answer:
          'نه. نقطه‌بازی کاملاً توی مرورگر اجرا می‌شه، بدون نصب اپلیکیشن و بدون ساختن اکانت. هویت بازیکن فقط توی همون مرورگر ذخیره می‌شه.',
      },
      {
        question: 'چطور با دوستم آنلاین بازی کنم؟',
        answer:
          'حالت «بازی آنلاین (دونفره)» رو انتخاب کن؛ یک لینک اتاق ساخته می‌شه که می‌تونی برای دوستت بفرستی. با باز کردن همون لینک، دوستت مستقیم وارد همون بازی می‌شه.',
      },
    ],
  },
  en: {
    summary: 'How to Play & FAQ',
    faq: [
      {
        question: 'What are the rules of Dots and Boxes?',
        answer:
          "Players take turns drawing one line between two adjacent dots. Whoever draws a box's fourth side claims that box and gets an extra turn. Once every line is drawn, whoever claimed the most boxes wins.",
      },
      {
        question: 'How is Dots and Boxes different from Tic-Tac-Toe?',
        answer:
          "They're different games: Tic-Tac-Toe (Xs and Os) is about placing marks in a 3x3 grid, while Dots and Boxes is about drawing lines between dots to claim boxes -- closer to Nine Men's Morris territory than Tic-Tac-Toe.",
      },
      {
        question: 'Do I need to install anything or sign up?',
        answer:
          'No. The game runs entirely in your browser -- no app to install and no account to create. Your player identity is only stored locally in that browser.',
      },
      {
        question: 'How do I play online with a friend?',
        answer:
          "Pick \"Play Online (2 Players)\"; a room link is created that you can send to your friend. Opening that same link drops them straight into the same game.",
      },
    ],
  },
}

export default function HowToPlay() {
  const classes = useStyle()
  const t = useLocal(DICT)

  return (
    <details className={classes.root}>
      <summary className={classes.summary}>{t.summary}</summary>
      <div className={classes.content}>
        {t.faq.map(({ question, answer }) => (
          <div key={question}>
            <h2 className={classes.question}>{question}</h2>
            <p className={classes.answer}>{answer}</p>
          </div>
        ))}
      </div>
    </details>
  )
}
