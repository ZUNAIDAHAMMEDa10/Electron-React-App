import { useEffect, useState } from "react";
import Box from "./Box";
import Input from "./Input";
import { db } from "../../services/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

function Todo() {
  const [todos, setToDo] = useState([]);
  const [tododata, setData] = useState([]);
  const [added, setAdded] = useState(false);

  const addToDoHandler = (item) => {
    console.log(item);
    setToDo([
      ...todos,
      {
        item,
        time: new Date().toLocaleTimeString(),
      },
    ]);
    setAdded(true);
  };

  const getData = async () => {
    const tasksCollection = collection(db, "tasks");
    const querySnapshot = await getDocs(tasksCollection);
    const datas = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    datas.sort((a, b) => a.id - b.id);
    setData(datas);
  };

  const uploadData = async (data) => {
    try {
      // const tasksCollection = collection(db, "tasks");
      // const querySnapshot = await getDocs(tasksCollection);

      // Check if there are no documents with the same id

      await addDoc(collection(db, "tasks"), {
        body: data.item,
        time: data.time,
        id: tododata.length,
      });
      getData();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  if (added) {
    uploadData(todos[todos.length - 1]);
    setAdded(false);
  }

  useEffect(() => {
    getData();
  }, []);

  const removeToDo = async (id) => {
    console.log(id);
    try {
      const tasksCollection = collection(db, "tasks");
      const querySnapshot = await getDocs(tasksCollection);

      const docToDelete = querySnapshot.docs.find(
        (doc) => doc.data().id === id
      );

      if (docToDelete) {
        // eslint-disable-next-line
        const deletedId = docToDelete.data().id;
        const remainingDocs = querySnapshot.docs.filter(
          (doc) => doc.id !== docToDelete.id
        );

        // Update the IDs for the remaining data
        for (let index = 0; index < remainingDocs.length; index++) {
          const docs = remainingDocs[index];
          const data = docs.data();
          data.id = index;
          const docRef = doc(db, "tasks", docs.id);
          await setDoc(docRef, data);
        }

        // Delete the old document
        await deleteDoc(docToDelete.ref);

        getData(); // Refresh the data after making updates
      } else {
        console.log("Document not found with the specified ID:", id);
      }
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div className="bg-white h-screen p-3">
      <div className="rounded mx-auto max-w-[750px] lg:max-h-[550px]  lg:min-h-[550px] md:max-h-[500px] md:min-h-[500px] shadow-2xl bg-dark-purple">
        <Input handler={addToDoHandler} />
        <Box data={tododata} removeHandler={removeToDo} />
      </div>
    </div>
  );
}

export default Todo;
