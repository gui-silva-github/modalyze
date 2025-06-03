import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from 'react-dom'

const ResultModal = forwardRef(function ResultModal({targetTime, remainingTime, onReset}, ref){

    const dialog = useRef()

    const userLost = remainingTime <= 0
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2)
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100)

    useImperativeHandle(ref, ()=>{
        return {
            open(){
                dialog.current.showModal()
            }
        }
    })

    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            {userLost && <h2>Você perdeu!</h2>}
            {!userLost && <h2>Seu placar: {score}</h2>}
            <p>O alvo de tempo foi <strong>{targetTime} segundo{targetTime > 1 ? 's' : ''}.</strong></p>
            <p>Você parou o timer com <strong>{formattedRemainingTime} segundos restantes.</strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button>Fechar</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    )

})

export default ResultModal