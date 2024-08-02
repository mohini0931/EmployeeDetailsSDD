import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';  // Corrected module import

import { DrawerComponent } from './drawer.component';

describe('DrawerComponent', () => {
  let component: DrawerComponent;
  let fixture: ComponentFixture<DrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DrawerComponent],
      imports: [
        NoopAnimationsModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule  // Corrected module import
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit drawerClosed when closeDrawer is called', () => {
    spyOn(component.drawerClosed, 'emit');

    component.closeDrawer();

    expect(component.drawerClosed.emit).toHaveBeenCalled();
  });

  it('should display the correct title', () => {
    component.title = 'Test Drawer Title';
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('.drawer-header h2')).nativeElement;

    expect(titleElement.textContent).toContain('Test Drawer Title');
  });

  it('should emit drawerClosed when close button is clicked', () => {
    spyOn(component.drawerClosed, 'emit');

    const buttonElement = fixture.debugElement.query(By.css('button[mat-icon-button]')).nativeElement;
    buttonElement.click();

    expect(component.drawerClosed.emit).toHaveBeenCalled();
  });

  it('should have the correct default title', () => {
    expect(component.title).toBe('');
  });
});
