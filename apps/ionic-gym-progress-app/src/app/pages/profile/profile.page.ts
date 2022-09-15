import { AuthService } from 'src/app/services/auth/auth.service';
import { Component } from '@angular/core';
import { DialogService } from 'src/app/services/common/dialog.service';
import { UserService } from 'src/app/services/api/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly dialogService: DialogService,
    ) {}

    logout() {
        this.authService.logout();
    }

    async deleteAccount() {
        this.presentConfirmationDialog();
    }

    private async presentConfirmationDialog() {
        await this.dialogService.openConfirmationDialog({
            header: `Are you sure?`,
            confirmFn: async () => {
                await this.userService.deleteAccount();
                this.logout();
            },
        });
    }
}
