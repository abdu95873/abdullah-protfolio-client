import Swal from "sweetalert2";

const getApiErrorMessage = (error) => {
  const status = error?.response?.status;
  const message = error?.response?.data?.message || error?.message;

  if (status === 401) {
    return "Session expired. Log in again and retry.";
  }
  if (status === 403) {
    return message || "Permission denied. Use your admin email to save.";
  }
  if (status === 500) {
    return message || "Server error. Check that the API and MongoDB are running.";
  }
  if (error?.code === "ERR_NETWORK") {
    return "Cannot reach the API. Start the backend on port 5000.";
  }

  return message || "Something went wrong.";
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
    text: "Changes saved to MongoDB.",
    timer: 2500,
    showConfirmButton: false,
  });
};
