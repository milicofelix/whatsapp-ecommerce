import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CategoryNewModalComponent} from "../category-new-modal/category-new-modal.component";
import {CategoryEditModalComponent} from "../category-edit-modal/category-edit-modal.component";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories:Array<{id: number, name: string, active: boolean, created_at: {date: string}}> = [];

  @ViewChild(CategoryNewModalComponent, {static: true})
  categoryNewModal: CategoryNewModalComponent;

    @ViewChild(CategoryEditModalComponent, {static: true})
    categoryEditModal: CategoryEditModalComponent;

    categoryID:number;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getCategories();
  }

    getCategories(){

        const token = window.localStorage.getItem('token');
        this.http
            .get<{data:Array<{id: number, name: string, active: boolean, created_at: {date: string}}>}>
            ('http://localhost:8000/api/categories',{

            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
            .subscribe(response => {
                this.categories = response.data
            });
    }

    showInsertModal(){
      this.categoryNewModal.showModal();
    }

    showEditModal(categoryId:number){
      this.categoryID = categoryId;
      this.categoryEditModal.showModal();
    }

    onInsertSuccess($event: any){
        console.log($event);
        this.getCategories();
    }

    onInsertError($event: HttpErrorResponse){
      console.log($event);
    }

    onEditSuccess($event: any){
        console.log($event);
        this.getCategories();
    }

    onEditError($event: HttpErrorResponse){
        console.log($event);
    }

}
