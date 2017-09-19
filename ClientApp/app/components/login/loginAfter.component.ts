import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from "../../services/auth.service";

@Component({
    //moduleId: module.id,
    providers: [AuthService],
    selector: "loginAfter",
    template: `
        <div class="card-wide mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">get session values</h2>
            </div>
        </div>
          <div class="card-wide mdl-card mdl-shadow--2dp">
          <table>
    <tr>
        <td>get Name:</td>
        <td>{{getName}} </td>
    </tr>
    <tr>
        <td>get Role:</td>
        <td>{{getRole}}</td>
    </tr>
</table>
          </div>
    `
})

export class LoginAfterComponent {

    getName: string;
    getRole: string;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        if (!this.authService.canActivate()){
            return;
        }

        this.authService.getUserInfo$().subscribe(
            r => {
                this.getName = r.userName;
                this.getRole = r.role;
            }
        );
    }
}
