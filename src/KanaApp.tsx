import './KanaApp.css';
import {useState} from "react";
import {StudyMode} from "./components/StudyMode.tsx";
import {QuizMode} from "./components/QuizzMode.tsx";
import {Header} from "./components/Header.tsx";


export function KanaApp(){
    const [script, setScript] = useState<'hiragana' | 'katakana'>('hiragana');
    const [mode, setMode] = useState<'study' | 'quiz'>('study');

    const rowOrder = ['a', 'ka', 'sa', 'ta', 'na', 'ha', 'ma', 'ya', 'ra', 'wa', 'n', 'ga', 'za', 'da', 'ba', 'pa'];

    const switchMode = (newMode: 'study' | 'quiz') => {
        setMode(newMode);
    };

    return (
        <div className="app">
            <Header title={"Apprentissage du Japonais - Kana app"}>
                <button onClick={() => switchMode('study')}>Étude</button>
                <button onClick={() => switchMode('quiz')}>Quiz</button>
            </Header>

            <main>
                {mode === 'study' &&
                    <>
                    <input
                            type="radio"
                            name="japanese"
                            id="hiragana"
                            checked={script === 'hiragana'}
                            onChange={() => setScript('hiragana') }/>
                        <label htmlFor="hiragana">hiragana</label>

                        <input
                            type="radio"
                            name="japanese"
                            id="katakana"
                            checked={script === 'katakana'}
                            onChange={() => setScript('katakana')}/>
                        <label htmlFor="katakana">katakana</label><br/>
                        <StudyMode script={script} rowOrder={rowOrder}/>
                    </>
                }
                {mode === 'quiz' && <QuizMode script={script}/>}

            </main>
        </div>
    );
}
