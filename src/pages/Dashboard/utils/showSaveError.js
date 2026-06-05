import Swal from "sweetalert2";
import { getFirestoreErrorMessage } from "../../../utils/firestoreSanitize";

export const showSaveError = (title, error) => {
  Swal.fire({
    icon: "error",
    title,
    text: getFirestoreErrorMessage(error),
  });
};

export const showSaveSuccess = (title) => {
  Swal.fire({
    icon: "info",
    title,
    text: "Preview updated in this session. Edit src/data/defaultPortfolio.js and redeploy to publish.",
    timer: 2800,
    showConfirmButton: false,
  });
};
