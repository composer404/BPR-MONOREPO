import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { BPRUser } from 'src/app/interfaces/interfaces';
import { DialogService } from 'src/app/services/common/dialog.service';
import { IAuthService } from 'src/app/interfaces/auth-service.interface';
import { IUserService } from 'src/app/interfaces/user-service.interface';
import { ToastService } from 'src/app/services/common/toast.service';

@Component({
    selector: 'app-edit-account',
    templateUrl: './edit-account.page.html',
    styleUrls: ['./edit-account.page.scss'],
})
export class EditAccountPage implements OnInit {
    editForm: FormGroup;
    userId: string;

    constructor(
        private route: ActivatedRoute,
        private readonly userService: IUserService,
        private readonly toastService: ToastService,
        private readonly dialogService: DialogService,
        private readonly authService: IAuthService,
    ) {
        this.userId = this.route.snapshot.params.id;
        this.editForm = new FormGroup({
            firstName: new FormControl(``),
            lastName: new FormControl(``),
            age: new FormControl(``),
            height: new FormControl(``),
            weight: new FormControl(``),
            sex: new FormControl(``),
        });
    }

    ngOnInit() {
        void this.loadUserData();
    }

    loadUserData() {
        this.userService.getUserById(this.userId).subscribe((user) => {
            this.editForm = new FormGroup({
                firstName: new FormControl(user.firstName),
                lastName: new FormControl(user.lastName),
                age: new FormControl(user.age),
                height: new FormControl(user.height),
                weight: new FormControl(user.weight),
                sex: new FormControl(user.sex),
            });
        });
    }

    onSubmitForm() {
        const body: Partial<BPRUser> = {
            firstName: this.editForm.get('firstName').value,
            lastName: this.editForm.get('lastName').value,
            age: parseInt(this.editForm.get('age').value, 10),
            height: parseFloat(this.editForm.get('height').value),
            weight: parseFloat(this.editForm.get('weight').value),
            sex: this.editForm.get('sex').value,
        };

        this.userService.updateUser(body).subscribe((result) => {
            if (result) {
                this.toastService.success(`Account updated successfully!`);
                return;
            }
            this.toastService.success(`Cannot update account. Try again later.`);
        });
    }

    async onDeleteAccount() {
        this.presentConfirmationDialog();
    }

    onLogout() {
        this.authService.logout();
    }

    private async presentConfirmationDialog() {
        await this.dialogService.openConfirmationDialog({
            header: `Are you sure?`,
            confirmFn: async () => {
                await this.userService.deleteAccount();
                this.onLogout();
            },
        });
    }
}
