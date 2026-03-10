import { useQuiz } from '../hooks/useQuiz';
import { kanaData } from '../data/kana.ts';
import { useEffect, useState } from 'react';

interface QuizModeProps {
    script: 'hiragana' | 'katakana';
}

export function QuizMode({ script }: QuizModeProps) {
    const {
        userAnswer,
        score,
        bestScore,
        feedback,
        displayChar,
        inputQuizzRef,
        handleSubmit,
        setUserAnswer,
        focusInput,
        progress,
        totalKana
    } = useQuiz({ kanaData, script });

    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        setIsTransitioning(true);
        const timer = setTimeout(() => setIsTransitioning(false), 500);
        return () => clearTimeout(timer);
    }, [displayChar]);

    if (!displayChar) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <div className="score-container">
                    <div className="score-item">
                        <div className="score-label">Score actuel</div>
                        <div className="score-value current">
                            {score.correct} / {score.total}
                        </div>
                    </div>
                    <div className="score-item">
                        <div className="score-label">🏆 Record</div>
                        <div className="score-value best">
                            {bestScore}
                        </div>
                    </div>
                </div>
            </div>

            <div className="quiz-card">
                <div className={`quiz-character ${isTransitioning ? 'character-transition' : ''}`}>
                    <h2>{displayChar}</h2>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="quiz-form">
                <div className="input-group">
                    <input
                        type="text"
                        ref={inputQuizzRef}
                        value={userAnswer}
                        onChange={e => setUserAnswer(e.target.value)}
                        placeholder="Entrez le romanji..."
                        className="quiz-input"
                        autoFocus
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        onClick={focusInput}
                        className="quiz-button"
                    >
                        Valider
                    </button>
                </div>

                {feedback && (
                    <div className={`feedback-container ${
                        feedback.includes('Correct') ? 'feedback-correct' : 'feedback-incorrect'
                    }`}>
                        {feedback.includes('Correct') ? '✓ ' : '✗ '}
                        {feedback}
                    </div>
                )}

                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                        title={`${score.total} / ${totalKana} caractères vus`}
                    />
                </div>

                <div className="stats-hint">
                    {totalKana - score.total} caractères restants
                </div>
            </form>
        </div>
    );
}