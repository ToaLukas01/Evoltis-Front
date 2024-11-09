import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinerBarComponent } from './spiner-bar.component';

describe('SpinerBarComponent', () => {
  let component: SpinerBarComponent;
  let fixture: ComponentFixture<SpinerBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinerBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinerBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
