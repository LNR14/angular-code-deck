import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ProductService } from '../services/product.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditPopupComponent,
    ButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @ViewChild('paginator') paginator: Paginator | undefined;

  constructor(private productService: ProductService) {}

  displayEditPopUp: boolean = false;
  displayAddPopUp: boolean = false;
  products: Product[] = [];

  totalRecords: number = 0;
  rows: number = 5;
  selectedProduct: Product = {
    id: 0,
    price: '',
    name: '',
    image: '',
    rating: 0,
  };

  toggleEditPopUp(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopUp = !this.displayEditPopUp;
  }

  toggleAddPopUp() {
    this.displayAddPopUp = true;
  }

  toggleDeletePopUp(product: Product) {
    if (!product.id) {
      return;
    }
    this.deleteProduct(product.id);
  }

  onProductOutput(product: Product) {
    console.log(product);
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  resetpaginator() {
    this.paginator?.changePage(0);
  }

  onConfirmEdit(product: Product) {
    this.displayEditPopUp = true;
    this.editProduct(product, this.selectedProduct.id ?? 0);
  }

  onConfirmAdd(product: Product) {
    this.displayAddPopUp = true;
    this.addProduct(product);
  }

  fetchProducts(page: number, perPage: number) {
    this.productService
      .getProducts('http://localhost:3000/clothes', { page, perPage })
      .subscribe({
        next: (products: Products) => {
          this.products = products.items;
          this.totalRecords = products.total;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  editProduct(product: Product, id: number) {
    this.productService
      .editProduct(`http://localhost:3000/clothes/${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetpaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  addProduct(product: Product) {
    this.productService
      .addProduct(`http://localhost:3000/clothes/`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deleteProduct(id: number) {
    this.productService
      .deleteProduct(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnInit(): void {
    this.fetchProducts(0, this.rows);
  }
}
