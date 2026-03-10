// src/hooks/useQuiz.ts
import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Kana } from '../types/kana.ts';

interface UseQuizProps {
    kanaData: Kana[];
    script: 'hiragana' | 'katakana';
}

interface UseQuizReturn {
    currentIndex: number;
    userAnswer: string;
    score: { correct: number; total: number };
    bestScore: number;
    feedback: string;
    displayChar: string;
    inputQuizzRef: React.RefObject<HTMLInputElement | null>;
    handleSubmit: (e: React.FormEvent) => void;
    setUserAnswer: React.Dispatch<React.SetStateAction<string>>;
    focusInput: () => void;
    progress: number;
    totalKana: number;
}

// Fonction pour mélanger un tableau (algorithme de Fisher-Yates)
const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export function useQuiz({ kanaData, script }: UseQuizProps): UseQuizReturn {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const [feedback, setFeedback] = useState('');
    const [bestScore, setBestScore] = useLocalStorage<number>('bestQuizScore', 0);

    const inputQuizzRef = useRef<HTMLInputElement>(null);

    // MÉMORISATION : Le tableau mélangé ne se recalculera que si kanaData change
    const shuffledKanaData = useMemo(() => {
        console.log('🔄 Mélange des kanaData (useMemo)');
        return shuffleArray(kanaData);
    }, [kanaData]); // Dépendance : kanaData

    // Récupérer le kana courant depuis le tableau mélangé
    const currentKana = shuffledKanaData[currentIndex];

    // MÉMORISATION : Le caractère à afficher (évite un recalcul inutile)
    const displayChar = useMemo(() => {
        return script === 'hiragana'
            ? currentKana?.hiragana
            : currentKana?.katakana;
    }, [script, currentKana]);

    // MÉMORISATION : La progression (pour éviter le recalcul à chaque render)
    const progress = useMemo(() => {
        return (score.total / shuffledKanaData.length) * 100;
    }, [score.total, shuffledKanaData.length]);

    // Mettre à jour le meilleur score quand le score courant change
    useEffect(() => {
        if (score.correct > bestScore) {
            setBestScore(score.correct);
        }
    }, [score.correct, bestScore, setBestScore]);

    const focusInput = useCallback(() => {
        inputQuizzRef.current?.focus();
    }, []);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();

        const isCorrect = userAnswer.toLowerCase().trim() ===
            currentKana.romanji.toLowerCase();

        setScore(prevScore => ({
            correct: prevScore.correct + (isCorrect ? 1 : 0),
            total: prevScore.total + 1
        }));

        setFeedback(isCorrect ? 'Correct !' : `Incorrect. C'était ${currentKana.romanji}`);
        setUserAnswer('');

        // Passer au suivant après un délai
        setTimeout(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % shuffledKanaData.length);
            setFeedback('');
        }, 1500);
    }, [userAnswer, currentKana, shuffledKanaData.length]);

    return {
        currentIndex,
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
        totalKana: shuffledKanaData.length
    };
}