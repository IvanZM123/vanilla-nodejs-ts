# Library / Biblioteca 

This corresponds to the first test of the **Library API** creation.

> **Note**: Before I start, I am not using any framework, I have basically created one ❤️

## Install

`npm install`

## Setup

```
npm run dev
```

Open other terminal and execute the following commands

```
npx typeorm schema:sync
npx typeorm migration:run
```

## Get started
If you want to interact with the app routes, here is a list

- `Books`: http://localhost:3030/books
- `Pages`: http://localhost:3030/books/1/pages

When you want to format the page of a book you need to query the **URL**

- **TEXT**: http://localhost:3030/books/1/pages/1/?format=text
- **HTML**: http://localhost:3030/books/1/pages/1/?format=html

## Production

```
npm run build
```

## Lint

```
npm run lint
```
