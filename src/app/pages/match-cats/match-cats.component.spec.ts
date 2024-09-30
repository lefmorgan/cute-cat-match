import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchCatsComponent } from './match-cats.component';

describe('MatchCatsComponent', () => {
  let component: MatchCatsComponent;
  let fixture: ComponentFixture<MatchCatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchCatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchCatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
