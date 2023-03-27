import React from "react"

export const App = ({questions, answers, handleModifyAnswerVotes}) => {
  return (
    <div>
        <h1>Q&A Tool</h1>
        {questions.map(({questionId, content}) => (
            <div key={questionId}>
                <h3>{content}</h3>
                <div>
                    {answers.filter(answers => answers.questionId === questionId).map(({answerId, content, upvotes}) => (
                        <div key={answerId}>
                            <span>{content} - {upvotes}</span>
                            <button onClick={() => handleModifyAnswerVotes(answerId, 1)}>+</button>
                            <button onClick={() => handleModifyAnswerVotes(answerId, -1)}>-</button>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
  )
}