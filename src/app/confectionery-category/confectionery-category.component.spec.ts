import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfectioneryCategoryComponent } from './confectionery-category.component';

describe('ConfectioneryCategoryComponent', () => {
  let component: ConfectioneryCategoryComponent;
  let fixture: ComponentFixture<ConfectioneryCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfectioneryCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfectioneryCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
