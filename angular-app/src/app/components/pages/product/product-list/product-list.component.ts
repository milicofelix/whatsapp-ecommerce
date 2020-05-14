import {Component, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../../../models";
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {ProductNewModalComponent} from "../product-new-modal/product-new-modal.component";
import {ProductEditModalComponent} from "../product-edit-modal/product-edit-modal.component";
import {ProductDeleteModalComponent} from "../product-delete-modal/product-delete-modal.component";
import {ProductInsertService} from "./product-insert.service";
import {ProductEditService} from "./product-edit.service";
import {ProductDeleteService} from "./product-delete.service";

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    products:Array<Product> = [];
    pagination = {
        page : 1,
        totalItems: 0,
        itemsPerPage: 15
    }

    @ViewChild(ProductNewModalComponent, {static: true})
    productNewModal: ProductNewModalComponent;

    @ViewChild(ProductEditModalComponent, {static: true})
    productEditModal: ProductEditModalComponent;

    @ViewChild(ProductDeleteModalComponent, {static: true})
    productDeleteModal: ProductDeleteModalComponent;

    productID:number;

  constructor( private productHttp: ProductHttpService
               ,protected productInsert: ProductInsertService
               ,protected productEdit: ProductEditService, protected productDelete: ProductDeleteService)
  {
      this.productInsert.productListComponent = this;
      this.productEdit.categoryListComponent = this;
      this.productDelete.categoryListComponent = this;
  }

  ngOnInit() {

      this.getProducts();
  }

    getProducts(){
        this.productHttp.list(this.pagination.page)
            .subscribe(response => {
                this.products = response.data
                this.pagination.totalItems = response.meta.total
                this.pagination.itemsPerPage = response.meta.perPage
            });
    }

    pageChanged(page){
        this.pagination.page = page;
        this.getProducts();
    }

}
