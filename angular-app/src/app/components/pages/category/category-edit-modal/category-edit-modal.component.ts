import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Category} from "../../../../models";
import {CategoryHttpService} from "../../../../services/http/category-http.service";

@Component({
  selector: 'category-edit-modal',
  templateUrl: './category-edit-modal.component.html',
  styleUrls: ['./category-edit-modal.component.css']
})
export class CategoryEditModalComponent implements OnInit {

  @ViewChild(ModalComponent, {static: true})
  modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  category: Category = {
      name: '',
      active: true
  }

  _categoryId:number;

  constructor(public categoryHttp: CategoryHttpService, private http: HttpClient) { }

  ngOnInit() {
  }

  @Input()
  set categoryId(value){
      this._categoryId = value;
      if(this._categoryId){
          this.categoryHttp
              .get(this._categoryId)
              .subscribe(category => this.category = category);
    }
  }

    submit(){
        this.categoryHttp.update(this._categoryId,this.category)
            .subscribe((category) => {
                this.onSuccess.emit(category)
                this.modal.hide();
            }, error => this.onError.emit(error));
    }

    showModal(){
        this.modal.show();
    }

}
