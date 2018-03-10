import * as functions from 'firebase-functions';
import DocumentSnapshot = FirebaseFirestore.DocumentSnapshot;
import DocumentData = FirebaseFirestore.DocumentData;
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);
const db = admin.firestore()

function buildHtmlWithPost (id: string, noteObj:DocumentData) : string {
  return `<!DOCTYPE html><head>
  <title>${noteObj.title}</title>
  <meta property="og:title" content="${noteObj.title}">
  <meta property="og:image" content="${noteObj.image}">
  <meta property="og:image:width" content="600">
  <meta property="og:image:height" content="600">
  <meta property="og:url" content="https://dk5fq0rq84k91.cloudfront.net/@note/${id}">
  <meta property="og:type" content="article">
  <meta property="og:description" content="${noteObj.body.slice(0, 50)}">
  <meta property="fb:app_id" content="154678928553929">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:site" content="@zaru">
  <meta name="twitter:title" content="${noteObj.title}">
  <meta name="twitter:image" content="${noteObj.image}">
  <meta name="twitter:description" content="${noteObj.body.slice(0, 50)}">
  <link rel="canonical" href="/@note/${id}">
  </head><body>
  <script>window.location="/@note/?noteId=${id}";</script>
  </body></html>`
}

export const note = functions.https.onRequest(function(req, res) {
  const path = req.path.split('/')
  const noteId = path[2]
  db.collection('note').doc(noteId).get().then((doc:DocumentSnapshot) : void => {
    console.log(doc)
    const htmlString = buildHtmlWithPost(noteId, doc.data())
    res.status(200).end(htmlString)
  }).catch(err => {
    res.status(500).end(err)
  })
})
