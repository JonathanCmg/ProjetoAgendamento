import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import firebaseConverter from "../converters/firebaseConverter";
import { db } from "../../firebase-init";

// O "caminho" é a lista de partes até a coleção. Exemplos:
//   ["usuarios"]
//   ["empresas", empresaId, "servicos"]   (subcoleção)
export default class BaseRepository {
  constructor(ModelClass, ...caminho) {
    this.collectionRef = collection(db, ...caminho).withConverter(
      firebaseConverter(ModelClass)
    );
  }

  async salvar(entidade) {
    entidade.setAtualizadoEm(new Date());
    if (entidade.getId()) {
      await setDoc(doc(this.collectionRef, entidade.getId()), entidade);
    } else {
      const ref = await addDoc(this.collectionRef, entidade);
      entidade.setId(ref.id);
    }
    return entidade;
  }

  async listarTodos() {
    const snapshot = await getDocs(this.collectionRef);
    return snapshot.docs.map((d) => d.data());
  }

  async buscarId(id) {
    const snapshot = await getDoc(doc(this.collectionRef, id));
    return snapshot.exists() ? snapshot.data() : null;
  }

  async buscarPorCampo(campo, operador, valor) {
    const q = query(this.collectionRef, where(campo, operador, valor));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => d.data());
  }

  async deletar(id) {
    await deleteDoc(doc(this.collectionRef, id));
  }
}
