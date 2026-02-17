import CharacterGrid from "./CharacterGrid.tsx";
import type {Kana} from "../types/kana.ts";
import {kanaData} from "../data/kana.ts";

interface HiraganaCardProps {
    rowOrder: string[];
}

export default function HiraganaCard({rowOrder}: HiraganaCardProps) {
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

    const getHiraganaByRow = (row: string) => {
        return groupedKana[row]?.map(kana => ({
            character: kana.hiragana,
            romanji: kana.romanji
        })) || [];
    };

    return(
        <section className="main-section">
            <h1 className="section-title">Hiragana</h1>
            {rowOrder.map(row => (
                <CharacterGrid
                    key={`hiragana-${row}`}
                    characters={getHiraganaByRow(row)}
                    title={`Ligne ${row.toUpperCase()}`}
                />
            ))}
        </section>
    )
}