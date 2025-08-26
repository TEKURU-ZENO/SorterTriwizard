import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagicalButton } from "@/components/MagicalButton";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { quizQuestions, QuizQuestion } from "@/data/quizQuestions";
import { calculateSortingResult } from "@/utils/sortingAlgorithm";
import quizForest from "@/assets/quiz-forest.jpg";
import quizDragon from "@/assets/quiz-dragon.jpg";
import quizArtifacts from "@/assets/quiz-artifacts.jpg";
import quizDuel from "@/assets/quiz-duel.jpg";
import quizMirror from "@/assets/quiz-mirror.jpg";
import quizClassroom from "@/assets/quiz-classroom.jpg";
import quizPersonality from "@/assets/quiz-fear.png";
import quizValues from "@/assets/quiz-values.png";

type HouseScores = {
  gryffindor: number;
  slytherin: number;
  ravenclaw: number;
  hufflepuff: number;
};

interface UserAnswer {
  questionId: number;
  answer: {
    house: "gryffindor" | "slytherin" | "ravenclaw" | "hufflepuff";
    traits: {
      courage?: number;
      ambition?: number;
      intelligence?: number;
      loyalty?: number;
      creativity?: number;
      leadership?: number;
    };
  };
  question: QuizQuestion;
}

export const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  const handleAnswer = (answerIndex: number) => {
    const question = quizQuestions[currentQuestion];
    const selectedAnswer = question.answers[answerIndex];
    
    const newAnswer: UserAnswer = {
      questionId: question.id,
      answer: {
        house: selectedAnswer.house,
        traits: selectedAnswer.traits
      },
      question
    };

    const newAnswers = [...userAnswers, newAnswer];
    setUserAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed, calculate comprehensive results
      const sortingResult = calculateSortingResult(newAnswers);
      
      // Store comprehensive result
      sessionStorage.setItem("sortingResult", JSON.stringify(sortingResult));
      navigate("/result");
    }
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const question = quizQuestions[currentQuestion];
  
  // Map image imports to question IDs
  const getQuestionImage = (questionId: number) => {
    const imageMap: { [key: number]: string } = {
      1: quizForest,
      2: quizDragon,
      3: quizArtifacts,
      4: quizDuel,
      5: quizMirror,
      6: quizClassroom,
    };
    return imageMap[questionId];
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-magical font-bold text-primary drop-shadow-lg">
            The Sorting Hat Speaks
          </h1>
          <div className="space-y-3">
            <p className="text-muted-foreground font-body text-lg">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </p>
            <Progress value={progress} className="w-full max-w-lg mx-auto h-4 bg-muted/50" />
          </div>
        </div>

        {/* Question Card */}
        <Card className="card-magical overflow-hidden">
          {/* Question Image */}
          {getQuestionImage(question.id) && (
            <div className="relative h-64 md:h-72 overflow-hidden rounded-t-2xl -m-6 mb-6">
              <img 
                src={getQuestionImage(question.id)} 
                alt="Question illustration"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>
          )}
          
          <div className="space-y-8 p-6 -mt-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-magical font-semibold text-foreground leading-relaxed">
                {question.question}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {question.answers.map((answer, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer"
                  onClick={() => handleAnswer(index)}
                >
                  {/* Parchment scroll background */}
                  <div className="relative bg-gradient-to-br from-amber-100 via-amber-50 to-yellow-100 border-2 border-amber-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] p-6 min-h-[120px] flex flex-col justify-center">
                    {/* Decorative corners */}
                    <div className="absolute top-2 left-2 w-4 h-4 bg-amber-800 rounded-full opacity-60"></div>
                    <div className="absolute top-2 right-2 w-4 h-4 bg-amber-800 rounded-full opacity-60"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 bg-amber-800 rounded-full opacity-60"></div>
                    <div className="absolute bottom-2 right-2 w-4 h-4 bg-amber-800 rounded-full opacity-60"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 text-center space-y-3">
                      <div className="font-magical text-lg font-bold text-amber-900 drop-shadow-sm">
                        Route {String.fromCharCode(65 + index)}
                      </div>
                      <div className="font-body text-base leading-relaxed text-amber-900 px-2">
                        {answer.text}
                      </div>
                    </div>

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br from-yellow-300 to-amber-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Progress Indicator */}
        <div className="flex justify-center space-x-3">
          {quizQuestions.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-500 ${
                index <= currentQuestion 
                  ? "bg-primary shadow-[0_0_15px_hsl(var(--primary)_/_0.5)] scale-110" 
                  : "bg-muted/50 hover:bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};