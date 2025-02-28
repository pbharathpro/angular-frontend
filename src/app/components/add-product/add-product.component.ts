import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']

})
export class AddProductComponent {
  productForm: FormGroup;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0)]],
      isActive: [true],
      price: ['', [Validators.required, Validators.min(1)]],

    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formValue = { ...this.productForm.value };
      formValue.productName = formValue.productName.toLowerCase();
      formValue.category = formValue.category.toLowerCase();
      this.productService.addProduct(this.productForm.value)
        .subscribe({
          next: (response) => {
            console.log(response)
            this.toastr.success('Product added successfully', 'Success');
            this.productForm.reset();
          },
          error: (error) => {
            this.toastr.error(`${error.error.message}`);
          }
        });
    }
  }
}
