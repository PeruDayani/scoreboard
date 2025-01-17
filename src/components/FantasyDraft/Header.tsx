import { WinnerType } from "@/utils/types"
import Confetti from 'react-dom-confetti';
import leftWinnerImg from '../../../public/left_winner.png'
import rightWinnerImg from '../../../public/right_winner.png'
import Image from 'next/image'
import { CONFETTI_CONFIG } from "@/utils/constants";
import { useCallback, useEffect, useMemo, useState } from "react";

type HeaderParams = {
    captainTeamA: string,
    captainTeamB: string,
    winner: WinnerType,
    imageSize?: number,
}

export default function Header({ 
    captainTeamA,
    captainTeamB,
    winner,
    imageSize = 16,
}: HeaderParams) {

    const [confettiStatus, setConfettiStatus] = useState<boolean>(false)
    
    const isWinnerTeamA = useMemo(() => {
        return winner == 'A'
    }, [winner]) 

    const winnerImageSrc = useMemo(() => {
        return isWinnerTeamA ? leftWinnerImg : rightWinnerImg
    }, [isWinnerTeamA])

    const triggerConfetti = useCallback(() => {
        setConfettiStatus(true)
        setTimeout(() => setConfettiStatus(false), 1000)    
    }, [])

    useEffect(() => {
        triggerConfetti()
    }, [triggerConfetti])
    
    return (
        <div onClick={triggerConfetti}>
            <div className='flex justify-between items-center italic text-center'>
                <div className="w-1/3 flex flex-col items-center">
                    <div> { captainTeamA }  </div>
                    <Confetti active={isWinnerTeamA && confettiStatus} config={CONFETTI_CONFIG} />
                </div>
                <div className="w-1/3">
                    <Image className={`w-${imageSize} m-auto`} src={winnerImageSrc} alt="winner image"/>
                </div>
                <div className="w-1/3 flex flex-col items-center">
                    <div> { captainTeamB } </div>
                    <Confetti active={!isWinnerTeamA && confettiStatus} config={CONFETTI_CONFIG} />
                </div>
            </div>
        </div>
    )
}