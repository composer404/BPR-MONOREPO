import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-profile-tabs',
    templateUrl: './profile-tabs.page.html',
    styleUrls: [],
})
export class ProfileTabsPage {
    userId: string;

    constructor(private readonly route: ActivatedRoute) {
        this.userId = this.route.snapshot.firstChild.params.id;
    }
}
