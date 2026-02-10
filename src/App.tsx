import CharacterGrid from './components/CharacterGrid';
import { kanaData } from './data/kana';
import type { Kana } from './types/kana';
import './App.css';

function App() {
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

  const rowOrder = ['a', 'ka', 'sa', 'ta', 'na', 'ha', 'ma', 'ya', 'ra', 'wa', 'n', 'ga', 'za', 'da', 'ba', 'pa'];

  const getHiraganaByRow = (row: string) => {
    return groupedKana[row]?.map(kana => ({
      character: kana.hiragana,
      romanji: kana.romanji
    })) || [];
  };

  const getKatakanaByRow = (row: string) => {
    return groupedKana[row]?.map(kana => ({
      character: kana.katakana,
      romanji: kana.romanji
    })) || [];
  };

  return (
      <div className="app">
        <header>
          <h1>Apprentissage du Japonais - Kana</h1>
        </header>

        <main>
          {/* Section Hiragana */}
          <section className="main-section">
            <h2 className="section-title">Hiragana</h2>
            {rowOrder.map(row => (
                <CharacterGrid
                    key={`hiragana-${row}`}
                    characters={getHiraganaByRow(row)}
                    title={`Ligne ${row.toUpperCase()}`}
                />
            ))}
          </section>

          {/* Section Katakana */}
          <section className="main-section">
            <h2 className="section-title">Katakana</h2>
            {rowOrder.map(row => (
                <CharacterGrid
                    key={`katakana-${row}`}
                    characters={getKatakanaByRow(row)}
                    title={`Ligne ${row.toUpperCase()}`}
                />
            ))}
          </section>
        </main>
      </div>
  );
}

export default App;