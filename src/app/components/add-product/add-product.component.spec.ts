import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product.component';
import { ProductService } from '../product.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, ToastrModule.forRoot()],
      providers: [ProductService, ToastrService],
    }).compileComponents();
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
