import './Home.scss';
import { useState } from 'react';
import Vopros from '@/components/Psiprops/Vopros';
import { questions } from '../About/About';

const Home = () => {


    const EXCITATION_YES = [3, 4, 7, 13, 15, 16, 19, 21, 23, 24, 32, 39, 45, 56, 60, 61, 66, 72, 73, 78, 81, 82, 83, 94, 97, 98, 102, 105, 106, 113, 114, 117, 121, 122, 124, 130, 132, 133];

    const EXCITATION_NO = [47, 51, 107, 123];


    const INHIBITION_YES = [2, 5, 8, 10, 12, 16, 27, 30, 36, 37, 38, 41, 48, 50, 52, 53, 62, 65, 69, 70, 75, 77, 84, 87, 89, 90, 96, 99, 103, 108, 109, 110, 112, 118, 120, 125, 126, 129];

    const INHIBITION_NO = [18, 34, 36, 59, 67, 128];


    const MOBILITY_YES = [1, 6, 9, 11, 14, 20, 22, 26, 28, 29, 31, 33, 40, 42, 43, 44, 46, 49, 54, 55, 64, 68, 71, 74, 76, 79, 80, 85, 86, 88, 91, 92, 93, 95, 100, 101, 107, 111, 115, 116, 119, 127, 131];

    const MOBILITY_NO = [25, 57, 63];

    const [answers, setAnswers] = useState<Record<number, 'yes' | 'no' | 'unknown'>>({});
    const [index, setIndex] = useState(0);
    const [finish, setFinish] = useState(false);
    const handAnswer = (answer: 'yes' | 'no' | 'unknown') => {
        setAnswers(prev => ({ ...prev, [index + 1]: answer }));
        if (index + 1 < questions.length) {
            setIndex(index + 1)
        }
        else {
            setFinish(true)
        }
    }



    const calculate = () => {
        let excitation = 0;
        let inhibition = 0;
        let mobility = 0;

        for (let num = 1; num <= questions.length; num++) {
            const answer = answers[num];
            if (!answer || answer === 'unknown') {

                if (EXCITATION_YES.includes(num) || EXCITATION_NO.includes(num)) {
                    excitation += 1;
                }

                if (INHIBITION_YES.includes(num) || INHIBITION_NO.includes(num)) {
                    inhibition += 1;
                }

                if (MOBILITY_YES.includes(num) || MOBILITY_NO.includes(num)) {
                    mobility += 1;
                }
                continue;
            }

            const isYes = answer === 'yes';


            if (EXCITATION_YES.includes(num) && isYes) excitation += 2;
            if (EXCITATION_NO.includes(num) && !isYes) excitation += 2;


            if (INHIBITION_YES.includes(num) && isYes) inhibition += 2;
            if (INHIBITION_NO.includes(num) && !isYes) inhibition += 2;


            if (MOBILITY_YES.includes(num) && isYes) mobility += 2;
            if (MOBILITY_NO.includes(num) && !isYes) mobility += 2;
        }

        return { excitation, inhibition, mobility };

    }
    if (finish) {
        const scores = calculate();
        return (
    <div className="results-container">
        <h2 className="results-title">📊 Результаты Теста</h2>
        
        <div className="scores-list">
            <div className="score-item excitation">
                <span className="score-label">Сила Возбуждения:</span>
                <span className="score-value">{scores.excitation}</span>
                <span className={`score-status ${scores.excitation >= 42 ? 'high' : 'normal'}`}>
                    {scores.excitation >= 42 ? 'высокая' : 'норма/низкая'}
                </span>
            </div>
            
            <div className="score-item inhibition">
                <span className="score-label">Сила Торможения:</span>
                <span className="score-value">{scores.inhibition}</span>
                <span className={`score-status ${scores.inhibition >= 42 ? 'high' : 'normal'}`}>
                    {scores.inhibition >= 42 ? 'высокая' : 'норма/низкая'}
                </span>
            </div>
            
            <div className="score-item mobility">
                <span className="score-label">Сила Подвижности:</span>
                <span className="score-value">{scores.mobility}</span>
                <span className={`score-status ${scores.mobility >= 42 ? 'high' : 'normal'}`}>
                    {scores.mobility >= 42 ? 'высокая' : 'норма/низкая'}
                </span>
            </div>
        </div>

        <div className="result-card">
            {scores.excitation >= 42 && scores.inhibition >= 42 && scores.mobility >= 42 ? (
                <>
                    <div className="result-icon">💪</div>
                    <p><strong>Результат:</strong> Сильный, уравновешенный, подвижный тип. Вы выносливы, спокойны и быстро переключаетесь. Это хорошо для стресса, шума и многозадачности.</p>
                </>
            ) : scores.excitation < 42 && scores.inhibition < 42 && scores.mobility < 42 ? (
                <>
                    <div className="result-icon">🌱</div>
                    <p><strong>Результат:</strong> Слабый, инертный, неуравновешенный тип. Вы быстро устаёте, трудно себя контролируете, плохо переключаетесь. Вам нужна тихая и спокойная среда.</p>
                </>
            ) : (
                <>
                    <div className="result-icon">⚖️</div>
                    <p><strong>Результат:</strong> Смешанный тип. У вас есть и сильные, и слабые стороны. Учитывайте их при планировании нагрузки.</p>
                </>
            )}
        </div>
    </div>
)

    }

    return <div className="test-container">
        <div className="progress-info">
            <span className="question-badge">Вопрос {index + 1}</span>
            <span className="question-total">из {questions.length}</span>
        </div>
        <p className="question-text">{questions[index].text}</p>
        <Vopros onAnswer={handAnswer} />
    </div>

};

export default Home;
