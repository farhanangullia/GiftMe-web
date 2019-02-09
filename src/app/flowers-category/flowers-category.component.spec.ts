import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowersCategoryComponent } from './flowers-category.component';

describe('FlowersCategoryComponent', () => {
  let component: FlowersCategoryComponent;
  let fixture: ComponentFixture<FlowersCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowersCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowersCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
