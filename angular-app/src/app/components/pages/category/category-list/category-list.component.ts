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
  page = 1;

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
      this.categoryHttp.list()
      .subscribe(response => {
          this.categories = response.data
      });
    }
}
