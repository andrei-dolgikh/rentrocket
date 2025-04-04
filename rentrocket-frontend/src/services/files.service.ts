import { axiosWithAuth } from '@/api/interceptors';

export class FileService {
  private URL = 'http://localhost:4200/api';

  uploadFlatAvatar(formData: FormData) {
    return axiosWithAuth.post(`${this.URL}/flats/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  uploadFlatImage(formData: FormData) {
    return axiosWithAuth.post(`${this.URL}/flats/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  addImagesToFlat(flatId: string, imageUrls: string[]) {
    return axiosWithAuth.post(`${this.URL}/flats/add-images/${flatId}`, imageUrls);
  }
}