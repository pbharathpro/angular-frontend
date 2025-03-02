import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']

})
export class AddProductComponent {
  product={
    productName: '',
    category: '',
    quantity: 0,
    isActive: true,
    price: 0
  }

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    if (this.isValid()) {
      // Trim is for leading and trailing, replace is for multiple spaces to single space conversion
      this.product.productName = this.product.productName.replace(/\s+/g, ' ').trim().toLowerCase();
      this.product.category = this.product.category.replace(/\s+/g, ' ').trim().toLowerCase();
  
      this.productService.addProduct(this.product)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.toastr.success('Product added successfully', 'Success');
            this.resetForm();
          },
          error: (error) => {
            this.toastr.error(`${error.error.message}`);
          }
        });
    }
  }
  
  isValid(){
    const productPattern = /^[A-Za-z][A-Za-z0-9\s]{2,}$/;
    const categoryPattern = /^[A-Za-z][A-Za-z\s]{2,}$/;


    return (
      this.product.productName.trim()!=='' && //to check empty or not
      this.product.productName.length >= 3 && 
      this.product.productName.length <= 32 && 
      productPattern.test(this.product.productName) &&

      this.product.category.trim()!=='' &&
      this.product.category.length >= 3 && 
      this.product.category.length <= 32 &&
      categoryPattern.test(this.product.category) &&

      this.product.quantity > 0 &&
      this.product.price > 0 
    );
  }
  
  resetForm(){
    this.product={
      productName: '',
      category: '',
      quantity: 0,
      isActive: true,
      price: 0
    };
  }
}
