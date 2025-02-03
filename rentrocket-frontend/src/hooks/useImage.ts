const useImage = (filename: string) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    return `${backendUrl}/${filename}`;
  };
  
  export default useImage;