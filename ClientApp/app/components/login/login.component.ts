import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from "../../services/auth.service";

@Component({
    //moduleId: module.id,
    providers: [AuthService],
    selector: "login",
    template: `
        <div class="card-wide mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">login</h2>
            </div>
        </div>
          <div class="card-wide mdl-card mdl-shadow--2dp">
          <table>
    <tr>
        <td>user name:</td>
        <td><input [(ngModel)]="userName" placeholder="user" /></td>
    </tr>
    <tr>
        <td>password:</td>
        <td><input [(ngModel)]="password" placeholder="pwd" /></td>
    </tr>
    <tr>
        <td></td>
        <td><input type="button" (click)="login()" value="Login" /></td>
    </tr>
    <tr>
    <td>session</td>
    <td>{{getName}}</td>
    </tr>
</table>
          </div>
    `
})

export class LoginComponent implements OnDestroy {

    userName: string;
    password: string;
    getName: string;
    private postStream$: Subscription;

    constructor(private authService: AuthService, private router: Router) { }

    login() {
        if (this.postStream$) { this.postStream$.unsubscribe }

        this.postStream$ = this.authService.login$(this.userName, this.password).subscribe(
            result => {
                // if (result.state == 1) {
                //     this.router.navigate(["home"]);
                // } else {
                //     alert(result.msg);
                // }

                this.authService.getUserInfo$().subscribe(
                    r => {
                        this.getName = r.userName;
                    }
                );
                //this.router.navigate(["home"]);
            }
        )
    }

    ngOnDestroy() {
        if (this.postStream$) { this.postStream$.unsubscribe() }
    }
}
