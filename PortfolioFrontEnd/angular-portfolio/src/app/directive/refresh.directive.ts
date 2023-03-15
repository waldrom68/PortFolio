import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';


// https://www.youtube.com/watch?v=Cn6MA87J6aQ
@Directive({
  selector: '[appRefresh]'
})
export class RefreshDirective implements OnChanges {
  @Input() appRefresh: number;

  constructor(
    private templaRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
  ) {
    // Para no afectar el flujo de ningun proceso
    this.viewContainerRef.createEmbeddedView(templaRef)
   }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appRefresh']) 
    {
      console.log("Teoricamente estaria recargando el componente");
      this.viewContainerRef.clear();  // lelimina el componente
      this.viewContainerRef.createEmbeddedView(this.templaRef); // recarga el componente
      
    }
  }


}
