import type {Kana} from "../types/kana.ts";
import {kanaData} from "../data/kana.ts";
import CharacterGrid from "./CharacterGrid.tsx";

interface HiraganaCardProps {
    rowOrder: string[];
}

export default function KatakanaCard({rowOrder}: HiraganaCardProps) {
    const groupByRow = (kanas: Kana[]) => {
        const grouped: Record<string, Kana[]> = {};
        kanas.forEach(kana => {
            if (!grouped[kana.row]) {
                grouped[kana.row] = [];
            }
            grouped[kana.row].push(kana);
        });
        return grouped;
    };

    const groupedKana = groupByRow(kanaData);

    const getKatakanaByRow = (row: string) => {
        return groupedKana[row]?.map(kana => ({
            character: kana.katakana,
            romanji: kana.romanji
        })) || [];
    };

    return(
        <section className="main-section">
            <h1 className="section-title">Katakana</h1>
            {rowOrder.map(row => (
                <CharacterGrid
                    key={`katakana-${row}`}
                    characters={getKatakanaByRow(row)}
                    title={`Ligne ${row.toUpperCase()}`}
                />
            ))}
        </section>
    )
}