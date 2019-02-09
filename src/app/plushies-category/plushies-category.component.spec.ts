import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlushiesCategoryComponent } from './plushies-category.component';

describe('PlushiesCategoryComponent', () => {
  let component: PlushiesCategoryComponent;
  let fixture: ComponentFixture<PlushiesCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlushiesCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlushiesCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
