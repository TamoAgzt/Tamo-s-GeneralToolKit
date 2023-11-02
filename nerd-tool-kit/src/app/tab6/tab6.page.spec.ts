import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab6Page } from './tab6.page';

describe('Tab6Page', () => {
  let component: Tab6Page;
  let fixture: ComponentFixture<Tab6Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tab6Page],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Tab6Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
