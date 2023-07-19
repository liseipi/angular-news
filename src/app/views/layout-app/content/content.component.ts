import {Component} from '@angular/core';
import {initTE, Input} from "tw-elements";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {ContentService} from "./content.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ResponseModel} from "../../../model/http.response.model";
import {NewsModel} from "../../../model/news.model";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  providers: [ContentService]
})
export class ContentComponent {

  id: string | null = ''

  newsContent: NewsModel | null = null

  constructor(
    public route: ActivatedRoute,
    private contentService: ContentService
  ) {
  }

  ngOnInit() {
    initTE({Input});

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')
      this.getNewContent(String(this.id));
    })
  }

  async getNewContent(id: string) {
    // console.log(id)
    try {
      const result: ResponseModel = await this.contentService.getNewsContent(id);
      if (result.error == 0) {
        this.newsContent = result?.data || [];
      }
    } catch (e) {
      console.log(e)
    }
  }


}
