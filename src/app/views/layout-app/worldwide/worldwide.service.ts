import { Injectable } from '@angular/core';
import {ResponseModel} from "../../../model/http.response.model";
import {HttpService} from "../../../shared/http.service";

@Injectable({
  providedIn: null
})
export class WorldwideService {

  constructor(
    private httpService: HttpService
  ) { }

  async getHotList({page = 1, page_size = 20}): Promise<ResponseModel> {
    return await this.httpService.toGet('/api/news/hotList', {page, page_size});
  }
}
