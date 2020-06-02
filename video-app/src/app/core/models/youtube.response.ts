export interface YouTubeResponse {
  items: YouTubeItem[];
}

export interface YouTubeDefault {
  url: string;
}

export interface YouTubeItem {
  id: string;
  snippet: YouTubeSnippet;
  statistics: YouTubeStatistics;
}

export interface YouTubeThumbnails {
  default: YouTubeDefault;
}

export interface YouTubeSnippet {
  title: string;
  publishedAt: Date;
  thumbnails: YouTubeThumbnails;
}

export interface YouTubeStatistics {
  viewCount: number;
  likeCount: number;
}
