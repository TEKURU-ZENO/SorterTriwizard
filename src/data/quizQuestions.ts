export interface QuizQuestion {
  id: number;
  question: string;
  image?: string;
  category: "values" | "personality" | "situations" | "preferences";
  weight: number; // For multi-dimensional scoring
  answers: {
    text: string;
    house: "gryffindor" | "slytherin" | "ravenclaw" | "hufflepuff";
    traits: {
      courage?: number;
      ambition?: number;
      intelligence?: number;
      loyalty?: number;
      creativity?: number;
      leadership?: number;
    };
    image?: string;
  }[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "You're walking through a dark forest and come to a fork in the path. Which way do you choose?",
    image: "/src/assets/quiz-forest.jpg",
    category: "situations",
    weight: 1.2,
    answers: [
      {
        text: "The well-lit path that leads toward what sounds like laughter",
        house: "hufflepuff",
        traits: { loyalty: 8, courage: 3, intelligence: 2, ambition: 1 }
      },
      {
        text: "The narrow, dark path that you can hear strange, haunting music coming from",
        house: "slytherin",
        traits: { ambition: 9, intelligence: 6, courage: 4, loyalty: 2 }
      },
      {
        text: "The wide, bright path that leads toward what sounds like fast-running water",
        house: "ravenclaw",
        traits: { intelligence: 9, creativity: 7, ambition: 3, courage: 4 }
      },
      {
        text: "The path through the trees that you can see light ahead, but can't identify the source",
        house: "gryffindor",
        traits: { courage: 10, ambition: 5, intelligence: 4, loyalty: 6 }
      }
    ]
  },
  {
    id: 2,
    question: "What magical creature would you most like to study?",
    image: "/src/assets/quiz-dragon.jpg",
    category: "preferences",
    weight: 1.0,
    answers: [
      {
        text: "Dragons - powerful and fierce",
        house: "gryffindor",
        traits: { courage: 9, ambition: 6, leadership: 7, loyalty: 4 }
      },
      {
        text: "Unicorns - pure and gentle",
        house: "hufflepuff",
        traits: { loyalty: 10, courage: 5, intelligence: 6, ambition: 2 }
      },
      {
        text: "Phoenix - mysterious and wise",
        house: "ravenclaw",
        traits: { intelligence: 10, creativity: 8, ambition: 4, courage: 6 }
      },
      {
        text: "Basilisk - dangerous and cunning",
        house: "slytherin",
        traits: { ambition: 9, intelligence: 7, leadership: 8, courage: 6 }
      }
    ]
  },
  {
    id: 3,
    question: "Which magical artifact calls to you most?",
    image: "/src/assets/quiz-artifacts.jpg",
    category: "values",
    weight: 1.1,
    answers: [
      {
        text: "A glowing sword that has never failed in battle",
        house: "gryffindor",
        traits: { courage: 10, leadership: 7, ambition: 5, loyalty: 6 }
      },
      {
        text: "An ancient book containing lost knowledge",
        house: "ravenclaw",
        traits: { intelligence: 10, creativity: 8, ambition: 4, courage: 3 }
      },
      {
        text: "A locket that can store your happiest memories",
        house: "hufflepuff",
        traits: { loyalty: 9, courage: 4, intelligence: 5, ambition: 2 }
      },
      {
        text: "A ring that makes you invisible to your enemies",
        house: "slytherin",
        traits: { ambition: 9, intelligence: 6, leadership: 8, courage: 5 }
      }
    ]
  },
  {
    id: 4,
    question: "You're in a magical duel. What's your strategy?",
    image: "/src/assets/quiz-duel.jpg",
    category: "situations",
    weight: 1.3,
    answers: [
      {
        text: "Attack head-on with powerful spells",
        house: "gryffindor",
        traits: { courage: 10, leadership: 6, ambition: 4, loyalty: 5 }
      },
      {
        text: "Use clever tactics and misdirection",
        house: "slytherin",
        traits: { intelligence: 8, ambition: 9, leadership: 7, courage: 5 }
      },
      {
        text: "Rely on your extensive knowledge of defensive magic",
        house: "ravenclaw",
        traits: { intelligence: 10, creativity: 6, courage: 4, loyalty: 3 }
      },
      {
        text: "Try to find a peaceful resolution first",
        house: "hufflepuff",
        traits: { loyalty: 10, courage: 3, intelligence: 5, ambition: 1 }
      }
    ]
  },
  {
    id: 5,
    question: "What would you see in the Mirror of Erised?",
    image: "/src/assets/quiz-mirror.jpg",
    category: "personality",
    weight: 1.4,
    answers: [
      {
        text: "Yourself as the greatest wizard of all time",
        house: "slytherin",
        traits: { ambition: 10, leadership: 9, intelligence: 6, courage: 5 }
      },
      {
        text: "Yourself surrounded by loved ones, all happy and safe",
        house: "hufflepuff",
        traits: { loyalty: 10, courage: 4, intelligence: 3, ambition: 1 }
      },
      {
        text: "Yourself having solved the greatest mysteries of magic",
        house: "ravenclaw",
        traits: { intelligence: 10, creativity: 9, ambition: 5, courage: 3 }
      },
      {
        text: "Yourself as a brave hero, celebrated for great deeds",
        house: "gryffindor",
        traits: { courage: 10, leadership: 8, ambition: 6, loyalty: 7 }
      }
    ]
  },
  {
    id: 6,
    question: "Which magical subject interests you most?",
    image: "/src/assets/quiz-classroom.jpg",
    category: "preferences",
    weight: 1.0,
    answers: [
      {
        text: "Defense Against the Dark Arts",
        house: "gryffindor",
        traits: { courage: 9, leadership: 6, ambition: 5, loyalty: 4 }
      },
      {
        text: "Ancient Runes",
        house: "ravenclaw",
        traits: { intelligence: 10, creativity: 7, ambition: 3, courage: 2 }
      },
      {
        text: "Herbology",
        house: "hufflepuff",
        traits: { loyalty: 8, courage: 3, intelligence: 6, ambition: 2 }
      },
      {
        text: "Potions",
        house: "slytherin",
        traits: { intelligence: 8, ambition: 7, leadership: 5, courage: 4 }
      }
    ]
  },
  {
    id: 7,
    question: "What's your greatest fear?",
    image: "/src/assets/quiz-fear.png",
    category: "personality",
    weight: 1.2,
    answers: [
      {
        text: "Being ordinary and forgotten",
        house: "slytherin",
        traits: { ambition: 10, leadership: 8, intelligence: 5, courage: 6 }
      },
      {
        text: "Letting down the people you care about",
        house: "hufflepuff",
        traits: { loyalty: 10, courage: 5, intelligence: 4, ambition: 2 }
      },
      {
        text: "Ignorance and closed-mindedness",
        house: "ravenclaw",
        traits: { intelligence: 10, creativity: 8, ambition: 4, courage: 3 }
      },
      {
        text: "Being seen as weak or cowardly",
        house: "gryffindor",
        traits: { courage: 10, leadership: 7, ambition: 6, loyalty: 5 }
      }
    ]
  },
  {
    id: 8,
    question: "If you could possess one magical ability, what would it be?",
    image: "/src/assets/quiz-values.png",
    category: "values",
    weight: 1.1,
    answers: [
      {
        text: "The ability to read minds",
        house: "slytherin",
        traits: { intelligence: 8, ambition: 9, leadership: 7, courage: 4 }
      },
      {
        text: "The ability to heal any wound or illness",
        house: "hufflepuff",
        traits: { loyalty: 10, courage: 5, intelligence: 6, ambition: 2 }
      },
      {
        text: "The ability to see into the future",
        house: "ravenclaw",
        traits: { intelligence: 10, creativity: 9, ambition: 4, courage: 3 }
      },
      {
        text: "The ability to become invisible at will",
        house: "gryffindor",
        traits: { courage: 8, intelligence: 6, ambition: 5, loyalty: 4 }
      }
    ]
  }
];