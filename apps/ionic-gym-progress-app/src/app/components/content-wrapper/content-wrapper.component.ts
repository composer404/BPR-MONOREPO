import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-content-wrapper',
  templateUrl: './content-wrapper.component.html',
  styleUrls: ['./content-wrapper.component.scss'],
})
export class ContentWrapperComponent implements OnInit {

  @Input()
  public href: string;

  @Input()
  public name: string;

  @Input()
  public text: string;

  constructor(private router: Router) { }

  ngOnInit() {}

  public navigateTo(): void {
    this.router.navigate([this.href]);
  }

}
