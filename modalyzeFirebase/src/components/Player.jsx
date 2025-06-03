import { useState, useRef } from "react"

export default function Player(){

    const input = useRef()

    const [name, setName] = useState(null)

    function handleClick(){
        setName(input.current.value)
        input.current.value = ''
    }

    return (
        <section id="player">
            <h1 className="text-black">Bem vindo {name ?? '...'}</h1>
            <p>
                <input ref={input} type="text"/>
                <button onClick={handleClick}>Atribuir nome</button>
            </p>
        </section>
    )

}