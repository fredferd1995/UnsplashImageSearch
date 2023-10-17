export interface UnsplashImage {
    id: string;
    description: string | null;
    urls: {
      regular: string;
    };
    user: {
      username: string;
      name: string;
    };
  }