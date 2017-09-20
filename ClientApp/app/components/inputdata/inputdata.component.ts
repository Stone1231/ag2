import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InputdataService } from "../../services/inputdata.service";
import { Item } from '../../models/item.model'

@Component({
    //moduleId: module.id,
    providers: [InputdataService],
    selector: 'inputdata',
    templateUrl: './inputdata.component.html',
})

export class InputdataComponent {

    selects: Item[];

    value1: string;

    value2: string;

    defItem:Item;

    constructor(private service: InputdataService, private router: Router) {
        this.selects = [
            { name: "IE", value: "1" },
            { name: "Firefox", value: "2" },
            { name: "Chrome", value: "3" },
            { name: "Opera", value: "4" },
            { name: "Safari", value: "5" }
        ];

        this.defItem = { name: "請選擇", value: "" };
        this.value2 = "";
    }

}