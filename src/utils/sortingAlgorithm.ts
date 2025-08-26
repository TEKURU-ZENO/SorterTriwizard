import { QuizQuestion } from "@/data/quizQuestions";

interface Answer {
  house: "gryffindor" | "slytherin" | "ravenclaw" | "hufflepuff";
  traits: {
    courage?: number;
    ambition?: number;
    intelligence?: number;
    loyalty?: number;
    creativity?: number;
    leadership?: number;
  };
}

interface UserAnswers {
  questionId: number;
  answer: Answer;
  question: QuizQuestion;
}

interface HouseScores {
  gryffindor: number;
  slytherin: number;
  ravenclaw: number;
  hufflepuff: number;
}

interface TraitScores {
  courage: number;
  ambition: number;
  intelligence: number;
  loyalty: number;
  creativity: number;
  leadership: number;
}

export interface SortingResult {
  primaryHouse: string;
  housePercentages: {
    house: string;
    percentage: number;
    isTop: boolean;
    difference: number;
  }[];
  traitScores: {
    trait: string;
    score: number;
    description: string;
    color: string;
  }[];
  isBorderline: boolean;
  personalityType: string;
}

const traitDescriptions = {
  courage: "Willingness to face danger and stand up for what's right",
  ambition: "Drive to achieve goals and pursue greatness",
  intelligence: "Analytical thinking and thirst for knowledge",
  loyalty: "Faithfulness to friends and unwavering dedication",
  creativity: "Innovative thinking and artistic expression",
  leadership: "Ability to inspire and guide others"
};

const traitColors = {
  courage: "#dc2626",     // Red
  ambition: "#16a34a",    // Green  
  intelligence: "#2563eb", // Blue
  loyalty: "#f59e0b",     // Yellow
  creativity: "#7c3aed",  // Purple
  leadership: "#ea580c"   // Orange
};

export const calculateSortingResult = (userAnswers: UserAnswers[]): SortingResult => {
  const houseScores: HouseScores = {
    gryffindor: 0,
    slytherin: 0,
    ravenclaw: 0,
    hufflepuff: 0
  };

  const traitScores: TraitScores = {
    courage: 0,
    ambition: 0,
    intelligence: 0,
    loyalty: 0,
    creativity: 0,
    leadership: 0
  };

  let totalWeight = 0;

  // Calculate weighted scores
  userAnswers.forEach(({ answer, question }) => {
    const weight = question.weight || 1.0;
    totalWeight += weight;
    
    // House scoring
    houseScores[answer.house] += weight;
    
    // Trait scoring with weights
    Object.entries(answer.traits).forEach(([trait, value]) => {
      if (value && trait in traitScores) {
        traitScores[trait as keyof TraitScores] += (value * weight) / 10; // Normalize to 0-1 range
      }
    });
  });

  // Convert to percentages
  const housePercentages = Object.entries(houseScores).map(([house, score]) => ({
    house,
    percentage: (score / totalWeight) * 100,
    isTop: false,
    difference: 0
  }));

  // Sort and mark top house
  housePercentages.sort((a, b) => b.percentage - a.percentage);
  housePercentages[0].isTop = true;

  // Calculate differences
  const topScore = housePercentages[0].percentage;
  housePercentages.forEach(house => {
    house.difference = topScore - house.percentage;
  });

  // Determine if borderline (within 15% of top score)
  const isBorderline = housePercentages[1].percentage > topScore - 15;

  // Convert trait scores to percentages and add metadata
  const maxTraitScore = Math.max(...Object.values(traitScores));
  const traitResults = Object.entries(traitScores).map(([trait, score]) => ({
    trait: trait.charAt(0).toUpperCase() + trait.slice(1),
    score: maxTraitScore > 0 ? (score / maxTraitScore) * 100 : 0,
    description: traitDescriptions[trait as keyof typeof traitDescriptions],
    color: traitColors[trait as keyof typeof traitColors]
  }));

  // Sort traits by score
  traitResults.sort((a, b) => b.score - a.score);

  // Determine personality type
  let personalityType = "Balanced Wizard";
  if (isBorderline) {
    personalityType = `${housePercentages[0].house}-${housePercentages[1].house} Hybrid`;
  } else if (topScore > 60) {
    personalityType = `Pure ${housePercentages[0].house}`;
  }

  return {
    primaryHouse: housePercentages[0].house,
    housePercentages,
    traitScores: traitResults,
    isBorderline,
    personalityType
  };
};