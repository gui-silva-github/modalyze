import noProjectImage from "../../../assets/no-projects.png"
import Button from "./Button"

export default function NoProjectSelected({onStartAddProject}){

    return (
        <div className="mt-24 text-center w-2/3">
            <img 
                src={noProjectImage} 
                alt="Uma lista de tarefas vazia" 
                className="w-16 h-16 object-contain mx-auto"
            />
            <h2 className="text-xl font-bold text-stone-500 my-4">
                Nenhum projeto selecionado
            </h2>
            <p className="text-stone-400 mb-4">Selecione um projeto já existente ou crie um novo</p>
             <p className="mt-8">
                <Button onClick={onStartAddProject}>
                    Criar novo projeto
                </Button>
            </p>
        </div>
    )

}