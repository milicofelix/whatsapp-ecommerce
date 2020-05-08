import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {CategoryListComponent} from "./category-list.component";

@Injectable({
    providedIn: 'root'
})
export class CategoryEditService{

    private _categoryListComponent: CategoryListComponent;

    constructor(private notifyMessage: NotifyMessageService){}

    set categoryListComponent(value: CategoryListComponent){
        this._categoryListComponent = value;
    }
    
    showEditModal(categoryId:number){
        this._categoryListComponent.categoryID = categoryId;
        this._categoryListComponent.categoryEditModal.showModal();
    }

    onEditSuccess($event: any){
        this.notifyMessage.success('Categoria alterada com sucesso.');
        console.log($event);
        this._categoryListComponent.getCategories();
    }

    onEditError($event: HttpErrorResponse){
        this.notifyMessage.error('Erro ao tentar editar Categoria.');
        console.log($event);
    }
}