import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription, map, tap } from 'rxjs';
import { Role } from 'src/app/models/roles.type';
import { AuthService } from 'src/app/services/auth.service';

@Directive({
  selector: '[ngRoles]'
})
export class NgRolesDirective implements OnInit, OnDestroy {

  @Input('ngRoles') allowedRoles?: Role[];
  private sub?: Subscription;

  constructor(
    private _auth: AuthService,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) { }

  ngOnInit(): void {
    this.sub = this._auth.user$.pipe(
      map((user) => Boolean(this.allowedRoles?.includes(user?.role || 'Customer'))),
      tap((ifRole) => ifRole ?
        this.viewContainerRef.createEmbeddedView(this.templateRef)
        :
        this.viewContainerRef.clear()
      )
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }


}
