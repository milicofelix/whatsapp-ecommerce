import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ProductListComponent} from "./product-list.component";

@Injectable({
    providedIn: 'root'
})
export class ProductEditService{

    private _productListComponent: ProductListComponent;

    constructor(private notifyMessage: NotifyMessageService){}

    set categoryListComponent(value: ProductListComponent){
        this._productListComponent = value;
    }
    
    showEditModal(productId:number){
        this._productListComponent.productID = productId;
        this._productListComponent.productEditModal.showModal();
    }

    onEditSuccess($event: any){
        this.notifyMessage.success('Produto alterado com sucesso.');
        console.log($event);
        this._productListComponent.getProducts();
    }

    onEditError($event: HttpErrorResponse){
        this.notifyMessage.error('Erro ao tentar editar Produto.');
        console.log($event);
    }
}