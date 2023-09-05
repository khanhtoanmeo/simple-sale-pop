export default function presentDoc(doc) {
  return {...doc.data(), id: doc.id};
}
