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
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${noteObj.title}">
  <meta name="twitter:image" content="${noteObj.image}">
  <link rel="canonical" href="/@note/${id}">
  </head><body>
  <script>window.location="/@note/?noteId=${id}";</script>
  </body></html>`
}

export const note = functions.https.onRequest(function(req, res) {
  const path = req.path.split('/')
  const noteId = path[2]
  db.collection('note').doc(noteId).get().then((doc:DocumentSnapshot) : void => {
    const htmlString = buildHtmlWithPost(noteId, doc.data())
    res.status(200).end(htmlString)
  }).catch(err => {
    res.status(500).end(err)
  })
})
