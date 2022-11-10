import { collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc, query, onSnapshot} from 'firebase/firestore'

class TeacherService {

    static list = (firestoreDb,callback)=> {
        getDocs(collection(firestoreDb,'teacher'))
        .then(
            (teacherSnapshot)=>{
                const teachers = []
                teacherSnapshot.forEach(
                    (teacher)=>{
                        //console.log(student.id)
                        const id = teacher.id
                        const {name,course,salary} = teacher.data()
                        //console.log(name+" "+course+" "+ira)
                        teachers.push({id,name,course,salary})
                    }
                )//forEach
                callback(teachers)
            }//studentSnapshot
        )//then
        .catch(error=>console.log(error))
    }

    static list_on_snapshot = (firestoreDb,callback)=>{
        const q = query(collection(firestoreDb,'teacher'))
        const unscribe = onSnapshot(
            q,
            (querySnaphot)=>{
                const teachers = []
                querySnaphot.forEach(
                    (document)=>{
                        const id = document.id
                        const {name,course,salary} = document.data()
                        teachers.push({id,name,course,salary})
                    }//document
                )//forEach
                callback(teachers)
            }//querySnaphot
        )//onSnapshot
    }

    static add = (firestoreDb,callback,teacher)=>{
        addDoc(collection(firestoreDb,'teacher'),teacher)
        .then(
            (docRef)=>{
                callback(docRef.id)
            }
        )
        .catch(error=>console.log(error))
    }

    static retrieve = (firestoreDb,callback,id)=>{
        getDoc(doc(firestoreDb,'teacher',id))
        .then(
            (docSnap)=>{
                if(docSnap.exists()){
                    //console.log("Document data:", docSnap.data())
                    callback(docSnap.data())
                }
            }
        )
        .catch(error=>console.log(error))
    }

    static update = (firestoreDb,callback,id,teacher)=>{
        updateDoc(
            doc(firestoreDb,'teacher',id),
            teacher)
        .then(
            ()=>{
                callback(true)
            }
        )
        .catch(error=>console.log(error))
    }

    static delete = (firestoreDb,callback,id)=>{
        deleteDoc(doc(firestoreDb,'teacher',id))
        .then(()=>callback(true))
        .catch(error=>console.log(error))
    }

}

export default TeacherService