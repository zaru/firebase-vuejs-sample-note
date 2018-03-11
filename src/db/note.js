import {db} from '../firebase'

export const fetchNotes = (uid, data, callback) => {
  db.collection('note').where('user_id', '==', uid).get().then(result => {
    result.forEach(doc => {
      data.push({id: doc.id, data: doc.data()})
    })
    if (typeof callback === 'function') {
      callback()
    }
  })
}

// export const fetchSortedNotes = (uid, data, callback) => {
//   db.collection('user_note').doc(uid).get()
//     .then(doc => {
//
//     })
//     .catch(err => {
//
//     })
//   db.collection('note').where('user_id', '==', uid).get().then(result => {
//     result.forEach(doc => {
//       data.push({id: doc.id, data: doc.data()})
//     })
//     if (typeof callback === 'function') {
//       callback()
//     }
//   })
// }
export default {
  fetchNotes: fetchNotes
}
