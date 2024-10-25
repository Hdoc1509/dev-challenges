import { validateNameInput } from "@/validation/register/name.js";
import { validateEmailInput } from "@/validation/register/email.js";

export const handleNameInput = () => {
  const validation = validateNameInput();

  if (!validation.success) return validation.showError();

  validation.removeError();
};

export const handleEmailInput = () => {
  const validation = validateEmailInput();

  if (!validation.success) return validation.showError();

  validation.removeError();
};
