import Swal from "sweetalert2";

const getApiErrorMessage = (error) => {
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return "Something went wrong. Please try again.";
};

export const showSaveError = (title, error) => {
  Swal.fire({
    icon: "error",
    title,
    text: getApiErrorMessage(error),
  });
};

export const showSaveSuccess = (title) => {
  Swal.fire({
    icon: "success",
    title,
    text: "Changes saved to MongoDB and are live on your site.",
    timer: 2000,
    showConfirmButton: false,
  });
};
