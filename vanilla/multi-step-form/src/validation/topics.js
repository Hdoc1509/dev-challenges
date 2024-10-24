import { showTopicsError, removeTopicsError } from "@/errors";
import { $topicCheckboxes } from "@/form";

/** @typedef {import("@/types").ValidationResult} ValidationResult */

/** @returns {ValidationResult} */
export const validateTopicCheckboxes = () => {
  const selectedTopics = $topicCheckboxes
    .filter(($checkbox) => $checkbox.checked)
    .map(($checkbox) => $checkbox.value);

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
