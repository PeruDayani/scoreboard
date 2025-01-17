import { FantasyDraftConfig } from '@/utils/types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function FantasyGameCard({fantasyDraft}: {fantasyDraft: FantasyDraftConfig}) {

    return (
        <Link href={`/fantasy/${fantasyDraft.urlId}`}>
            <div className="min-w-[100px] m-2 p-4 px-8 bg-purple-100 hover:bg-purple-800 hover:text-white rounded-lg flex flex-col">
                <div className="py-2 text-center italic">
                    {fantasyDraft.title}
                </div>

                <div className="py-2 flex gap-3 justify-center items-center text-center capitalize">
                    <div> {fantasyDraft.captainTeamA} </div>
                    <FontAwesomeIcon icon={faAt} size="sm"/>
                    <div> {fantasyDraft.captainTeamB} </div>
                </div>

            </div>
        </Link>
    )
}