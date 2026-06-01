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
    icon: "success",
    title,
    timer: 1500,
    showConfirmButton: false,
  });
};
