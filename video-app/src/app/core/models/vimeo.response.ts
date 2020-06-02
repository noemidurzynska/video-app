export interface VimeoResponse {
  resource_key: string;
  name: string;
  created_time: Date;
  pictures: VimeoPictures;
  metadata: VimeoMetadata;
}

export interface VimeoConnections {
  likes: VimeoLikes;
}

export interface VimeoLikes {
  total: number;
}

export interface VimeoMetadata {
  connections: VimeoConnections;
}

export interface VimeoPictures {
  sizes: VimeoSizes;
}

export interface VimeoSizes {
  link: string;
}
