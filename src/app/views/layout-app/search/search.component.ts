import {Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {InfiniteScrollModule} from "ngx-infinite-scroll";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class SearchComponent {

  key: string | null = ''

  constructor(
    private router: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      this.key = params.get('key')
    })
  }
}
