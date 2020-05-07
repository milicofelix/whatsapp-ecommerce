import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {Category} from "../../../../models";
import {CategoryHttpService} from "../../../../services/http/category-http.service";

@Component({
  selector: 'category-new-modal',
  templateUrl: './category-new-modal.component.html',
  styleUrls: ['./category-new-modal.component.css']
})
export class CategoryNewModalComponent implements OnInit {

    @ViewChild(ModalComponent, {static: true})
    modal: ModalComponent;

    category: Category = {
        'name':'',
        'active': true
    }

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(public categoryHttp: CategoryHttpService) { }

  ngOnInit() {
  }

    submit(){
        this.categoryHttp.create(this.category)
            .subscribe((category) => {
                this.onSuccess.emit(category)
                this.modal.hide();
            }, error => this.onError.emit(error));


    }

    showModal(){
        this.modal.show();
    }

}
