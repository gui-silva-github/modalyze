import Tasks from "../Tasks/Tasks"

export default function SelectedProject({project, onDelete, onAddTask, onDeleteTask, tasks}){

    if (!project) {
        return (
            <div className="w-[35rem] mt-16">
                <p className="text-stone-500">Carregando...</p>
            </div>
        )
    }

    const formattedDate = new Date(project.dueDate).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC'  
    })

    return (
        <div className="w-[35rem] mt-16">
            <header className="pb-4 mb-4 border-b-2 border-stone-300">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-stone-600 mb-2">
                        {project.title}
                    </h1>
                    <button 
                    className="text-stone-600 hover:text-stone-950"
                    onClick={onDelete}
                    >
                        Deletar
                    </button>
                </div>
                <p className="mb-4 text-stone-400">{formattedDate}</p>
                <p className="text-stone-600 whitespace-pre-wrap">
                    {project.description}
                </p>
            </header>
            <Tasks onAdd={onAddTask} onDelete={onDeleteTask} tasks={tasks}  />
        </div>
    )
}