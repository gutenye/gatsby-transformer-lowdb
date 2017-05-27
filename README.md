# gatsby-transformer-lowdb

Support [lowdb](https://github.com/typicode/lowdb) json format

## Install

```
yarn add gatsby-transformer-lowdb
```

## How to use

```javascript
// In your gatsby-config.js
plugins: [
  `gatsby-transformer-lowdb`,
]
```

## How to store

If your project has a `db.json` with

```javascript
{
  "letters": [
    { value: 'a' },
    { value: 'b' },
    { value: 'c' },
  ]
]
```

## How to query

You'd be able to query your letters like:

```graphql
{
  allLetters {
    edges {
      node {
        value
      }
    }
  }
}
```

Which would return:

```javascript
{
  allLetters: {
    edges: [
      {
        node: {
          value: 'a'
        }
      },
      {
        node: {
          value: 'b'
        }
      },
      {
        node: {
          value: 'c'
        }
      }
    ]
  }
}
```
