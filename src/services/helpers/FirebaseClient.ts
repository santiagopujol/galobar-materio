import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc, setDoc,
    deleteDoc, doc, where, query, getDoc, WhereFilterOp
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD7pN9OVx55S6a4r3fNUAvdOeju1-AoFD4",
  authDomain: "club-galo.firebaseapp.com",
  projectId: "club-galo",
  storageBucket: "club-galo.appspot.com",
  messagingSenderId: "1078929646643",
  appId: "1:1078929646643:web:3de9620273c296f2b9af46",
  measurementId: "G-C4WYC0PSX7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
// const analytics = getAnalytics(app);

export const FirebaseClient = {
    getDocsByRef,
    getCountDataByRef,
    addDocByRef,
    deleteDocByRef,
    getDocByRefAndId,
    getDocByRefAndDocId,
    updateDocByRefAndId,
    getDocsByRefAndFilter,
    getUserCliente,
    getPuntosByClienteFirestore,
    getOperaciones,
    getOperacionesByClienteFirestore,
    getMotivosVisita,
    getMotivoVisitaById,
    getPremiosCanjeadosByClienteFirestore,
    getCountOperaciones,
    getCountPremiosCanje
}

//Get Count Data By Col
async function getCountDataByRef(colRef: string) {
    const dataResult: any[] = [];
    const col = collection(db, colRef)
    const snapshot = await getDocs(col);
    return snapshot.docChanges.length
}

// Get all docs by ref to firebase
async function getDocsByRef(colRef: string) {
    const dataResult: any[] = [];
    const col = collection(db, colRef)
    const snapshot = await getDocs(col);
    snapshot.forEach(doc => {
        // Guardando key en id
        const data = doc.data()
        data.id = doc.id
        dataResult.push(data)
    });

  return dataResult
}

// Get doc by ref and id
async function getDocByRefAndId(colRef: string, id: any) {
    const col = collection(db, colRef);
    const q = query(col, where("id", "==", Number(id))); // id
    const snapshot = await getDocs(q);
    if (snapshot.docs.length > 0) {
        return snapshot.docs.map(doc => doc.data())[0];
    }
}

// Get doc by ref and Doc id
async function getDocByRefAndDocId(colRef: string, docId: any) {
    let dataResult = {};
    const docRef = doc(db, colRef, docId);
    const myDoc = await getDoc(docRef);
    if (myDoc.exists()) {
        // Guardando key en id
        const data = myDoc.data()
        data.id = myDoc.id
        dataResult = data

        return dataResult;
    }
}

// Get doc by ref and filter
async function getDocsByRefAndFilter(colRef: string, filterField: string, operator: WhereFilterOp, filterValues: string[]) {
    const col = collection(db, colRef);
    const q = query(col, where(filterField, operator, filterValues));
    const snapshot = await getDocs(q);
    if (snapshot.docs.length > 0) {
        return snapshot.docs.map(doc => doc.data());
    }
}

// Add doc by ref to firebase
async function addDocByRef(colRef: string, data: any) {
    try {
        await addDoc(collection(db, colRef), data)
        .then(() => {
            return true
        })
    } catch (error) {
        console.log('error adding ref', error);

        return false
    }
}

async function updateDocByRefAndId(colRef: string, data: any, id: any) {
    try {
        const docRef = doc(db, colRef, id);
        await setDoc(docRef, data)
        .then(() => {
            return true
        })
    } catch (error) {
        console.log('error adding ref', error);

        return false
    }
}

// delete doc by ref
async function deleteDocByRef(colRef: string, id: string) {
    const docRef = doc(db, colRef, id)
    await deleteDoc(docRef)
    .then(() => {
        console.log(colRef + "eliminado con exito")

        return true
    }).catch((error) => {
        return error
    })
}

// ---------- pasar a service correspondiente lo de abajo ---------- ----------

// Get Usuario Cliente
async function getUserCliente(email: string, password: string) {
    const colRef = collection(db, 'user_clientes');
    const q = query(colRef, where("email", "==", email));
    const snapshot = await getDocs(q);
    const list = snapshot.docs.map(doc => doc.data());
    return list;
}

// Get Puntos by cliente
async function getPuntosByClienteFirestore(id: any) {
    const colRef = collection(db, 'miembros_puntos');
    const q = query(colRef, where("clientId", "==", id));
    const snapshot = await getDocs(q);
    const list = snapshot.docs.map(doc => doc.data());
    return list;
}

// Get Operaciones Total
async function getOperaciones() {
    const colRef = collection(db, 'operaciones_miembros');
    const q = query(colRef);
    const snapshot = await getDocs(q);
    const list = snapshot.docs.map(doc => doc.data());
    return list;
}

//Get Operaciones By Cliente
async function getOperacionesByClienteFirestore(id: any) {
    const colRef = collection(db, 'operaciones_miembros');
    const q = query(colRef, where("clientId", "==", id));
    const snapshot = await getDocs(q);
    const list = snapshot.docs.map(doc => doc.data());
    return list;
}

// Get Prermios Canjeados By Cliente
async function getPremiosCanjeadosByClienteFirestore(id: any) {
    const colRef = collection(db, 'canje_premios');
    const q = query(colRef, where("clientId", "==", id));
    const snapshot = await getDocs(q);
    const list = snapshot.docs.map(doc => doc.data());
    return list;
}


//Get Motivos Visita
async function getMotivosVisita() {
    const colRef = collection(db, 'motivos_visita');
    const q = query(colRef);
    const snapshot = await getDocs(q);
    const list = snapshot.docs.map(doc => doc.data());
    return list;
}

//Get Motivos Visita by Id
async function getMotivoVisitaById(id: any) {
    const colRef = collection(db, 'motivos_visita');
    const q = query(colRef, where("id", "==", id));
    const snapshot = await getDocs(q);
    const list = snapshot.docs.map(doc => doc.data());
    return list;
}

async function getCountOperaciones() {
    return await getCountDataByRef("operaciones_miembros")
}

async function getCountPremiosCanje() {
    return await getCountDataByRef("canje_premios")
}