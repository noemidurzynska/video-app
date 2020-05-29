import { YouTubeSnippet } from './youtubeSnippet';
import { YouTubeStatistics } from './youtubeStatistics';

export class YouTubeItem {
  public id: string;
  public snippet: YouTubeSnippet = new YouTubeSnippet();
  public statistics: YouTubeStatistics = new YouTubeStatistics();
}
