import { NgModule } from '@angular/core';

import {MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatListModule,
        MatCardModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatTabsModule,
        MatDialogModule,
        MatSelectModule,
        MatSnackBarModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule,
            MatCheckboxModule,
            MatToolbarModule,
            MatListModule,
            MatCardModule,
            MatSidenavModule,
            MatIconModule,
            MatInputModule,
            MatTabsModule,
            MatDialogModule,
            MatSelectModule,
            MatSnackBarModule],
  exports: [MatButtonModule,
            MatCheckboxModule,
            MatToolbarModule,
            MatListModule,
            MatCardModule,
            MatSidenavModule,
            MatIconModule,
            MatInputModule,
            MatTabsModule,
            MatDialogModule,
            MatSelectModule,
            MatSnackBarModule],
})

export class MaterialModule {}
