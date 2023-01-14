// Creating Question Object

function Question(questionText, questionNo){
    this.questionNo=questionNo;
    this.questionText=questionText;
}

let question1 = new Question("JavaScript supports",1);
let question2 = new Question("Which language is used for styling web pages?",2);
let question3 = new Question("Which is not a JavaScript Framework?",3);
let question4 = new Question("Which is used for Connect to Database?",4);
let question5 = new Question("JavaScript is a",5);

// Creating Answer Object


function Answer(answerText){
    this.answerText= answerText;
}

let answer1_1 = new Answer("Function");
let answer1_2 = new Answer("XHTML");
let answer1_3 = new Answer("CSS");
let answer1_4 = new Answer("HTML");

let answer2_1 = new Answer("HTML");
let answer2_2 = new Answer("JQuery");
let answer2_3 = new Answer("CSS");
let answer2_4 = new Answer("XML");

let answer3_1 = new Answer("Python Script");
let answer3_2 = new Answer("JQuery");
let answer3_3 = new Answer("DJango");
let answer3_4 = new Answer("NodeJS");

let answer4_1 = new Answer("PHP");
let answer4_2 = new Answer("HTML");
let answer4_3 = new Answer("JS");
let answer4_4 = new Answer("All");

let answer5_1 = new Answer("Languange");
let answer5_2 = new Answer("Programming Language");
let answer5_3 = new Answer("Development");
let answer5_4 = new Answer("All");

// Creating Question and Answer Combination Object


function QuestionAnswer(questionObj, answerOptionsObj, correctAnswer){
    this.questionObj= questionObj;
    this.answerOptionsObj = answerOptionsObj;
    this.correctAnswer = correctAnswer;

    this.isItACorrectAnswer = function(userSelectedAnswer){
        
        if (userSelectedAnswer === correctAnswer.answerText)
            {
                console.log(userSelectedAnswer, ": correct answer");
                return true;
            }
        else
            {
                console.log(userSelectedAnswer, ": Incorrect answer");
                return false;
            }
            
    }
}

let firstQuestion   = new QuestionAnswer(question1, [answer1_1,answer1_2,answer1_3,answer1_4 ],answer1_1 );
let secondQuestion  = new QuestionAnswer(question2, [answer2_1,answer2_2,answer2_3,answer2_4 ],answer2_3 );
let thirdQuestion   = new QuestionAnswer(question3, [answer3_1,answer3_2,answer3_3,answer3_4 ],answer3_3 );
let fourthQuestion  = new QuestionAnswer(question4, [answer4_1,answer4_2,answer4_3,answer4_4 ],answer4_1 );
let fifthQuestion   = new QuestionAnswer(question5, [answer5_1,answer5_2,answer5_3,answer5_4 ],answer5_2 );


// Creating Quiz Application


function QuizApplication(allQuestions){
    this.allQuestions = allQuestions;
    let currentPage = 0;    //Count of Current Page/Current Question
    let score = 0;          //Count of correct answers

    this.initAndDisplay= function(){
        this.displayQuizPage();
        this.buttonListener();
    }

    this.nextPage = function(){
        currentPage ++;
        if(currentPage>= this.allQuestions.length)  //checking if current page is exceeding the total Questions
        {
            this.resultPage();
        }
        else
        {
        this.initAndDisplay();
        this.buttonListener();
        }

    }


    //Creating a result page

    this.resultPage = function(){
        const divElement = document.getElementById("quiz");

        const finalResultElement = 
        `
            <h1>
                Result
            </h1>

            <h3 id="score">
            Your Scores: ${score}. And mark percentage is: ${(score/allQuestions.length)*100}%
            </h3>
        `;

        divElement.innerHTML= finalResultElement;
        
    }

    this.displayQuizPage = function(){
        this.displayQASection();
        this.displayQuestionProgressSection();
    }

    this.displayQASection = function(){
        
        const text = allQuestions[currentPage].questionObj.questionText;
        const element = document.getElementById("question");
        element.innerHTML = text;

        const ans = allQuestions[currentPage].answerOptionsObj;
        for (let index = 0; index < ans.length; index++) {
            let elementName = "choice" + index;
            let htmlElement = document.getElementById(elementName);
            htmlElement.innerHTML = ans[index].answerText;
        }
          
    }

    this.displayQuestionProgressSection = function(){
        let questionNo = allQuestions[currentPage].questionObj.questionNo;
        let progressElement = document.getElementById("progress");
        let progressTracker = `Question ${questionNo} of ${allQuestions.length}`;
        progressElement.innerHTML = progressTracker;
    }

    this.buttonListener = function(){
        const ans = allQuestions[currentPage].answerOptionsObj;
        const currentQuizApp = this;

        for (let index = 0; index < ans.length; index++) {
            let buttonElementName = `btn${index}`;
            let buttonElement = document.getElementById(buttonElementName);
            buttonElement.onclick = function(event){
                const currentTarget = event.currentTarget;
                const userSelectedAns = currentTarget.children[0].innerHTML;
                let conclusion = allQuestions[currentPage].isItACorrectAnswer(userSelectedAns);
                if(conclusion){
                    score ++;
                }
                currentQuizApp.nextPage();
            }
            
        }
    }

    
}


// Creating and object of Quiz Application
const quizApp = new QuizApplication([firstQuestion,secondQuestion,thirdQuestion,fourthQuestion,fifthQuestion]);

// Calling the initializing method
quizApp.initAndDisplay();