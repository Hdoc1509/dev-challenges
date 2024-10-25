import { showAlert } from "@/alert";
import { $restartButton, $submitRegisterButton } from "@/buttons";

export const handleSubmitRegister = () => {
  $submitRegisterButton.disabled = true;
  $submitRegisterButton.classList.add("hidden");
  $restartButton.disabled = false;
  $restartButton.classList.remove("hidden");
  showAlert({ color: "success", text: "✅ Success" });
};
