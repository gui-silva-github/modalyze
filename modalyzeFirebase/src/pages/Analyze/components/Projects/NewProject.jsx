import { useRef } from "react"
import Input from "../utils/Input"
import Modal from "../utils/Modal"

export default function NewProject({onAdd, onCancel}){

    const modal = useRef()

    const title = useRef()
    const description = useRef()
    const dueDate = useRef()

    function handleSave(){
        const enteredTitle = title.current.value
        const enteredDescription = description.current.value
        const enteredDueDate = dueDate.current.value

        if (enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredDueDate.trim() === ''){
            modal.current.open()
            return
        }

        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate
        })
    }

    return (
        <>
            <Modal ref={modal} buttonCaption="Fechar">
                <h2 className="text-xl font-bold text-stone-500 my-4">Input inválido</h2>
                <p className="text-stone-400 mb-4">Oops ... parece que você esqueceu de inserir um valor.</p>
                <p className="text-stone-400 mb-4">Por favor tenha a atenção de preencher cada campo requerido.</p>
            </Modal>
            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button 
                            className="text-stone-800 hover:text-stone-950"    
                            onClick={onCancel}
                        >Cancelar</button>
                    </li>
                    <li>
                        <button
                            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                            onClick={handleSave}
                        >Salvar</button>
                    </li>
                </menu>
                <div>
                    <Input type="text" ref={title} label="Título" />
                    <Input ref={description} label="Descrição" textarea/>
                    <Input type="date" ref={dueDate} label="Data de Vencimento" />
                </div>
            </div>
        </>
    )
}