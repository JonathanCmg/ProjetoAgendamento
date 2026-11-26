// Converte entre classes (models) e objetos simples do Firestore.
export default function firebaseConverter(ModelClass) {
  return {
    toFirestore(modelo) {
      return modelo.toFirestore(); // atenção: precisa do return
    },
    fromFirestore(snapshot, options) {
      return new ModelClass().fromFirestore(snapshot, options);
    },
  };
}
