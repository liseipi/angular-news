import {Injectable} from '@angular/core';
import {HttpService} from "../shared/http.service";
import {ResponseModel} from "../model/http.response.model";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private httpService: HttpService
  ) {

  }

  async getNews(keyword: string): Promise<object | []> {
    return await this.httpService.toGet('/api/news/search', {keyword});
  }

  async getHome(): Promise<ResponseModel> {
    return await this.httpService.toGet('/api/news/home');
  }

  async getHotSearch(): Promise<ResponseModel> {
    return await this.httpService.toGet('/api/news/hotSearch');
  }
}
