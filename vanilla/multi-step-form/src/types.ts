type ValidationResultSuccess = { success: true; removeError: () => void };
type ValidationResultError = { success: false; showError: () => void };

export type ValidationResult = ValidationResultSuccess | ValidationResultError;
