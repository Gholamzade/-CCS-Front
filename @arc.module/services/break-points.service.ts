import { Injectable } from '@angular/core';
import { Breakpoints, BreakpointObserver, MediaMatcher, BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject, from, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakPointsService {

  message: string;
  stateMessage: any;
  matchedMessage: any;
  sizeMessage: any[] = [];
  matcher: MediaQueryList;
  widthChange;

  /**
   * Breakpoints and Orientation provided 
   * via the 'layout' cdk.
   */
  viewportSizes = [
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
    Breakpoints.Web,
    Breakpoints.WebLandscape,
    Breakpoints.WebPortrait,
    Breakpoints.Handset,
    Breakpoints.HandsetLandscape,
    Breakpoints.HandsetPortrait,
    Breakpoints.Tablet,
    Breakpoints.TabletLandscape,
    Breakpoints.TabletPortrait,
  ];

  /**
   * Our local boolean variables to
   * declare is we are within certain
   * breakpoints.
   */
  isXs: boolean;
  isXs$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isSm: boolean;
  isSm$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isMd: boolean;
  isMd$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isLg: boolean;
  isLg$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isXl: boolean;
  isXl$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isLtSm: boolean;
  isLtSm$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isLtMd: boolean;
  isLtMd$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isLtLg: boolean;
  isLtLg$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isLtXl: boolean;
  isLtXl$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  isGtXs: boolean;
  isGtXs$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isGtSm: boolean;
  isGtSm$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isGtMd: boolean;
  isGtMd$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isGtLg: boolean;
  isGtLg$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private breakpointObserver: BreakpointObserver, private mediaMatcher: MediaMatcher) {

    this.isXs = breakpointObserver.isMatched(Breakpoints.XSmall);
    this.isXs$.next(this.isXs);
    this.isSm = breakpointObserver.isMatched(Breakpoints.Small);
    this.isSm$.next(this.isSm);
    this.isMd = breakpointObserver.isMatched(Breakpoints.Medium);
    this.isMd$.next(this.isMd);
    this.isLg = breakpointObserver.isMatched(Breakpoints.Large);
    this.isLg$.next(this.isLg);
    this.isXl = breakpointObserver.isMatched(Breakpoints.XLarge);
    this.isXl$.next(this.isXl);

    this.isLtSm = breakpointObserver.isMatched('screen and (max-width: 599px)');
    this.isLtSm$.next(this.isLtSm);

    this.isLtMd = breakpointObserver.isMatched('screen and (max-width: 959px)');
    this.isLtMd$.next(this.isLtMd);

    this.isLtLg = breakpointObserver.isMatched('screen and (max-width: 1279px)');
    this.isLtLg$.next(this.isLtLg);

    this.isLtXl = breakpointObserver.isMatched('screen and (max-width: 1919px)');
    this.isLtXl$.next(this.isLtXl);

    this.isGtXs = breakpointObserver.isMatched('screen and (min-width: 600px)');
    this.isGtXs$.next(this.isGtXs);

    this.isGtSm = breakpointObserver.isMatched('screen and (min-width: 960px)');
    this.isGtSm$.next(this.isGtSm);

    this.isGtMd = breakpointObserver.isMatched('screen and (min-width: 1280px)');
    this.isGtMd$.next(this.isGtMd);

    this.isGtLg = breakpointObserver.isMatched('screen and (min-width: 1920px)');
    this.isGtLg$.next(this.isGtLg);

    /**
     * Use breakpointObserver to observe
     * orientation changes. When orientation 
     * changes, use isMatched of breakpointObserver
     * to determine the current orientation and call
     * our webOrientationChange function with a string
     * value coorespoinding to the new orientation.
     */
    breakpointObserver
      .observe([
        Breakpoints.WebLandscape,
        Breakpoints.WebPortrait
      ])
      .subscribe((state: BreakpointState) => {
        breakpointObserver.isMatched(Breakpoints.WebLandscape)
          ? this.webOrientationChange('landscape')
          : this.webOrientationChange('portrait');
      });

    this.widthChange = breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ])
      .subscribe((state: BreakpointState) => {
        this.isXs = breakpointObserver.isMatched(Breakpoints.XSmall);
        this.isXs$.next(this.isXs);
        this.isSm = breakpointObserver.isMatched(Breakpoints.Small);
        this.isSm$.next(this.isSm);
        this.isMd = breakpointObserver.isMatched(Breakpoints.Medium);
        this.isMd$.next(this.isMd);
        this.isLg = breakpointObserver.isMatched(Breakpoints.Large);
        this.isLg$.next(this.isLg);
        this.isXl = breakpointObserver.isMatched(Breakpoints.XLarge);
        this.isXl$.next(this.isXl);
        this.isLtSm = breakpointObserver.isMatched('screen and (max-width: 599px)');
        this.isLtSm$.next(this.isLtSm);

        this.isLtMd = breakpointObserver.isMatched('screen and (max-width: 959px)');
        this.isLtMd$.next(this.isLtMd);

        this.isLtLg = breakpointObserver.isMatched('screen and (max-width: 1279px)');
        this.isLtLg$.next(this.isLtLg);

        this.isLtXl = breakpointObserver.isMatched('screen and (max-width: 1919px)');
        this.isLtXl$.next(this.isLtXl);

        this.isGtXs = breakpointObserver.isMatched('screen and (min-width: 600px)');
        this.isGtXs$.next(this.isGtXs);

        this.isGtSm = breakpointObserver.isMatched('screen and (min-width: 960px)');
        this.isGtSm$.next(this.isGtSm);

        this.isGtMd = breakpointObserver.isMatched('screen and (min-width: 1280px)');
        this.isGtMd$.next(this.isGtMd);

        this.isGtLg = breakpointObserver.isMatched('screen and (min-width: 1920px)');
        this.isGtLg$.next(this.isGtLg);
      })
  }

  webOrientationChange(orientation: string) {
    // debugger;
    this.message = orientation;
  }
}
