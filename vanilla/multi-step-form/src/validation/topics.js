import { showTopicsError, removeTopicsError } from "@/errors";
import { $registerForm, TOPIC_CHECKBOX_NAME } from "@/form";

/** @typedef {import("@/types").ValidationResult} ValidationResult */

// TODO: simplify usage of this function
// - call showTopicsError() and removeTopicsError() directly
// - update ValidationResult type to only include `success` property

/** @returns {ValidationResult} */
export const validateTopicCheckboxes = () => {
  const selectedTopics = new FormData($registerForm).getAll(
    TOPIC_CHECKBOX_NAME,
  );

  if (selectedTopics.length === 0)
    return {
      success: false,
      showError: () => showTopicsError(),
    };

  return {
    success: true,
    removeError: () => removeTopicsError(),
  };
};
