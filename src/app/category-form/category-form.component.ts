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
  get name() {
    return this.categoryForm.get('name') as FormControl;
  }

  get status() {
    return this.categoryForm.get('status') as FormControl;
  }

  categoryForm: FormGroup = this._formBuilder.group({
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

  ngOnInit(): void {}

  saveCategory() {
    this.commonService.apiCalled(true);
    this.commonService.saveCategory(this.categoryForm.value).subscribe(
      (data) => {
        this.router.navigate(['../../categories'], { relativeTo: this.route });
      },
      (error) => {
        console.log(error);
        this.dialog.open(SimpleDialogComponent, {
          data: {
            moduleName: 'Save-Category',
            message: 'Error : ' + error.message,
          },
        });
        this.commonService.apiCalled(false);
      },
      () => {
        this.commonService.apiCalled(false);
      }
    );
  }
}
