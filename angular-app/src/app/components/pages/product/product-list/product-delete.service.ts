import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ProductListComponent} from "./product-list.component";

@Injectable({
    providedIn: 'root'
})
export class ProductDeleteService{

    private _productListComponent: ProductListComponent;

    constructor(private notifyMessage: NotifyMessageService){}

    set categoryListComponent(value: ProductListComponent){
        this._productListComponent = value;
    }

    showDeleteModal(productId:number){
        this._productListComponent.productID = productId;
        this._productListComponent.productDeleteModal.showModal();
    }

    onDeleteSuccess($event: any){
        this.notifyMessage.success('Produto removido com sucesso.');
        console.log($event);
        this._productListComponent.getProducts();
    }

    onDeleteError($event: HttpErrorResponse){
        this.notifyMessage.error('Error ao remover Produto.');
        console.log($event);
    }
}