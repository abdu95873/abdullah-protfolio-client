import Swal from "sweetalert2";

export const showSaveError = (title, error) => {
  Swal.fire({
    icon: "error",
    title,
    text: error?.message || "Something went wrong.",
  });
};

export const showSaveSuccess = (title) => {
  Swal.fire({
    icon: "info",
    title,
    text: "Preview updated. Edit src/data/defaultPortfolio.js to publish.",
    timer: 2500,
    showConfirmButton: false,
  });
};
