import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})

export class PlaceOrderComponent implements OnInit {
  cartItems: any[] = [];

  constructor(
    private orderService: OrderService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      this.cartItems = JSON.parse(storedItems);
    }
  }

  increaseQuantity(item: any) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    console.log("inc",products)
    const product = products.find((p: any) => p._id === item.ProductId); 

    if (product && item.Quantity < product.quantity) {
      item.Quantity++;
      this.updateCart();
    } else {
      this.toastr.error('Cannot increase quantity beyond available stock!', 'Error');
    }
  }


  decreaseQuantity(item: any) {
    if (item.Quantity > 1) {
      item.Quantity--;
      this.updateCart();
    }
  }

  removeItem(item: any) {
    this.cartItems = this.cartItems.filter(i => i.ProductId !== item.ProductId); 
    this.updateCart();
  }

  updateCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  placeOrder() {
    this.cartItems.forEach(item => {
      const orderRequest = {
        userId: '67b845f9d8192f270f10cd70',
        productId: item.ProductId,  
        quantity: item.Quantity     

      };
      console.log()
      this.orderService.addOrder(orderRequest).subscribe({
        next: (response) => {
          this.toastr.success('Order placed successfully for product:');
        },
        error: (error) => {
          console.error('Error placing order:', error);
          if (error.error?.errors) {
            const errorMessages = Object.values(error.error.errors).flat();
            alert(`Failed to place order: ${errorMessages.join(', ')}`);
          } else {
            alert('Failed to place order. Please try again.');
          }
        },
      });
    });

    //clear the cart items
    localStorage.removeItem('cartItems');
    this.cartItems = [];
  }

}
