import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../common.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ICategory } from '../model/category';
import { SimpleDialogComponent } from '../simple-dialog/simple-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'status', 'actions'];
  apiError: any;
  alertMessage: string;
  dataSource: MatTableDataSource<ICategory>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _commonService: CommonService,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._commonService.apiCalled(true);
    this.loadCategory();
    this.route.params.subscribe((param) => {
      if (param && param.id) {
        this.alertMessage = 'Category has been saved with ID : '+param.id+'';
      }
    });
  }

  loadCategory() {
    this._commonService.getCategories().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource<ICategory>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        this.apiError = error;
      },
      () => {
        this._commonService.apiCalled(false);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCategory(category: ICategory) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete-Category',
        message: 'Are you sure you want to delete?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._commonService.deleteCategory(category.id).subscribe(
          (data) => {
            this.alertMessage = 'Category deleted successfully.';
          },
          (error) => {
            this.dialog.open(SimpleDialogComponent, {
              data: {
                moduleName: 'Delete-Category',
                message: 'Error : ' + error.message,
              },
            });
          },
          () => {
            this.loadCategory();
          }
        );
      }
    });
  }

  editCategory(element) {
    this.router.navigate(['../save-category', 'Update', element.id], {
      relativeTo: this.route,
    });
  }

  saveCategory(action) {
    this.router.navigate(['../save-category', 'Create'], {
      relativeTo: this.route,
    });
  }
}
