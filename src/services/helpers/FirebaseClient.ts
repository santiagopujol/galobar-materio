import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, setDoc,
    deleteDoc, doc, where, query, getDoc, startAt, endAt, orderBy
} from 'firebase/firestore';
 
const firebaseConfig = {
    apiKey: "AIzaSyDf2Ut5XeGHHG7UXu20YELyCq5xDB5mWjY",
    authDomain: "galobar-184a6.firebaseapp.com",
    databaseURL: "https://galobar-184a6-default-rtdb.firebaseio.com",
    projectId: "galobar-184a6",
    storageBucket: "galobar-184a6.appspot.com",
    messagingSenderId: "28522361301",
    appId: "1:28522361301:web:2a20d40f1bfa6761f40d5c",
    measurementId: "G-10DCXWB8N8"
};

initializeApp(firebaseConfig);
const db = getFirestore();

export const FirebaseClient = {
    getDocsByRef, 
    addDocByRef,
    deleteDocByRef,
    getDocByRefAndId,
    getDocByRefAndDocId,
    updateDocByRefAndId,
    getDocsByRefAndFilter,
    getUserCliente,
    getPuntosByClienteFirestore,
    getOperacionesByClienteFirestore
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
async function getDocsByRefAndFilter(colRef: string, filterField: string, operator: string, filterValues: string[]) {
    const querys = [];
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
    console.log(password)
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

//Get Operaciones By Cliente
async function getOperacionesByClienteFirestore(id: any) {
    const colRef = collection(db, 'operaciones_miembros');
    const q = query(colRef, where("clientId", "==", id));
    const snapshot = await getDocs(q);
    const list = snapshot.docs.map(doc => doc.data());

    return list;
}