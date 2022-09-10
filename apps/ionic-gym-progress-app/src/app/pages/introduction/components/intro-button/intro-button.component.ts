import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-intro-button',
  templateUrl: './intro-button.component.html',
  styleUrls: ['./intro-button.component.scss'],
})
export class IntroButtonComponent implements OnInit {

  @Input()
  public href: string;

  @Input()
  public description: string;

  constructor(private router: Router) { }

  ngOnInit() {}

  public navigateTo(): void {
    this.router.navigate([this.href]);
  }
}
