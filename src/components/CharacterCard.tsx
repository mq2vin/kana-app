interface CharacterCardProps {
    character: string;
    romanji: string;
}

export default function CharacterCard({ character, romanji }: CharacterCardProps) {
    return (
        <div className="character-card">
            <div className="character-text">{character}</div>
            <div className="romanji-text">{romanji}</div>
        </div>
    );
}