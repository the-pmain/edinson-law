# edinson-law

Presentational website for Edison Law, a London SRA-regulated firm.

## Develop

```bash
npm install
npm run dev
```

Local site: http://localhost:5173/

`config.js` stays in preview locally. Railway production builds turn the banner off automatically.

## Railway

Connect the GitHub repo. Railway will run `npm run build`, then `npm start` on `$PORT`.

```bash
npm run build
npm start
```
