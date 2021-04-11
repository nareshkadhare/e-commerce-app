import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../common.service';
import { EmptyFieldValidator } from '../shared/EmptyField.validator';
import { SimpleDialogComponent } from '../simple-dialog/simple-dialog.component';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit {
  categoryId: number;
  crudAction: string;

  get name() {
    return this.categoryForm.get('name') as FormControl;
  }

  get status() {
    return this.categoryForm.get('status') as FormControl;
  }

  categoryForm: FormGroup = this._formBuilder.group({
    id: [''],
    name: ['', [Validators.required, EmptyFieldValidator]],
    status: [true],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private commonService: CommonService,
    public dialog: MatDialog,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.categoryId = data.id;
      this.crudAction = data.action;
    });

    if (this.categoryId) {
      this.commonService.apiCalled(true);
      this.commonService.getCategory(this.categoryId).subscribe(
        (category) => {
          this.categoryForm.patchValue({
            id: this.categoryId,
            name: category.name,
            status: category.status,
          });
        },
        (error) => {
          this.showError('Get-Category-Detail', error);
          this.commonService.apiCalled(false);
        },
        () => {
          this.commonService.apiCalled(false);
        }
      );
    }
  }

  saveCategory() {
    this.commonService.apiCalled(true);
    const apiAction = this.crudAction == 'Create' ? 'post' : 'put';
    this.commonService
      .saveCategory(this.categoryForm.value,apiAction,this.categoryId)
      .subscribe(
        (data) => {
          this.router.navigate(['/admin/categories',{id : data.id}], {
            relativeTo: this.route,
          });
        },
        (error) => {
          console.log(error);
          this.showError(this.crudAction+'-Category', error);
          this.commonService.apiCalled(false);
        },
        () => {
          this.commonService.apiCalled(false);
        }
      );
  }

  showError(title, error) {
    this.dialog.open(SimpleDialogComponent, {
      data: {
        moduleName: title,
        message: 'Error : ' + error.message,
      },
    });
  }
}
0;
