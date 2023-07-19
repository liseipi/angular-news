import {Injectable} from '@angular/core';
import {ResponseModel} from "../../../model/http.response.model";
import {HttpService} from "../../../shared/http.service";

@Injectable({
  providedIn: null
})
export class ContentService {

  constructor(
    private httpService: HttpService
  ) {}

  async getNewsContent(id: string): Promise<ResponseModel> {
    return await this.httpService.toGet('/api/news/content', {id});
  }
}
