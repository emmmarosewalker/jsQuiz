var main = function () {

    // Questions Variable
    var allQuestions = [
        {   // question 1
            question: "Which duo created Rick and Morty?",
            choices: ["Justin Roiland and Seth MacFarlane", "Mike Barker and Matt Weitzman", "Dan Harmon and Justin Roiland", "Seth MacFarlane and Dan Harmon"],
            correctAnswer: 2,
            userAnswer: -1
        },
        {   // question 2
            question: "What is Rick's last name?",
            choices: ["Jones", "Johnson", " Smith", "Sanchez"],
            correctAnswer: 3,
            userAnswer: -1
        },
        {   // question 3
            question: "What is the name of Rick's half-avian, half-human best friend?",
            choices: ["Mr Birdman", "Bird Person", "Hawkie", "Falconius"],
            correctAnswer: 1,
            userAnswer: -1
        },
        {   // question 4
            question: "In the episode Raising Gazorpazorp, what does Morty name his “child”?",
            choices: ["Morty Jr.", "Tiny Morty", "Sonny", "Kevin"],
            correctAnswer: 0,
            userAnswer: -1
        }
    ];

    // Question counter
    var counter = 0;
    
    var radioOptions = document.getElementsByName("radioOptions");
    
    var backButtonLink = document.getElementById("backButtonLink");
    
    var questionTitle = document.getElementById("questionTitle");
    
    var questionNo = document.getElementById("questionNo");
    
    var nextButton = document.getElementById("nextButton");
    
    
    // Setup answer choices for first question
    for (var i = 0; i < allQuestions[0].choices.length ; i++){
        document.getElementById("answer"+i).innerHTML = allQuestions[0].choices[i];
        // See if answer is recorded for this question
        if (allQuestions[counter].userAnswer == i){
            radioOptions[i].checked = true;
        }
        else{
            radioOptions[i].checked = false;
        }
    }
    // Set title for first question
    questionTitle.innerHTML = allQuestions[0].question;

    // ----------------------------------------------------------- Question set up function
    function questionSetup(){
        // Get number of question choices
        var choicesLength = allQuestions[counter].choices.length;

        // Set answer options for current question
        for (var i = 0; i < choicesLength; i++){
            document.getElementById("answer"+i).innerHTML = allQuestions[counter].choices[i];
            // See if answer is recorded for this question
            if (allQuestions[counter].userAnswer == i){
                radioOptions[i].checked = true;
            }
            else{
                radioOptions[i].checked = false;
            }
        }
        // Set question heading for current question 
        questionTitle.innerHTML = allQuestions[counter].question;
        // Set question number for current question
        questionNo.innerHTML = counter + 1;
    }


    // ----------------------------------------------------------- Set answer function
    function setAnswer(){
        // Loop through the radio buttons
        for (var i = 0; i < 4; i++){
            // See which radio button is checked
            if (radioOptions[i].checked){
                // Record the answer
                var myAnswer = radioOptions[i].value;
                allQuestions[counter].userAnswer = myAnswer;
            }
        }
    }


    // ----------------------------------------------------------- Show results page function
    function showResultPage(){
        var score = calculateScore();
        var quizMain = document.getElementById("quizMain");
        var backBtn = document.getElementById("backButton")
        quizMain.innerHTML = "<h4>Finished!</h4>Your score is: " + score + " out of " + allQuestions.length;
        quizMain.style.minHeight = "300px";
        backBtn.style.display = 'none';
    }
    
    function calculateScore(){
        var numCorrect = 0;
        for (var i = 0; i < allQuestions.length; i++){
            if (allQuestions[i].userAnswer == allQuestions[i].correctAnswer){
                numCorrect ++;
            }
        }
        return numCorrect;
    }

    // Change questions and calculate score when "next" is pressed
    nextButton.addEventListener("click", function(){

        // Check that a radio button has been selected
        var questionAttempted = false;
        var invalidFeedback = document.getElementById("inval-feedback");
        var nextButtonLink = document.getElementById("nextButtonLink");

        for (var i = 0; i < 4; i++){
            if (radioOptions[i].checked){
                questionAttempted = true;
            }
        }
        if (questionAttempted){
            // Remove the invalid feedback
            invalidFeedback.style.visibility = 'hidden';
            nextButtonLink.style.border = '1px solid #ff93f6';

            // check score and question number and setup appropriate page
            setAnswer();
            counter ++;
            if (counter < allQuestions.length){
                questionSetup();
            }
            else {
                showResultPage();
            }
        }
        else {
            invalidFeedback.style.visibility = 'visible';
            nextButtonLink.style.border = '1px solid red';
        }
    });
    
    backButtonLink.addEventListener("click", function(){
        if (counter >= 0){
            counter --;
            score --;
            questionSetup();
        }
    });

}
document.addEventListener("DOMContentLoaded", function(){
    main();
});