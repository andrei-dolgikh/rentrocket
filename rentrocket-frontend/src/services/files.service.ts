import { axiosWithAuth } from '@/api/interceptors';

class FileService {
  private UPLOAD_RESOURCE_AVATAR_URL = '/flats/image';

  async uploadFlatAvatar(data: FormData) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
  
    const response = await axiosWithAuth.post(this.UPLOAD_RESOURCE_AVATAR_URL, data, config);
    return response;
  }
}

export { FileService };