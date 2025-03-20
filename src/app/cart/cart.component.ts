import { Component, inject } from '@angular/core';
import { CartItemComponent } from './ui/cart-item/cart-item.component';
import { CartStateService } from '../shared/data-access/cart-state.service';
import { ProductItemCart } from '../shared/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, CurrencyPipe],
  templateUrl: './cart.component.html',
  styles: ``,
})
export default class CartComponent {


  state = inject(CartStateService).state;



  whatsappNumber: string = "573136117312"; 

  whatsappLink(): string {
    const products = this.state.products();
    if (!products.length) return '#';

    const productList = products
      .map(
        (item) =>
          `${item.quantity}x ${item.product.title} - ${item.product.price.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}`
      )
      .join('%0A'); // %0A es un salto de línea en URL

    const total = this.state.price().toLocaleString('es-ES', { style: 'currency', currency: 'COP' });

    const message = `Buenos días, quiero realizar el pedido de los siguientes productos:%0A%0A${productList}%0A%0ATotal: ${total}%0A%0A¿Están disponibles?`;

    return `https://wa.me/${this.whatsappNumber}?text=${message}`;
  }











  onRemove(id: number) {
    this.state.remove(id);
  }

  onIncrease(product: ProductItemCart) {
    this.state.udpate({
      product: product.product,
      quantity: product.quantity + 1,
    });
  }

  onDecrease(product: ProductItemCart) {
    this.state.udpate({
      ...product,
      quantity: product.quantity - 1,
    });
  }
}
