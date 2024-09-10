import APIResponse from "../API/APIResponse";

class API {
  static baseUrl = "https://localhost:7118/api";

  static async handleResponse(response) {
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.indexOf("application/json") !== -1) {
      const jsonResponse = await response.json();
      if (response.ok) {
        return new APIResponse(
          jsonResponse.data,
          jsonResponse.isSuccess,
          jsonResponse.errorMessage
        );
      } else {
        return new APIResponse(
          null,
          false,
          jsonResponse.errorMessage || "An error occurred."
        );
      }
    } else {
      return new APIResponse(null, false, "Response is not JSON.");
    }
  }

  static async get(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await this.handleResponse(response);
    } catch (error) {
      return new APIResponse(null, false, error.message);
    }
  }

  static async post(endpoint, data) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await this.handleResponse(response);
    } catch (error) {
      return new APIResponse(null, false, error.message);
    }
  }

  static async put(endpoint, data) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await this.handleResponse(response);
    } catch (error) {
      return new APIResponse(null, false, error.message);
    }
  }

  static async delete(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await this.handleResponse(response);
    } catch (error) {
      return new APIResponse(null, false, error.message);
    }
  }
}
export default API;
