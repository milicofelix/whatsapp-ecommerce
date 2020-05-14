import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {Product} from "../../../../models";
import {ProductHttpService} from "../../../../services/http/product-http.service";

@Component({
  selector: 'product-delete-modal',
  templateUrl: './product-delete-modal.component.html',
  styleUrls: ['./product-delete-modal.component.css']
})
export class ProductDeleteModalComponent implements OnInit {

    @ViewChild(ModalComponent, {static: true})
    modal: ModalComponent;

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    product:Product = null;

    _productId:number;

  constructor( private productHttp: ProductHttpService) { }

  ngOnInit() {
  }

    @Input()
    set productId(value){
        this._productId = value;
        if(this._productId){
            this.productHttp
                .get(this._productId)
                .subscribe(product => this.product = product);
        }
    }

    destroy(){
        this.productHttp.destroy(this._productId)
            .subscribe((product) => {
                this.onSuccess.emit(product)
                this.modal.hide();
            }, error => this.onError.emit(error));


    }

    showModal(){
        this.modal.show();
    }

}
