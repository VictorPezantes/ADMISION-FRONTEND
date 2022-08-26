import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {ActivatedRoute, Router} from '@angular/router';
import {NavigationService} from '../../../core/navigation/navigation.service';
import {FuseNavigationService} from '../../../../@fuse/components/navigation';
import {AdmisionService} from './admision.service';
import {Subject, takeUntil} from 'rxjs';

@Component({
    selector: 'app-admision',
    templateUrl: './admision.component.html',
    styleUrls: ['./admision.component.scss'],
})
export class AdmisionComponent implements OnInit, AfterViewInit {


    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
    drawerMode: 'side' | 'over';

    title: string;

    unsubscribe = new Subject();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _fuseNavigationService: FuseNavigationService,
        private _navigationService: NavigationService,
        public _admisionService: AdmisionService,
    ) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this._admisionService.title
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(title => {
                if (title) {
                    this.title = title;
                }
            });
    }

    onBackdropClicked(): void {
        // Go back to the list
        this._router.navigate(['./'], {relativeTo: this._activatedRoute});

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

}
