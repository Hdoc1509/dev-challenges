import { validateTopicCheckboxes } from "@/validation/topics.js";

export const handleTopicCheckboxChange = () => {
  const validation = validateTopicCheckboxes();

  if (!validation.success) return validation.showError();

  validation.removeError();
};
