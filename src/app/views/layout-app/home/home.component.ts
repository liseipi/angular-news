import {Component} from '@angular/core';
import {initTE, Carousel} from "tw-elements";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {NewsService} from "../../../service/news.service";
import {ResponseModel} from "../../../model/http.response.model";
import {RouterLink} from "@angular/router";
import {NewsModel} from "../../../model/news.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink]
})
export class HomeComponent {
  pageData: Array<NewsModel> = []
  hotSearchData: Array<NewsModel> = []

  constructor(
    private newsService: NewsService
  ) {
  }

  ngOnInit() {
    initTE({Carousel});

    // this.getNews();
    this.getHome();
    this.getHotSearch();
  }

  async getNews() {
    try {
      const result = await this.newsService.getNews('开始');
      console.log(result);
    } catch (e) {
      console.log(e)
    }
  }

  async getHome() {
    try {
      const result: ResponseModel = await this.newsService.getHome();
      if (result.error == 0) {
        this.pageData = result?.data || [];
        // console.log(this.pageData)
      }
    } catch (e) {
      console.log(e)
    }
  }

  async getHotSearch() {
    try {
      const result: ResponseModel = await this.newsService.getHotSearch();
      if (result.error == 0) {
        this.hotSearchData = result?.data || [];
        // console.log(this.hotSearchData)
      }
    } catch (e) {
      console.log(e)
    }
  }


}
