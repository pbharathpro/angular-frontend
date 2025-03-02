import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']

})
export class AddProductComponent {
  categories: string[] = [
    "Electronics", "Appliances", "Furniture", "Decor", "Outdoor", 
    "Clothing", "Shoes", "Accessories", "Activewear", "Underwear & Loungewear",
    "Kitchen & Dining", "Bedding & Bath", "Home Storage & Organization", 
    "Pets", "Home Improvement", "Makeup", "Skincare", "Hair Care", 
    "Fragrance", "Personal Care Appliances", "Wellness", "Books", 
    "Movies & TV", "Music", "Video Games", "Musical Instruments",
    "Sports Equipment", "Outdoor Recreation", "Cycling", "Water Sports",
    "Travel", "Toys", "Games", "Kids' Furniture & Decor", 
    "Car Parts & Accessories", "Motorcycle Parts & Accessories",
    "Automotive Electronics", "Office Supplies", "Stationery", 
    "Office Furniture", "Grocery", "Beverages", "Gourmet Food", 
    "Industrial Supplies", "Scientific Supplies", "Commercial Equipment",
    "Art Supplies", "Craft Supplies", "Sewing & Knitting", 
    "Gift Baskets", "Personalized Gifts", "Gift Cards"
  ].map(category => category.toLowerCase());
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

    return (
      this.product.productName.trim()!=='' && //to check empty or not
      this.product.productName.length >= 3 && 
      this.product.productName.length <= 32 && 
      productPattern.test(this.product.productName) &&

      this.product.category.trim()!=='' &&
      this.categories.includes(this.product.category) && 

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
