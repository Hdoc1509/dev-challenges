import { showTopicsError, removeTopicsError } from "@/errors";
import { $registerForm, TOPIC_CHECKBOX_NAME } from "@/form";

/** @returns {{ success: boolean }} */
export const validateTopicCheckboxes = () => {
  const selectedTopics = new FormData($registerForm).getAll(
    TOPIC_CHECKBOX_NAME,
  );

  if (selectedTopics.length === 0) {
    showTopicsError();
    return { success: false };
  }

  removeTopicsError();
  return { success: true };
};
