import { NgModule } from '@angular/core';

import {
        MatButtonModule,
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
        MatSnackBarModule,
        MatRippleModule
} from '@angular/material';

import { ScrollDispatchModule } from '@angular/cdk/scrolling';

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
                MatSnackBarModule,
                ScrollDispatchModule,
                MatRippleModule],
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
                MatSnackBarModule,
                ScrollDispatchModule,
                MatRippleModule],
})

export class MaterialModule { }
