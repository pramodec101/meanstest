import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgxCsvParser } from 'projects/ngx-csv-parser/src/public-api';
import { NgxCSVParserError } from 'projects/ngx-csv-parser/src/public-api';
import { ApiService } from './api.service';
import { Csv } from './csv';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
data;any;
  csvRecords: any[] = [];
  header: boolean = false;

  constructor(private ngxCsvParser: NgxCsvParser, private api: ApiService) {
  }

  @ViewChild('fileImportInput') fileImportInput: any;
  ngOnInit(): void {
    this.getCsv();
   
  }

  getCsv() {
    this.api.getCsv()
    .subscribe((res: any) => {
		
      this.data = res;

    }, err => {
      console.log(err);
    });
  }
  delete(e) {
    this.api.deleteCsv(this.e)
    .subscribe((res: any) => {
      this.data = res;

      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
  fileChangeListener($event: any): void {

    const files = $event.srcElement.files;
    this.header = (this.header as unknown as string) === 'true' || this.header === true;

    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
		  console.log('Result', result);
	this.api.addCsv(result)
      .subscribe((res: any) => {
          const id = res._id;

        }, (err: any) => {
          console.log(err);
        });
		  
		  
		  
        
        this.csvRecords = result;
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
  }
}
