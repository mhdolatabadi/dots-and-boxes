import * as React from 'react'
import useStyle from './how-to-play.style'

// Kept always in the DOM (via <details>, not conditional rendering) so
// search engines can index it without simulating a click. Keep in sync
// with the FAQPage JSON-LD in public/index.html.
const FAQ = [
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
]

export default function HowToPlay() {
  const classes = useStyle()

  return (
    <details className={classes.root}>
      <summary className={classes.summary}>راهنما و سوالات متداول</summary>
      <div className={classes.content}>
        {FAQ.map(({ question, answer }) => (
          <div key={question}>
            <h2 className={classes.question}>{question}</h2>
            <p className={classes.answer}>{answer}</p>
          </div>
        ))}
      </div>
    </details>
  )
}
