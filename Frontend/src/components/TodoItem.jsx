import React from "react";
import { format } from 'date-fns';
import vi from 'date-fns/locale/vi';

const TodoItem = (props) => {
    const dueDateFormat = format(new Date(props.due_date), 'dd MMMM yyyy', { locale: vi });
    const day = parseInt(format(new Date(props.due_date), 'dd')) 
    const todayDay = parseInt(format(new Date(), 'dd'))
    const outDate = day < todayDay
    return (
        <div className={`flex p-4 flex-row items-center w-full border bg-white border-gray-700 p relative my-6 ${props.completed ? "opacity-50": ""} hover:scale-105`}>
            <div className="checkbox p-4 items-center">
                <input 
                    type="checkbox" 
                    name="checkbox" 
                    id="checkbox"
                    checked={props.completed}
                    className="cursor-pointer"
                    onChange={() => props.checked(props.id)}
                />
            </div>
            <div className="todoContent flex flex-row w-full items-center">
                <div className="mr-4">
                    <div className="text-lg font-semibold relative">
                        {props.title}
                        {props.completed ? <span className="w-full h-0.5 opacity-100 bg-black absolute left-0 top-[50%] transition duration-300"></span> : <span className="hidden w-0 opacity-0"></span>}
                    </div>
                    <div className="text-gray-500">{dueDateFormat}</div>
                </div>
                {outDate ? <div className='rounded-full px-2 text-white bg-red-500'>Out of date</div> 
                : <div className={`${props.completed ? 'bg-green-300' : 'bg-green-500'} rounded-full px-2 text-white`}>{props.completed ? "Done" : "Todo"}</div>}
            </div>
            <div className="todoActive flex absolute right-8">
                <div 
                    className="delete-icon mr-4 cursor-pointer"
                    onClick={() => props.delete(props.id)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                </div>
                {props.completed ? "" :
                <div 
                    className="edit-icon cursor-pointer"
                    onClick={() => props.edit(props.id)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                </div>
                }
            </div>
        </div>
    )
}

export default TodoItem;