import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {initTE, Toast} from "tw-elements";

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  @Input('title') title: string = '';
  @Input('state') state: string = 'primary'; // primary, success, danger, or warning
  @Input('message') message: string = '';

  myToast: any = '';

  styles: any = {
    primary: {
      bgColor: 'bg-primary-100',
      textColor: 'text-primary-700',
      lineColor: 'border-primary-200'
    },
    success: {
      bgColor: 'bg-success-100',
      textColor: 'text-success-700',
      lineColor: 'border-success/20'
    },
    danger: {
      bgColor: 'bg-danger-100',
      textColor: 'text-danger-700',
      lineColor: 'border-danger-200'
    },
    warning: {
      bgColor: 'bg-warning-100',
      textColor: 'text-warning-700',
      lineColor: 'border-warning-200'
    },
  }

  ngOnInit() {
    initTE({Toast});
    this.myToast = Toast.getInstance(document.getElementById('static-toast'));
    // this.myToast.show();
  }

  ngAfterContentInit() {
    this.myToast.show();
  }

  getStyle() {
    return this.styles[this.state] || this.styles.primary;
  }
}
