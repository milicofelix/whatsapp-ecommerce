import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {Product} from "../../../../models";
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";

@Component({
  selector: 'product-new-modal',
  templateUrl: './product-new-modal.component.html',
  styleUrls: ['./product-new-modal.component.css']
})
export class ProductNewModalComponent implements OnInit {

  @ViewChild(ModalComponent, {static: true})
  modal: ModalComponent;

    product: Product = {
        'name':'',
        'description': '',
        'price': 0,
        'active': true
    }

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private productHttp: ProductHttpService) { }

  ngOnInit() {
  }

    submit(){
        this.productHttp.create(this.product)
            .subscribe((product) => {
                this.onSuccess.emit(product)
                this.modal.hide();
            }, error => this.onError.emit(error));


    }

    showModal(){
        this.modal.show();
    }

}
