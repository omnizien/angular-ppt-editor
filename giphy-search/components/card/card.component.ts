import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() image: string;
  @Input() width: string;
  @Input() height: string;
  @Input() title: string;

  text = `{ "text": "This is text file!中文" }`;
  fileName: string = '';

  constructor(  private _httpClient: HttpClient,
    private _FileSaverService: FileSaverService) {
    this.image = '';
    this.title = '';
    this.width = '0';
    this.height = '0';
  }

  ngOnInit(): void {}

  getBackgroundImage(): string {
   
    return 'url(' + this.image + ')';
  }
  // https://jake.stackblitz.com/edit/ngx-filesaver?file=src%2Fapp%2Fapp.component.html
  // https://www.freakyjolly.com/how-to-update-local-angular-cli-version/
  onDown(type: string, fromRemote: boolean) {
    const fileName = `${this.title}.${type}`;
    if (fromRemote) {
      this._httpClient
        .get( this.image, {
          observe: 'response',
          responseType: 'blob',
        })
        .subscribe((res) => {
          this._FileSaverService.save(res.body, fileName);
        });
      return;
    }
    const fileType = this._FileSaverService.genType(fileName);
    const txtBlob = new Blob([this.text], { type: fileType });
    this._FileSaverService.save(txtBlob, fileName);
  
  }
}