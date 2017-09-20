import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from "../../services/file.service";

@Component({
    //moduleId: module.id,
    providers: [FileService],
    selector: 'file',
    templateUrl: './file.component.html',
})

export class FileComponent {

    file1: File;
    file2: File;
    files: File[];

    fileNames: Array<String>;

    constructor(private service: FileService, private router: Router) { }

    getFile1(e: any) {
        //let files:FileList = e.target.value;
        this.file1 = e.target.files[0];
    }

    getFile2(e: any) {
        //let files:FileList = e.target.value;
        this.file2 = e.target.files[0];
    }

    getFiles(e: any) {
        this.files = e.target.files;
        //var fileOb = this.service.postFile(file).toPromise();
    }

    saveFile1() {
        var fileOb = this.service.postFile(this.file1);

        fileOb.subscribe(
            res => {
                this.fileNames = [];
                this.fileNames.push(res);
            }
        );
    }

    saveFile2() {
        var fileOb = this.service.postFile2(this.file1, this.file2);

        fileOb.subscribe(
            res => {
                this.fileNames = res;
            }
        );
    }    

    saveFiles() {
        var fileOb = this.service.postFiles(this.files);

        fileOb.subscribe(
            res => {
                this.fileNames = res;
            }
        );
    }    
}
