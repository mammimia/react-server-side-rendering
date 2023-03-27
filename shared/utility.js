export function handleModifyAnswerVotes(answers, answerId, voteModifier){
    return answers.map(answer => {
        if(answer.answerId === answerId){
            return {
                ...answer,
                upvotes: answer.upvotes + voteModifier
            }
        }
        return answer;
    })
}