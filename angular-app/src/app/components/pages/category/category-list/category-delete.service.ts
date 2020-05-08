import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {CategoryListComponent} from "./category-list.component";

@Injectable({
    providedIn: 'root'
})
export class CategoryDeleteService{

    private _categoryListComponent: CategoryListComponent;

    constructor(private notifyMessage: NotifyMessageService){}

    set categoryListComponent(value: CategoryListComponent){
        this._categoryListComponent = value;
    }

    showDeleteModal(categoryId:number){
        this._categoryListComponent.categoryID = categoryId;
        this._categoryListComponent.categoryDeleteModal.showModal();
    }

    onDeleteSuccess($event: any){
        this.notifyMessage.success('Categoria removida com sucesso.');
        console.log($event);
        this._categoryListComponent.getCategories();
    }

    onDeleteError($event: HttpErrorResponse){
        this.notifyMessage.error('Error ao remover categoria. Verifique se a mesma não está relacionada com o produto.');
        console.log($event);
    }
}