import {Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {ResponseModel} from "../../../model/http.response.model";
import {NewsModel} from "../../../model/news.model";
import {HotService} from "./hot.service";
import {NewsService} from "../../../service/news.service";
import {RouterLink} from "@angular/router";
import {fromEvent, map, filter} from "rxjs";
import {InfiniteScrollModule} from "ngx-infinite-scroll";

@Component({
  selector: 'app-hot',
  templateUrl: './hot.component.html',
  styleUrls: ['./hot.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage, InfiniteScrollModule],
  providers: [HotService]
})
export class HotComponent {
  hotListData: Array<NewsModel> | [] = []
  page: number = 1
  total: number = 1
  total_pages: number = 1

  today = Date.now();

  hotSearchData: Array<NewsModel> | [] = []

  constructor(
    private hotService: HotService,
    private newsService: NewsService
  ) {
  }

  ngOnInit() {
    this.getHotList({page: 1, page_size: 20})

    this.getHotSearch()
  }

  async getHotList({page = 1, page_size = 20}) {
    try {
      const result: ResponseModel = await this.hotService.getHotList({page, page_size});
      if (result.error == 0) {
        this.hotListData.push(...result?.data['data'] as []);
        this.page = result?.data['page'];
        this.total = result?.data['total'];
        this.total_pages = result?.data['total_pages'];
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
