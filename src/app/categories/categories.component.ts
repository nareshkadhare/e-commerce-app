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
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCategory(category: ICategory) {
    
    if (confirm('Are you sure?')) {
      this._commonService.deleteCategory(category.id).subscribe(
        (data) => {
          this.dialog.open(SimpleDialogComponent, {
            data: {
              moduleName: 'Delete-Category',
              message: 'Category Deleted Successfully',
            },
          });
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
  }

  saveCategory(action) {
    this.router.navigate(['../save-category', 'save'], {
      relativeTo: this.route,
    });
  }
}
