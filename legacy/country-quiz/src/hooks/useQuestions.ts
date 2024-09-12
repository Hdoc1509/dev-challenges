import { useCallback, useEffect } from "react";
import { useQuestionStore } from "../store/questions";
import { getQuestions } from "@/services/questions";
import { STATUS } from "@/constants";

const QUESTIONS = 10;
let didInit = false;

export function useQuestions() {
  const questions = useQuestionStore((s) => s.questions);
  const status = useQuestionStore((s) => s.status);
  const error = useQuestionStore((s) => s.error);
  const currentQuestionIndex = useQuestionStore((s) => s.currentQuestionIndex);
  const setStatus = useQuestionStore((s) => s.setStatus);
  const setError = useQuestionStore((s) => s.setError);
  const setQuestions = useQuestionStore((s) => s.setQuestions);
  const reset = useQuestionStore((s) => s.reset);
  const goNextQuestion = useQuestionStore((s) => s.goNextQuestion);
  const selectAnswer = useQuestionStore((s) => s.selectAnswer);

  const loadQuestions = useCallback(async () => {
    setStatus(STATUS.LOADING);

    const [error, questions] = await getQuestions(QUESTIONS);

    if (error) {
      setError(error);
      setStatus(STATUS.ERROR);
      return;
    }

    setQuestions(questions);
    setStatus(STATUS.SUCCESS);
  }, [setError, setQuestions, setStatus]);

  const tryAgain = useCallback(() => {
    reset();
    loadQuestions();
  }, [loadQuestions, reset]);

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      void loadQuestions();
    }
  }, [loadQuestions]);

  return {
    questions,
    error,
    currentQuestionIndex,
    status,
    goNextQuestion,
    selectAnswer,
    setStatus,
    tryAgain,
  };
}
