class APIResponse {
  constructor(
    data = null,
    isSuccess = false,
    errorMessage = "An unexpected error occurred."
  ) {
    this.IsSuccess = isSuccess;
    this.Data = data;
    this.ErrorMessage = errorMessage;
  }
}
export default APIResponse;
