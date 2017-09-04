import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    providers: [UserService]
})
export class UserComponent {

    constructor(private service: UserService) {

    }

    public row: User;

    photoFile: File;

    @Output()
    onBack: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    onSave: EventEmitter<any> = new EventEmitter<any>();

    @Input()
    id: number;

    // back() {
    //     this.onBack.emit();
    // }

    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        if (this.id > 0) {
            this.read(this.id);
        }
        else {
            this.row = {
                id: 0,
                name: "",
                hight: 0,
                photo: "",
                birthday: "0000-01-01"
            };
        }
    }

    read(id: number) {
        this.service.getSingle(id.toString()).subscribe(d => {
            this.row = d;
        })
    }

    save() {
        //console.log(this.row);
        if (this.row.id > 0) {

            var updateOb = this.service.put(this.row.id.toString(), this.row);

            if (this.photoFile) {
                var fileOb = this.service.postFile(this.photoFile);

                updateOb.subscribe(
                    res => {
                        updateOb.subscribe(
                            res => {
                                this.onSave.emit();
                            }
                        );
                    }
                );
            }
            else {
                updateOb.subscribe(
                    res => {
                        this.onSave.emit();
                    }
                );
            }


            // this.service.put(this.row.id.toString(), this.row).subscribe(
            //     res => {
            //         this.onSave.emit();
            //     }
            // );
        } else {
            this.service.post(this.row).subscribe(
                res => {
                    this.onSave.emit();
                }
            );
        }
    }

    getFile(e: any) {
        //let files:FileList = e.target.value;
        this.photoFile = e.target.files[0];
    }

    // constructor(private service: UserService) {

    // }

    // bindData() {
    //     this.service.getAll().subscribe(d => {
    //         //this.rows = d;
    //     })
    // }
}