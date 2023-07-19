import {Component} from '@angular/core';
import {initTE, Ripple} from "tw-elements";

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.scss']
})
export class SiteFooterComponent {
  ngOnInit() {
    initTE({Ripple});
  }

  ngAfterViewInit() {
    // Get the button
    const myButton: HTMLElement | null = document.getElementById("btn-back-to-top");

    // When the user scrolls down 20px from the top of the document, show the button

    const scrollFunction = () => {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        myButton?.classList.remove("hidden");
      } else {
        myButton?.classList.add("hidden");
      }
    };
    const backToTop = () => {
      window.scrollTo({top: 0, behavior: "smooth"});
    };

    // When the user clicks on the button, scroll to the top of the document
    myButton?.addEventListener("click", backToTop);

    window.addEventListener("scroll", scrollFunction);
  }
}
