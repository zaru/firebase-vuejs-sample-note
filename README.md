# firebase-sample-note

firebase, firestore, functions + Vue.js + CloudFront, Lambda@edge SPA sample.

## deploy

```
npm run build
firestore deploy
```

## AWS Lambda@edge deploy

```
cd lamnbda
sls deploy --stage production
```

## develop

```
npm run dev
# or
firebase serve --only functions,hosting
```
