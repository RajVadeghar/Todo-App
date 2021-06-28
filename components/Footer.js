import firebasedb from "../firebase";

function Footer({ length }) {
  const deleteCompletedTodos = async () => {
    const completedCollection = await firebasedb
      .collection("users")
      .doc(session?.user?.name)
      .collection("todos")
      .where("isChecked", "==", true)
      .get();

    const batchSize = completedCollection.size;

    if (batchSize === 0) {
      resolve();
      return;
    }

    const batch = firebasedb.batch();

    completedCollection.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  };
  return (
    <div className="mx-3 py-3 flex justify-between items-center">
      <p className="text-black text-opacity-50 dark:text-white dark:text-opacity-50 text-sm w-auto">
        {length} items left
      </p>
      <p
        tabIndex="1"
        onKeyPress={deleteCompletedTodos}
        onClick={deleteCompletedTodos}
        className="text-black text-opacity-50 dark:text-white dark:text-opacity-50 text-sm w-auto break-words"
      >
        clear completed
      </p>
    </div>
  );
}

export default Footer;
