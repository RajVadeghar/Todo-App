function Footer({ length, deleteCompletedTodos }) {
  return (
    <div className="mx-3 py-3 flex justify-between items-center">
      <p className="text-black text-opacity-50 dark:text-white dark:text-opacity-50 text-sm w-auto">
        {length} items left
      </p>
      <p
        tabIndex="1"
        onKeyPress={deleteCompletedTodos}
        onClick={deleteCompletedTodos}
        className="clearCompleted"
      >
        clear completed
      </p>
    </div>
  );
}

export default Footer;
