export interface IChatMessage {
  id: string;
  message: string;
  files: string[];
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatarPath?: string;
  };
  flatId: string;
}

export interface IChatMessageCreateRequest {
  message: string;
  files?: string[];
  flatId: string;
}