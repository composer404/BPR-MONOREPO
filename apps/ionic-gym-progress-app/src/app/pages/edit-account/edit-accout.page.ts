import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { BPRUser } from 'src/app/interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { LOCAL_API_SERVICES } from 'src/app/interfaces/local-api.endpoints';
import { ToastService } from 'src/app/services/common/toast.service';
import { UserService } from 'src/app/services/api/user.service';
import { environment } from 'src/environments/environment';

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
        private readonly userSerivce: UserService,
        private readonly toastService: ToastService,
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
        this.userSerivce.getUserById(this.userId).subscribe((user) => {
            this.editForm = new FormGroup({
                firstName: new FormControl(user.firstName),
                lastName: new FormControl(user.lastName),
                age: new FormControl(user.age),
                height: new FormControl(user.height),
                weight: new FormControl(user.weight),
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
        };

        this.userSerivce.updateUser(body).subscribe((result) => {
            if (result) {
                this.toastService.success(`Account updated successfully!`);
                return;
            }
            this.toastService.success(`Cannot update account. Try again later.`);
        });
    }
}
