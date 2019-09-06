import { Routes } from '@angular/router';

import { CategoryComponent } from '../../categories/category.component';
import { BillComponent } from '../../bills/bill.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'categories',      component: CategoryComponent },
    { path: 'bills',      component: BillComponent }
];
