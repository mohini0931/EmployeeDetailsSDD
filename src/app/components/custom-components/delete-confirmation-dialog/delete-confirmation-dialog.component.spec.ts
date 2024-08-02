import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

describe('DeleteConfirmationDialogComponent', () => {
  let component: DeleteConfirmationDialogComponent;
  let fixture: ComponentFixture<DeleteConfirmationDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<DeleteConfirmationDialogComponent>>;

  beforeEach(async () => {
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [DeleteConfirmationDialogComponent],
      imports: [
        BrowserAnimationsModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpyObj },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConfirmationDialogComponent);
    component = fixture.componentInstance;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<DeleteConfirmationDialogComponent>>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onNoClick and close the dialog when the cancel button is clicked', () => {
    spyOn(component, 'onNoClick').and.callThrough();

    const button = fixture.debugElement.query(By.css('.cancel-button')).nativeElement;
    button.click();

    expect(component.onNoClick).toHaveBeenCalled();
    expect(dialogRefSpy.close).toHaveBeenCalledWith();
  });

  it('should call onDeleteClick and close the dialog with true when the delete button is clicked', () => {
    spyOn(component, 'onDeleteClick').and.callThrough();

    const button = fixture.debugElement.query(By.css('.delete-button')).nativeElement;
    button.click();

    expect(component.onDeleteClick).toHaveBeenCalled();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('should call onNoClick and close the dialog when the close icon button is clicked', () => {
    spyOn(component, 'onNoClick').and.callThrough();

    const button = fixture.debugElement.query(By.css('.close-button')).nativeElement;
    button.click();

    expect(component.onNoClick).toHaveBeenCalled();
    expect(dialogRefSpy.close).toHaveBeenCalledWith();
  });

  it('should display the correct title and content', () => {
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    const content = fixture.debugElement.query(By.css('p')).nativeElement;

    expect(title.textContent).toContain('Delete Employee');
    expect(content.textContent).toContain('Are you sure you want to delete this employee?');
  });
});
