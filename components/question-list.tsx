import { QuestionCard } from "@/components/question-card";

type QuestionListProps = {
  jobTitle: string;
  questions: string[];
};

export function QuestionList({ jobTitle, questions }: QuestionListProps) {
  return (
    <div className="w-full mt-10 sm:mt-12 space-y-5">
      <h2 className="text-xl sm:text-2xl font-medium px-1 animate-enter tracking-tight">
        Questions for <span className="font-semibold">{jobTitle}</span>
      </h2>
      <div className="flex flex-col gap-4">
        {questions.map((question, index) => (
          <QuestionCard
            key={`${index}-${question}`}
            index={index + 1}
            question={question}
            animationDelayMs={150 + index * 50}
          />
        ))}
      </div>
    </div>
  );
}