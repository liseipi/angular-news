import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-zk',
  templateUrl: './zk.component.html',
  styleUrls: ['./zk.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ZkComponent {

  today = Date.now();
}
