import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesInspectComponent } from './invoices-inspect.component';

describe('InvoicesInspectComponent', () => {
  let component: InvoicesInspectComponent;
  let fixture: ComponentFixture<InvoicesInspectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoicesInspectComponent]
    });
    fixture = TestBed.createComponent(InvoicesInspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
