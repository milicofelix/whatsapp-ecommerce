import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductHttpService} from '../../../../services/http/product-http.service';
import {Product, ProductCategory} from '../../../../models';
import {ProductCategoryHttpService} from '../../../../services/http/product-category-http.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NotifyMessageService} from '../../../../services/notify-message.service';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit {

  productId: number;
  product: Product = null;
  productCategory: ProductCategory = null;

  constructor(private route: ActivatedRoute,
              private productHttp: ProductHttpService,
              private productCategoryHttp: ProductCategoryHttpService,
              private notifyMessage: NotifyMessageService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params.product;
      this.getProduct();
      this.getProductCategory();
    });
  }

  getProduct() {

    this.productHttp
        .get(this.productId)
        .subscribe(product => {this.product = product;});
    console.log(this.product);
  }

    onInsertSuccess($event: ProductCategory) {
    this.getProductCategory();
    this.notifyMessage.success('Categoria cadastrada com sucesso.');
    console.log($event);
    }

    onInsertError($event: HttpErrorResponse) {
        this.notifyMessage.error('Erro ao tentar cadastrar Categoria.');
        console.log($event);
    }

  getProductCategory() {
    this.productCategoryHttp
        .list(this.productId)
        .subscribe(productCategory => {this.productCategory = productCategory;});
    console.log(this.productCategory);
  }

}
