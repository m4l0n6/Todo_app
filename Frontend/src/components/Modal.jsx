
const Modal = ({ closeModal, modal, handleNewTodoChange, addOrUpdateTodo }) => {
    const handleOutsideClick = (e) => {
        if (e.target.className.includes('overlay')) {
            closeModal();
        }
    };

    return (
        <div 
            className="overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" 
            onClick={handleOutsideClick}
        >
            <div className="modal w-[300px] h-[360px] border border-gray-900 p-4 rounded-xl bg-white">
                <div className="modal-content relative">
                    <h1 className="text-center text-xl font-semibold p-2">
                        {modal.id ? "Edit Task" : "New Task"}
                    </h1>
                    <button onClick={closeModal} className="absolute top-2 right-2 text-gray-700 text-lg">X</button>
                    <div className="add-task w-full mb-4">
                        <label htmlFor="title">Title: </label>
                        <input 
                            value={modal.title}
                            type="text" 
                            name="title"
                            className="ct-modal-input" 
                            placeholder="Enter title"
                            onChange={handleNewTodoChange}
                            required
                        />
                        <label htmlFor="description">Description: </label>
                        <input 
                            value={modal.description}
                            type="text" 
                            name="description"
                            className="ct-modal-input" 
                            placeholder="Enter description"
                            onChange={handleNewTodoChange}
                            required
                        />
                        <label htmlFor="date">Date: </label>
                        <input 
                            value={modal.due_date}
                            id="due_date" 
                            type="date" 
                            name="due_date" 
                            className="ct-modal-input"
                            onChange={handleNewTodoChange}
                            required
                        />
                    </div>
                    <button 
                        onClick={addOrUpdateTodo} 
                        className="ct-buttom-transition font-bold w-full py-2 px-4 border border-gray-900 rounded-full text-lg bg-gray-300 hover:bg-gray-400"
                    >
                        {modal.id ? "Save" : "Add"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
