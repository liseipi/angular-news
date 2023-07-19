import {Injectable} from '@angular/core';
import {HttpService} from "../../../shared/http.service";

@Injectable({
  providedIn: null
})
export class LoginService {

  constructor(
    private httpService: HttpService
  ) {}

  infoTitleTxt: string = '我们提供全球最新资讯动态'
  infoContentTxt: string = '我们是一个新闻传播平台，不发布，不创建，只做互联网媒体的传播介质，提供全球最新的资讯内容，如你喜欢，欢迎加入我们，一起学习成长。'

  async doLogin(formData: any): Promise<any> {
    return await this.httpService.toPost('/api/login', formData);
  }

  async doProfile(): Promise<any> {
    return await this.httpService.toGet('/api/access/profile');
  }

}
