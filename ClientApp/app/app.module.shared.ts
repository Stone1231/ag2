import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/users/user.component';
import { FileComponent } from './components/file/file.component';
import { LoginComponent } from './components/login/login.component';
import { LoginAfterComponent } from './components/login/loginAfter.component';
import { InputdataComponent } from './components/inputdata/Inputdata.component';
@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        UsersComponent,
        UserComponent,
        FileComponent,
        LoginComponent,
        LoginAfterComponent,
        InputdataComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'users', component: UsersComponent },
            { path: 'file', component: FileComponent },
            { path: 'inputdata', component: InputdataComponent },
            { path: 'login', component: LoginComponent },
            { path: 'loginAfter', component: LoginAfterComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}