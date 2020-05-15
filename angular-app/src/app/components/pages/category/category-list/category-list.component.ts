import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoryNewModalComponent} from "../category-new-modal/category-new-modal.component";
import {CategoryEditModalComponent} from "../category-edit-modal/category-edit-modal.component";
import {CategoryDeleteModalComponent} from "../category-delete-modal/category-delete-modal.component";
import {CategoryHttpService} from "../../../../services/http/category-http.service";
import { Category } from "../../../../models";
import {CategoryInsertService} from "./category-insert.service";
import {CategoryEditService} from "./category-edit.service";
import {CategoryDeleteService} from "./category-delete.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories:Array<Category> = [];
  pagination = {
      page : 1,
      totalItems: 0,
      itemsPerPage: 15
}

  @ViewChild(CategoryNewModalComponent, {static: true})
  categoryNewModal: CategoryNewModalComponent;

    @ViewChild(CategoryEditModalComponent, {static: true})
    categoryEditModal: CategoryEditModalComponent;

    @ViewChild(CategoryDeleteModalComponent, {static: true})
    categoryDeleteModal: CategoryDeleteModalComponent;

    categoryID:number;

  constructor(private categoryHttp: CategoryHttpService,
              protected categoryInsert: CategoryInsertService,
              protected categoryEdit: CategoryEditService,
              protected categoryDelete: CategoryDeleteService) {

      this.categoryInsert.categoryListComponent = this;
      this.categoryEdit.categoryListComponent = this;
      this.categoryDelete.categoryListComponent = this;
  }

  ngOnInit() {
    this.getCategories();
  }

    getCategories(){
      this.categoryHttp.list({page:this.pagination.page})
      .subscribe(response => {
          this.categories = response.data
          this.pagination.totalItems = response.meta.total
          this.pagination.itemsPerPage = response.meta.perPage
      });
    }

    pageChanged(page){
      this.pagination.page = page;
      this.getCategories();
    }
}
