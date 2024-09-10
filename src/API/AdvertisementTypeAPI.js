import API from "./API";

class AdvertisementTypeAPI extends API {
  static endpoint = "AdvertisementType";

  static async getAdvertisementTypes() {
    return super.get(this.endpoint);
  }
}

export default AdvertisementTypeAPI;
