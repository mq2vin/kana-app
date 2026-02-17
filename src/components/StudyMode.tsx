import HiraganaCard from "./HiraganaCard.tsx";
import KatakanaCard from "./KatakanaCard.tsx";

interface StudyModeProps {
    script: "hiragana" | "katakana"
    rowOrder: string[]
}

export function StudyMode({script, rowOrder}: StudyModeProps) {
    if (script === 'hiragana') return <HiraganaCard rowOrder={rowOrder}/>;
    if (script === 'katakana') return <KatakanaCard rowOrder={rowOrder}/>;
}