import { useState } from 'react'

import NewProject from "./components/NewProject"
import NoProjectSelected from "./components/NoProjectSelected"
import ProjectsSideBar from './components/ProjectsSideBar'
import SelectedProject from "./components/SelectedProject"

export default function Analyze(){

    const [projectsState, setProjectsState] = useState({
        selectedProjectId: 'no', 
        projects: [],
        tasks: []
    })

    function handleAddTask(text){
        setProjectsState(prevState => {
            const taskId = Math.random()
            const newTask = {
                text: text, 
                projectId: prevState.selectedProjectId, 
                id: taskId
            }

            return {
               ...prevState,
                tasks: [newTask, ...prevState.tasks]
            }
        })
    }

    function handleDeleteTask(id){
        setProjectsState(prevState => {
            return {
                ...prevState,
                tasks: prevState.tasks.filter(
                    (task) => task.id !== id
                )
            }
        })
    }

    function handleSelectProject(id){
        setProjectsState(prevState => {
            return {
                ...prevState, 
                selectedProjectId: id
            }
        })
    }

    function handleStartAddProject(){
        setProjectsState(prevState => {
            return {
                ...prevState, 
                selectedProjectId: 'new'
            }
        })
    }

    function handleCancelAddProject(){
        setProjectsState(prevState => {
            return {
                ...prevState, 
                selectedProjectId: 'no'
            }
        })
    }

    function handleAddProject(projectData){
        setProjectsState(prevState => {
            const projectId = Math.random()

            const newProject = {
                ...projectData, 
                id: projectId
            }

            return {
                ...prevState, 
                selectedProjectId: 'no',
                projects: [...prevState.projects, newProject]
            }
        })
    }

    function handleDeleteProject(){
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: 'no',
                projects: prevState.projects.filter(
                    (project) => project.id !== prevState.selectedProjectId
                )
            }
        })
    }

    const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId)
    const selectedTasks = projectsState.tasks.filter(task => task.projectId === selectedProject?.id) 

    let content = (
        <SelectedProject
        project={selectedProject}
        onDelete={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        tasks={selectedTasks}
        />
    )

    if (projectsState.selectedProjectId === 'new'){
        content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
    } else if (projectsState.selectedProjectId === 'no'){
        content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
    }

    return (
        <main className='h-screen my-8 flex gap-8'>
            <ProjectsSideBar
                onStartAddProject={handleStartAddProject}
                projects={projectsState.projects}
                onSelectProject={handleSelectProject}
                selectedProjectId={projectsState.selectedProjectId}
            />
            {
                content
            }
        </main>
    )

}