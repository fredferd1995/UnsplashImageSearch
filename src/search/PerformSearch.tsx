import { UnsplashImage } from "../interfaces/Unsplash";
import axios from 'axios';
import {BASE_URL} from "../constants/Constants";
import { UNSPLASH_ACCESS_KEY } from "../api/key";
import { getErrorMessage } from "../errors/Error";

export async function searchImages(query: string, page: number = 1, perPage: number = 10) {
    try {
      const response = await axios.get(`${BASE_URL}/search/photos`, {
        params: {
          query,
          page,
          per_page: perPage,
        },
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      });
  
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Unsplash API request failed with status code ${response.status}`);
      }
    } catch (error) {
      throw new Error(`Error making Unsplash API request: ${getErrorMessage(error)}`);
    }
  }