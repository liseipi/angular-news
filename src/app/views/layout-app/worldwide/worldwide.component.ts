import {Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {NewsService} from "../../../service/news.service";
import {Carousel, initTE} from "tw-elements";
import {ResponseModel} from "../../../model/http.response.model";
import {NewsModel} from "../../../model/news.model";
import {WorldwideService} from "./worldwide.service";
import {InfiniteScrollModule} from "ngx-infinite-scroll";

@Component({
  selector: 'app-worldwide',
  templateUrl: './worldwide.component.html',
  styleUrls: ['./worldwide.component.scss'],
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, InfiniteScrollModule],
  providers: [WorldwideService]
})
export class WorldwideComponent {
  pageData: Array<NewsModel> = []
  hotSearchData: Array<NewsModel> = []

  hotListData: Array<NewsModel> | [] = []
  page: number = 1
  total: number = 1
  total_pages: number = 1

  today = Date.now();

  constructor(
    private newsService: NewsService,
    private worldwideService: WorldwideService
  ) {
  }

  ngOnInit() {
    initTE({Carousel});

    this.getHome();
    this.getHotSearch();

    this.getHotList({page: 1, page_size: 20})
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

  async getHotList({page = 1, page_size = 20}) {
    try {
      const result: ResponseModel = await this.worldwideService.getHotList({page, page_size});
      if (result.error === 0) {
        this.hotListData.push(...result?.data['data'] as []);
        this.page = result?.data['page'];
        this.total = result?.data['total'];
        this.total_pages = result?.data['total_pages'];
      }
    } catch (e) {
      console.log(e)
    }
  }

  onScroll(): void {
    // console.log("scrolled!!");
    if (this.page < this.total_pages) {
      let page = this.page + 1
      this.getHotList({page, page_size: 20})
    } else {
      return;
    }
  }
}
