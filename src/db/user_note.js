import {db} from '../firebase'

export const updateNoteOrder = (uid, noteIds) => {
  db.collection('user_note').doc(uid).set({ note_ids: noteIds })
    .then(doc => {
      console.log('update ', doc)
    })
    .catch(err => {
      console.log('update fail ', err)
    })
}

export default {
  updateNoteOrder: updateNoteOrder
}
