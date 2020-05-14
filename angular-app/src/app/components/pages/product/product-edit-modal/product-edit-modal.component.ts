import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {Product} from "../../../../models";

@Component({
  selector: 'product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent implements OnInit {

    @ViewChild(ModalComponent, {static: true})
    modal: ModalComponent;

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    product: Product = {
        name: '',
        description: '',
        price: 0,
        active: true
    }

    _productId:number;

  constructor(private productHttp: ProductHttpService) { }

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

    submit(){
        this.productHttp.update(this._productId,this.product)
            .subscribe((product) => {
                this.onSuccess.emit(product)
                this.modal.hide();
            }, error => this.onError.emit(error));
    }

    showModal(){
        this.modal.show();
    }

}
