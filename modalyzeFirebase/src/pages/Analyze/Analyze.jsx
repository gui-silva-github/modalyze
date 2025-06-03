import { useEffect, useState } from 'react'

import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import format from "date-fns/format"
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import ptBR from 'date-fns/locale/pt-BR'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import NewProject from "./components/Projects/NewProject"
import NoProjectSelected from "./components/Projects/NoProjectSelected"
import ProjectsSideBar from './components/Projects/ProjectsSideBar'
import SelectedProject from "./components/Projects/SelectedProject"

import { db } from '../../firebase'
import { 
    collection, query, onSnapshot, doc, addDoc, deleteDoc, updateDoc 
} from 'firebase/firestore'

const locales = {
  'pt-BR': ptBR,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay, 
    locales
})

export default function Analyze(){

    const [projectsState, setProjectsState] = useState([])

    const [selectedProjectId, setSelectedProjectId] = useState('no')

    useEffect(() => {
        const q = query(collection(db, 'projectsState'))

        const unsubscribe = onSnapshot(q, (querySnaphot) => {
            let projectsStateArr = []

            querySnaphot.forEach((docSnap) => {
                const data = docSnap.data()

                projectsStateArr.push({
                    ...data, 
                    id: docSnap.id,
                    tasks: data.tasks || []   
                })
            })

            setProjectsState(projectsStateArr)
        })

        return ()=> unsubscribe
    }, [])

    const events = projectsState.map(project => {
        const [year, month, day] = project.dueDate.split('-').map(Number)

        const localDate = new Date(year, month - 1, day, 12)

        return {
            title: project.title,
            start: localDate,
            end: localDate,
            allDay: true
        }
    })

    const sortedProjects = [...projectsState].sort((a, b) => {
        const dateA = new Date(a.dueDate)
        const dateB = new Date(b.dueDate)
        return dateA - dateB
    })

    async function handleAddTask(text){
        const updatedProjects = [...projectsState]
        const projectIndex = updatedProjects.findIndex(p => p.id === selectedProjectId)

        if (projectIndex === -1) return

        const selectedProject = updatedProjects[projectIndex]
        const newTask = {
            id: crypto.randomUUID(),
            text: text
        }

        const updatedTasks = [newTask, ...selectedProject.tasks]

        await updateDoc(doc(db, 'projectsState', selectedProjectId), {
            tasks: updatedTasks
        })
    }

    async function handleDeleteTask(taskId){
        const selectedProject = projectsState.find(p => p.id === selectedProjectId)
        if (!selectedProject) return

        const updatedTasks = selectedProject.tasks.filter(task => task.id !== taskId)
        
        await updateDoc(doc(db, 'projectsState', selectedProjectId), {
            tasks: updatedTasks
        })
    }

    function handleSelectProject(id){
        setSelectedProjectId(id)
    }

    function handleStartAddProject(){
        setSelectedProjectId('new')
    }

    function handleCancelAddProject(){
        setSelectedProjectId('no')
    }

    async function handleAddProject(projectData){
        await addDoc(collection(db, 'projectsState'), {
            title: projectData.title,
            description: projectData.description,
            dueDate: projectData.dueDate,
            tasks: []
        })

        setSelectedProjectId('no')
    }

    async function handleDeleteProject(){
        if (selectedProjectId) {
            await deleteDoc(doc(db, 'projectsState', selectedProjectId))
            setSelectedProjectId('no')
        }
    }

    const selectedProject = projectsState.find(project => project.id === selectedProjectId) 

    let content = (
        <SelectedProject
        project={selectedProject}
        onDelete={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        tasks={selectedProject? selectedProject.tasks : []}
        />
    )

    if (selectedProjectId === 'new'){
        content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
    } else if (selectedProjectId === 'no'){
        content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
    }

    return (
        <main className='h-screen my-8 flex gap-8'>
            <ProjectsSideBar
                onStartAddProject={handleStartAddProject}
                projects={sortedProjects}
                onSelectProject={handleSelectProject}
                selectedProjectId={selectedProjectId}
            />
            {
                content
            }
            <div className="bg-[#F5F5F5] text-black rounded-lg p-4">
                <div style={{ height: '700px' }}>
                <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                culture="pt-BR"
                style={{ backgroundColor: '#1f2937', color: '#fff' }}
                eventPropGetter={() => ({
                    style: {
                    backgroundColor: '#256', 
                    color: 'white',
                    borderRadius: '4px',
                    border: 'none',
                    padding: '2px 6px',
                    },
                })}
                dayPropGetter={() => ({
                    style: {
                    backgroundColor: '#374151', 
                    color: '#fff', 
                    }
                })}
                toolbarAccessor={{
                    style: {
                    backgroundColor: '#1e293b', 
                    color: '#fff',
                    }
                }}
                />
                </div>
            </div>
        </main>
    )

}