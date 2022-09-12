import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePersonalComponent } from './table-personal.component';

describe('TablePersonalComponent', () => {
  let component: TablePersonalComponent;
  let fixture: ComponentFixture<TablePersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
