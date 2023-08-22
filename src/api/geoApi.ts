import axiosClient from "./axiosClient";

export const getAllCityInVietNam = {
    get: () => {
        const url = "http://api.geonames.org/searchJSON?country=VN&featureCode=PPLA&maxRows=100&lang=vi&username=loiphan";
        return axiosClient.get(url);
    }
}