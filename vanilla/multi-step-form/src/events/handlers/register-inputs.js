import { validateNameInput } from "@/validation/register/name.js";

export const handleNameInput = () => {
  const validation = validateNameInput();

  if (!validation.success) return validation.showError();

  validation.removeError();
};
