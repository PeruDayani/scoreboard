import { WinnerType } from "@/utils/types"
import Confetti from 'react-dom-confetti';
import leftWinnerImg from '../../../public/left_winner.png'
import rightWinnerImg from '../../../public/right_winner.png'
import tieGameImg from '../../../public/tie_game.png'
import Image from 'next/image'
import { CONFETTI_CONFIG } from "@/utils/constants";
import { useCallback, useEffect, useMemo, useState } from "react";
import { faBasketball } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type HeaderParams = {
    captainTeamA: string,
    captainTeamB: string,
    winner: WinnerType,
    imageCSS?: string,
    confettiOnLoad?: boolean
}

export default function Header({ 
    captainTeamA,
    captainTeamB,
    winner,
    imageCSS = 'w-16',
    confettiOnLoad = false
}: HeaderParams) {

    const [confettiStatus, setConfettiStatus] = useState<WinnerType>(null)
    
    const isWinnerTeamA = useMemo(() => {
        return winner == 'A'
    }, [winner]) 

    const winnerImageSrc = useMemo(() => {
        if (winner) {
            return isWinnerTeamA ? leftWinnerImg : rightWinnerImg
        }

        return tieGameImg
    }, [isWinnerTeamA])

    const triggerConfetti = useCallback(() => {
        setConfettiStatus(winner)
        setTimeout(() => setConfettiStatus(null), 1000)    
    }, [])

    useEffect(() => {
        confettiOnLoad && triggerConfetti()
    }, [triggerConfetti])
    
    return (
        <div onClick={triggerConfetti}>
            <div className='flex justify-between items-center italic text-center'>
                <div className="w-1/3 flex flex-col items-center">
                    <div> { captainTeamA }  </div>
                    <Confetti active={confettiStatus == 'A'} config={CONFETTI_CONFIG} />
                </div>
                <div className="w-1/3">
                    <Image className={`${imageCSS} m-auto`} src={winnerImageSrc} alt="winner image"/>
                </div>
                <div className="w-1/3 flex flex-col items-center">
                    <div> { captainTeamB } </div>
                    <Confetti active={confettiStatus == 'B'} config={CONFETTI_CONFIG} />
                </div>
            </div>
        </div>
    )
}