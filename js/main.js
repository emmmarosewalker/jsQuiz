var main = function () {

    // Questions Variable
    var allQuestions = [
                        {   // question 1
                            question: "Which duo created Rick and Morty?",
                            choices: ["Justin Roiland and Seth MacFarlane", "Mike Barker and Matt Weitzman", "Dan Harmon and Justin Roiland", "Seth MacFarlane and Dan Harmon"],
                            correctAnswer: 2,
                            userAnswer: null
                        },
                        {   // question 2
                            question: "What is Rick's last name?",
                            choices: ["Jones", "Johnson", " Smith", "Sanchez"],
                            correctAnswer: 3,
                            userAnswer: null
                        },
                        {   // question 3
                            question: "What is the name of Rick's half-avian, half-human best friend?",
                            choices: ["Mr Birdman", "Bird Person", "Hawkie", "Falconius"],
                            correctAnswer: 1,
                            userAnswer: null
                        },
                        {   // question 4
                            question: "In the episode Raising Gazorpazorp, what does Morty name his “child”?",
                            choices: ["Morty Jr.", "Tiny Morty", "Sonny", "Kevin"],
                            correctAnswer: 0,
                            userAnswer: null
                        }
    ];

    // Question counter
    var counter = 0;

    // Score
    var score = 0;

    // Setup answer choices for first question
    for (var i = 0; i < allQuestions[0].choices.length ; i++){
        document.getElementById("answer"+i).innerHTML = allQuestions[0].choices[i];
    }
    // Set title for first question
    document.getElementById("questionTitle").innerHTML = allQuestions[0].question;

    // ----------------------------------------------------------- Question set up function
    function questionSetup(){
        // Get number of question choices
        var choicesLength = allQuestions[counter].choices.length;
        // Set answer options for current question
        for (var i = 0; i < choicesLength; i++){
            document.getElementById("answer"+i).innerHTML = allQuestions[counter].choices[i];
            // Uncheck options from last question
            document.getElementsByName("radioOptions")[i].checked = false;
        }
        // Set question heading for current question 
        document.getElementById("questionTitle").innerHTML = allQuestions[counter].question;
        // Set question number for current question
        document.getElementById("questionNo").innerHTML = counter + 1;
    }

    // ----------------------------------------------------------- Check score function
    function checkScore(){
        // Loop through the radio buttons
        for (var i = 0; i < 4; i++){
            // See which radio button is checked
            if (document.getElementsByName("radioOptions")[i].checked){
                // See if checked button's value equals the correct answer's value.
                if (document.getElementsByName("radioOptions")[i].value == allQuestions[counter].correctAnswer){
                    score ++;
                    break;
                }
            }
        }
        // Display Score
        document.getElementById('score').innerHTML = "Score: " + score;
    }

    // ----------------------------------------------------------- Show results page function
    function showResultPage(){
        document.getElementById("quizMain").innerHTML = "<h4>Finished!</h4>Your score is: " + score + " out of " + allQuestions.length;
    }

    // Change questions and calculate score when "next" is pressed
    document.getElementById("nextButton").addEventListener("click", function(){

        // Check that a radio button has been selected
        var questionAttempted = false;
        var invalidFeedback = document.getElementById("inval-feedback");
        var nextButtonLink = document.getElementById("nextButtonLink");
        
        for (var i = 0; i < 4; i++){
            if (document.getElementsByName("radioOptions")[i].checked){
                questionAttempted = true;
            }
        }
        if (questionAttempted){
            // Remove the invalid feedback
            invalidFeedback.style.visibility = 'hidden';
            nextButtonLink.style.border = '1px solid #ff93f6';
            
            // check score and question number and setup appropriate page
            checkScore();
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

}
document.addEventListener("DOMContentLoaded", function(){
    main();
})