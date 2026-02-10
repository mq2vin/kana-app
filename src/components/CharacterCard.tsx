
interface CharacterCardProps {
    character: string;
    romanji: string;
}

export default function CharacterCard({character, romanji}: CharacterCardProps) {
    return(
        <>
            <p>{character}</p>
            <p>{romanji}</p>
        </>
    )
}