import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';

export function Quiz() {
	const {courseId} = useParams();
	const [questions, setQuestions] = useState([]);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const userId = localStorage.getItem('_id');

	async function getQuizData(){
		const responseQuestions = await axios.get(`http://localhost:3001/quiz/${courseId}`);
        setQuestions(responseQuestions.data[0].quiz);
	}

	useEffect( () => {
		console.log(questions)
        getQuizData();
    }, [])

	const handleAnswerOptionClick = (isCorrect) => {
		let updatedScore = score;
		if (isCorrect) {
			updatedScore++;
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
			if(updatedScore / questions.length >= 0.7){
				axios.post('http://localhost:3001/acc/conclude-course',{courseId, userId});
			}
		}
	};

	if (questions.length == 0) {
		return <div></div>
	}

	function quizMessage(finalScore) {
		if (finalScore/questions.length >= 0.7){
			return "Congratulations!!! You concluded the course."

		}
		return "Try again."
	}

	return (
		<div className='app'>
			{showScore ? (
				<div>
					<div className='score-section'>
						You scored {score} out of {questions.length}
					</div>
					<div>
						{quizMessage(score)}
					</div>
				</div>

			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].question}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answers.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answer}</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}