import {Component, ElementRef, OnInit} from '@angular/core';

declare const $;

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private element:ElementRef) { }

  ngOnInit() {

    const jqueryElement = this.getJqueryElement();
    jqueryElement.find('[modal-title]').addClass('modal-title');
    jqueryElement.find('[modal-body]').addClass('modal-body');
    jqueryElement.find('[modal-footer]').addClass('modal-footer');

  }

  show(){
    this.getJqueryElement().modal('show');
  }

  hide(){
      this.getJqueryElement().modal('hide');
  }

  private getJqueryElement(){

      const nativeElement = this.element.nativeElement;
      return $(nativeElement.firstChild);

  }

}
