import CharacterCard from './CharacterCard';

interface Character {
    character: string;
    romanji: string;
}

interface CharacterGridProps {
    characters: Character[];
    title: string;
}

export default function CharacterGrid({ characters, title }: CharacterGridProps) {
    return (
        <div className="kana-section">
            <h2>{title}</h2>
            <div className="grid-container">
                {characters.map((char) => (
                    <CharacterCard
                        key={char.character}
                        character={char.character}
                        romanji={char.romanji}
                    />
                ))}
            </div>
        </div>
    );
}