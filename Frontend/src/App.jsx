import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import Modal from './components/Modal';
import { format } from 'date-fns'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

// Toast notification
const notify = (title, mesg, type) => {
  const toastForm = (t) => (
    <div className='flex items-center'>
      <div className='flex flex-col mr-4'>
        <div className='text-xl font-semibold'>{title}</div>
        <div className="">{mesg}</div>
      </div>
      <div className=''>
        <button onClick={() => toast.dismiss(t.id)} className=''>X</button>
      </div>
    </div>
  )
  if(type === 'success'){
    toast.success(
      toastForm,
      {
        position: 'top-right',  
        className: 'w-fit border-l-8 border-l-green-500 relative flex p-8',
      }
    )
  }
  else{
    toast.error(
      toastForm,
      {
        position: 'top-right',  
        className: 'w-fit border-l-8 border-l-red-500 relative flex p-8',
      }
    )
  }
}
// end: Toast notification

function App() {
  // Define state
  const [todos, setTodos] = useState([]);

  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    due_date: '',
    completed: 0,
  })
  // end: define state

  // Handle open and close modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleopenModal = () => {
    setIsModalOpen(true);
  };

  const handlecloseModal = () => {
    setIsModalOpen(false);
    setNewTodo({ title: '', description: '', due_date: ''});
  };
  // end: Handle open and close modal

  // Handle part of day
  const date = new Date();
  let partDay;
  if (date.getHours() > 5 && date.getHours() <= 12) {
    partDay = 'Morning';
  } else if (date.getHours() > 12 && date.getHours() <= 17) {
    partDay = 'Afternoon';
  } else if (date.getHours() > 17 && date.getHours() <= 22) {
    partDay = 'Evening';
  } else {
    partDay = 'Night';
  }
  // end: Handle part of day

  // Handle get data from API
  useEffect(() => {
    axios.get('http://localhost:3000/api/todos')
      .then(res => {
        setTodos(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  // end: Handle get data from API

  // Handle checked todo
  const handleChecked = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      const updatedTodo = { 
        ...todo, 
        completed: todo.completed === 0 ? 1 : 0,
        due_date: format(new Date(todo.due_date), 'yyyy-MM-dd')
      };

      axios.put(`http://localhost:3000/api/todos/${id}`, updatedTodo)
        .then(() => {
          setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: updatedTodo.completed } : todo
          ));
          notify('Success', 'Task has been updated successfully', 'success');
        })
        .catch(error => notify('Error', error, 'error'));
    }
  }
  // end: Handle checked todo

  // Handle change new todo in modal
  const handleNewTodoChange = (e) => {
    setNewTodo({...newTodo, [e.target.name]: e.target.value});
  }
  // end: Handle change new todo in modal

  // Handle add or update todo
  const addOrUpdateTodo = () => {
      if(!newTodo.title || !newTodo.description || !newTodo.due_date) {
        alert('Please fill all fields');
    } else {
        const todoToSave = {
            ...newTodo,
            due_date: new Date(newTodo.due_date).toISOString()
        };
        // Update todo
        if (newTodo.id) {
          axios.put(`http://localhost:3000/api/todos/${newTodo.id}`, todoToSave)
            .then(() => {
              setTodos(todos.map(todo => 
                todo.id === newTodo.id ? { ...todo, ...todoToSave } : todo
              ));
              handlecloseModal();
              notify('Success', 'Task has been updated successfully', 'success');
            })
            .catch(error => notify('Error', error, 'error'));
        } 
        // Add new todo
        else {
          axios.post('http://localhost:3000/api/todos', todoToSave)
            .then((response) => {
              setTodos([...todos, { ...todoToSave, id: response.data.id }]);
              handlecloseModal();
              notify('Success', 'Task has been added successfully', 'success');
            })
            .catch(error => notify('Error', error, 'error'));
        }
    }
  }
  // end: Handle add or update todo

  // Handle edit todo in modal
  const handleEditTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      const formattedDate = format(new Date(todo.due_date), 'yyyy-MM-dd');
      setNewTodo({ ...todo, due_date: formattedDate, id });
      handleopenModal();  
    }
  }
  // end: Handle edit todo in modal

  // Handle delete todo
  const handleDeleteTodo = (id) => {
    if(window.confirm('Are you sure you want to delete this task?')){
      axios.delete(`http://localhost:3000/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
        notify('Success', 'Task has been deleted successfully', 'success');
      })
      .catch(err => notify('Error', err, 'error'));
    }
  }
  // end: Handle delete todo

  return (
    <>
      <div className="content-wrapper relative flex flex-row text-base font-Karla max-w-screen-2xl h-dvh w-full overflow-auto scroll-smooth">
        <div className="taskbar fixed h-full left-0 basis-1/7 bg-gray-800 text-white text-center">
          <nav className="flex flex-col">
            <div className="logo text-xl font-Tiny uppercase p-6 border-b border-b-white font-semibold">
              Owltodo
            </div>

            <ul className="menu divide-y divide-slate-600">
              <li className="ct-menu-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
              </li>
              <li className="ct-menu-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
              </li>
              <li className="ct-menu-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-archive"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>
              </li>
              <li className="ct-menu-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
              </li>
            </ul>
          </nav>
        </div> {/* end taskbar */}

        <div className="main relative basis-6/7 w-full h- p-12 ml-[134px] h-fit bg-slate-100">
          <div className="">
            <div className="text-3xl font-semibold">Good {partDay}, Long! 👋</div>
            <div className="date mb-8 text-xl text-gray-500">Today, {date.toDateString()}</div>
          </div>

          <div className="w-full">
            <h1 className="text-3xl font-semibold mb-2">My to do</h1>
            <TodoList 
              todos={todos} 
              deleteTodo={handleDeleteTodo}
              editTodo={handleEditTodo}
              checkedTodo={handleChecked}
            />
          </div> {/* end todolist */}

          <div className="fixed bottom-2">
            <div className="ct-buttom-transition relative flex items-center bg-gray-800 text-white font-bold px-6 py-4 rounded-full cursor-pointer hover:bg-gray-900" onClick={handleopenModal}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <button className="">Create new task</button>
              
            </div>
            {isModalOpen && (
              <Modal 
                closeModal={handlecloseModal} 
                modal={newTodo}
                handleNewTodoChange={handleNewTodoChange}
                addOrUpdateTodo={addOrUpdateTodo}
              />
            )}
          </div>
          {/* end button add task */}

          <div className="user -z-0 absolute top-8 right-16 p-4 rounded-full border border-gray-800 " title='user'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          {/* end avatar user */}
        </div> {/* end main */}
      </div> {/* end content-wrapper */}
      <Toaster />
    </>
  );
}

export default App;